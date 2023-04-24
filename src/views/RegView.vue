<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { object, string, ValidationError, ref as YupRef } from 'yup';
import { useI18n } from 'vue-i18n';
import FormStep from '@/components/FormStep/FormStep.vue';
import AppNotification from '@/components/AppNotification/AppNotification.vue';
import { backendApi } from '@/main';
import { useChallengeV3 } from 'vue-recaptcha';
import { NotificationTypes } from '@/interfaces/error.interface';
import type { AxiosResponse } from 'axios';
import type { User } from '@/interfaces/user.interface';
import type { VerificationMessage } from '@/interfaces/verificationMessage.interface';
import { useUserStore } from '@/stores/user';
import { useMetaStore } from '@/stores/meta';
import { io } from 'socket.io-client';
import { useRouter } from 'vue-router';
import 'vue-loaders/dist/vue-loaders.css';

const { execute } = useChallengeV3('register');
const { t } = useI18n({ useScope: 'global' });
const step = ref(1);

const isFocused = ref(false);
const isLoading = ref(false);
const isVerified = ref(false);
const doVerifiedAnimation = ref(false);

const router = useRouter();

const metaStore = useMetaStore();
const userStore = useUserStore();

watch(
  () => step.value,
  () => {
    isEnabledButton.value = canContinue();
  },
);

watch(
  () => doVerifiedAnimation.value,
  (newValue: boolean) => {
    if (newValue === true) {
      new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {
        execute().then((captchaResponse) => {
          userStore
            .login(username.value, password.value, captchaResponse)
            .then(() => {
              router.push('/home');
            });
        });
      });
    }
  },
);

const errors = ref<{
  [key: string]: string;
}>({});
const isEnabledButton = ref(false);

const username = ref(''),
  email = ref(''),
  password = ref(''),
  confirm_password = ref('');

const canContinue = () => {
  switch (step.value) {
    case 1:
      return (
        Object.keys(errors.value).length === 0 &&
        username.value !== '' &&
        email.value !== ''
      );
    case 2:
      return (
        Object.keys(errors.value).length === 0 &&
        password.value !== '' &&
        confirm_password.value !== ''
      );
    case 3:
      return Object.keys(errors.value).length === 0;
    default:
      return false;
  }
};

const nextStep = () => {
  if (step.value < 2 && canContinue() && !isLoading.value) {
    step.value++;
  } else if (step.value === 2 && canContinue() && !isLoading.value) {
    step.value++;
    register();
  }
};

const prevStep = (keepErrors: boolean = false) => {
  if (step.value > 1 && !isLoading.value) {
    if (keepErrors && step.value === 3) step.value--;

    if (!keepErrors && step.value < 3) {
      step.value--;
      errors.value = {};
    }
  }
};

const regsiterShape = object().shape({
  username: string()
    .required(t('register.validation.username.required'))
    .min(3, t('register.validation.username.min'))
    .max(16, t('register.validation.username.max'))
    .test({
      name: 'is-valid',
      test: (value) => {
        return /^[a-zA-Z0-9_]+$/.test(value);
      },
      message: t('register.validation.username.invalid'),
    }),
  email: string()
    .required(t('register.validation.email.required'))
    .email(t('register.validation.email.invalid')),
  password: string()
    .required(t('register.validation.password.required'))
    .min(8, t('register.validation.password.min'))
    .max(32, t('register.validation.password.max')),
  confirm_password: string()
    .required(t('register.validation.password.confirmed'))
    .oneOf([YupRef('password')], t('register.validation.password.confirmed')),
});

const validate = (field: string) => {
  regsiterShape
    .validateAt(field, {
      username: username.value,
      email: email.value,
      password: password.value,
      confirm_password: confirm_password.value,
    })
    .catch((err: ValidationError) => {
      errors.value[field] = err.message;
    })
    .then((res) => {
      if (res) delete errors.value[field];
    })
    .finally(() => {
      isEnabledButton.value = canContinue();
    });
};

const register = () => {
  isLoading.value = true;

  regsiterShape
    .validate(
      {
        username: username.value,
        email: email.value,
        password: password.value,
        confirm_password: confirm_password.value,
      },
      { abortEarly: false },
    )
    .then((res) => {
      if (res && canContinue()) {
        execute()
          .catch(() => {
            errors.value['register'] = t('register.validation.captcha');

            isLoading.value = false;
            prevStep(true);
          })
          .then((captchaResponse) => {
            backendApi
              .post('/users', {
                username: username.value,
                email: email.value,
                password: password.value,
                confirm_password: confirm_password.value,
                captcha_token: captchaResponse,
              })
              .catch((err) => {
                errors.value['register'] = t(err.response.data.message);

                isLoading.value = false;
                prevStep(true);
              })
              .then((response: AxiosResponse<User> | void) => {
                if (response) {
                  const { data } = response;

                  const socket = io(import.meta.env.VITE_WEBSOCKET_ENDPOINT);

                  socket.on('verify', (message: VerificationMessage) => {
                    if (message.status === 'success') {
                      if (message.user !== data.id) return;
                      isVerified.value = true;

                      socket.close();
                    } else if (message.status === 'failed') {
                      errors.value['register'] = 'Something went wrong.';

                      prevStep(true);
                      socket.close();
                    }
                  });

                  socket.on('connect', () => {
                    socket.emit('verify', {
                      user: data.id,
                    });
                  });
                }
              })
              .finally(() => {
                if (isLoading.value) isLoading.value = false;
              });
          });
      }
    })
    .catch((err: ValidationError) => {
      err.inner.forEach((error) => {
        if (error.path) errors.value[error.path] = error.message;
      });

      isLoading.value = false;
      prevStep(true);
    });
};

const handleKeyDown = (eventData: KeyboardEvent) => {
  if (eventData.key === 'Enter') {
    eventData.preventDefault();
    nextStep();
  } else if (eventData.key === 'Escape') {
    eventData.preventDefault();
    prevStep();
  }
};

const handleOnFocus = () => {
  if (
    step.value === 3 &&
    (!isFocused.value || metaStore.isMobile) &&
    !isLoading.value &&
    isVerified.value
  ) {
    doVerifiedAnimation.value = true;
    isFocused.value = true;
  } else {
    isFocused.value = true;
  }
};

const handleFocusOut = () => (isFocused.value = false);

onMounted(() => {
  window.dispatchEvent(new Event('hideHeader'));
  window.dispatchEvent(new Event('hideFooter'));

  window.addEventListener('focusout', handleFocusOut);
  window.addEventListener('focus', handleOnFocus);
  window.addEventListener('keydown', handleKeyDown);
});
onUnmounted(() => {
  window.dispatchEvent(new Event('showHeader'));
  window.dispatchEvent(new Event('showFooter'));

  window.removeEventListener('focusout', handleFocusOut);
  window.removeEventListener('focus', handleOnFocus);
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div class="reg-bg">
    <h1 class="reg__title">
      {{
        isLoading == false && step === 3
          ? $t('register.post_registration')
          : $t('register.registration')
      }}
    </h1>
    <form class="reg__form" @submit.prevent>
      <FormStep v-if="step == 1">
        <FormInput
          v-model="username"
          :name="'username'"
          @keyup="validate('username')"
          @blur="validate('username')"
        />
        <FormInput
          v-model="email"
          :name="'email'"
          @keyup="validate('email')"
          @blur="validate('email')"
        />
      </FormStep>
      <FormStep v-if="step == 2">
        <FormInput
          v-model="password"
          :forPasswd="true"
          :name="'password'"
          @keyup="validate('password')"
          @blur="validate('password')"
        />
        <FormInput
          v-model="confirm_password"
          :forPasswd="true"
          :name="'confirm_password'"
          @keyup="validate('confirm_password')"
          @blur="validate('confirm_password')"
        />
      </FormStep>
      <FormStep v-if="step == 3 && !doVerifiedAnimation">
        <div class="reg__note">
          <vue-loaders
            v-if="isLoading"
            name="ball-scale-multiple"
            color="white"
            scale="1.5"
            class="reg__loader"
          ></vue-loaders>
          <div v-else>
            <span>{{ $t('register.note') }}</span>
            <p>{{ $t('register.note_message') }}</p>
            <p class="reg__note-attention">{{ $t('register.note_attention') }}</p>
            <span class="reg__note-help">
              {{ $t('register.note_stuck') }}
              <RouterLink to="/faq" target="_blank">{{
                $t('register.note_stuck_link')
              }}</RouterLink>
            </span>
          </div>
        </div>
      </FormStep>
      <FormStep v-if="doVerifiedAnimation">
        <div class="reg__note_verified">
          <CheckmarkIcon></CheckmarkIcon>
          <div>
            <p v-html="$t('register.note_success')"></p>
            <span v-html="$t('register.note_success_hint')"></span>
          </div>
        </div>
      </FormStep>
      <div class="reg__stepper" v-if="!doVerifiedAnimation">
        <button
          @click="prevStep()"
          :disabled="step == 1"
          class="reg__btn btn-back initial"
          :class="{ 'initial-fadeIn': step == 2 && !isLoading }"
        >
          {{ $t('register.back') }}
        </button>
        <div class="stepper__bar">
          <StepIcon :step="step"></StepIcon>
          <div>
            <span class="step">{{ $t('register.step') }}</span>
            <span class="step"> {{ step }}/3 </span>
          </div>
        </div>
        <button
          @click="nextStep()"
          :disabled="!isEnabledButton"
          class="reg__btn btn-continue"
          :class="{
            initial: step == 3 && !isLoading,
            disabled: !isEnabledButton,
          }"
        >
          {{ $t('register.continue') }}
        </button>
      </div>
      <TransitionGroup name="list" tag="ul" class="reg__error-wrapper">
        <li class="reg__error" v-for="error of errors" :key="error">
          <AppNotification
            :type="NotificationTypes.ERROR"
            :floating="false"
            :message="error"
          />
        </li>
      </TransitionGroup>
      <span
        v-html="$t('meta.recaptcha.agreement')"
        class="reg__captcha_agreement"
      >
      </span>
      <RouterLink v-if="step !== 3" class="reg__link" to="/">{{
        $t('register.already_have_account')
      }}</RouterLink>
    </form>
    <AppLogo class="reg__logo" />
  </div>
</template>

<style lang="scss" scoped>
.reg-bg {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    background: url('@/assets/img/reg-bg.jpg') no-repeat center top;
    opacity: 15%;
  }
}

.reg__title {
  margin: 100px 0 50px;
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 87px;
  text-align: center;
  color: $main;
}

.reg__form {
  width: 540px;
  text-align: center;
}

.reg__note_verified,
.reg__note {
  height: 250px;
  display: grid;
  padding: 18px 32px;
  margin: 0 0 8px;
  text-align: left;
  color: $main;
  background-color: $bg26;

  span:first-child {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    text-align: center;
    color: $secondary;
  }

  p {
    margin: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
  }

  .reg__note-attention {
    margin-top: 10px;
    font-size: 18px;
    color: $red;
  }

  .reg__note-help {
    margin: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    color: $secondary;
    margin-top: 10px;

    a {
      font-style: normal;
      text-decoration: none;
      color: $main;
      transition: color 0.3s ease;

      &:hover {
        color: $main-hover;
      }
    }
  }
}

.reg__note_verified {
  text-align: center;
  color: $n-success;

  .success-checkmark {
    transform: scale(0.8);
  }

  p {
    margin: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 33px;
  }

  span {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: $secondary;
  }
}

.reg__loader {
  align-self: center;
  justify-self: center;
}

.reg__link {
  display: block;
  margin-top: 32px;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-decoration: none;
  color: $main-hover;
  transition: color 0.3s linear;

  &:hover {
    color: $secondary;
  }
}

.reg__stepper {
  display: flex;
  text-align: left;
  width: 100%;
  height: 80px;

  .reg__btn {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 27px;
    border: none;
    outline: none;
    transition: background-color 0.3s linear;
  }
  .btn-back {
    position: relative;
    display: flex;
    padding: 26px 32px 26px 67px;
    margin-right: 8px;
    color: $main-hover;
    background-color: $bg26;

    &::after {
      content: '';
      position: absolute;
      left: 24px;
      display: block;
      align-self: center;
      width: 32px;
      height: 32px;
      background: url('@/assets/svg/modal-arrow-blue.svg');
    }

    &:hover {
      background-color: $bg33;
    }
  }

  .btn-continue {
    position: relative;
    display: flex;
    padding: 26px 32px 26px 67px;
    margin-left: 8px;
    color: $main;
    background-color: $primary-btn;

    &::after {
      content: '';
      position: absolute;
      left: 24px;
      display: block;
      align-self: center;
      width: 32px;
      height: 32px;
      background: url('@/assets/svg/modal-arrow.svg');
    }

    &:hover {
      background-color: $primary-btn-hover;
    }
  }

  .disabled {
    background-color: $secondary;

    &:hover {
      background-color: $secondary;
    }
  }

  // animation
  .initial {
    width: 0;
    padding: 26px 0px;
    margin: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.3s linear;
  }

  .initial-fadeIn {
    width: 230px;
    opacity: 1;
    margin-right: 8px;
    padding: 26px 32px 26px 67px;
  }

  .stepper__bar {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: $bg-blue;
    transition: all 0.3s linear;

    div {
      display: flex;
      flex-direction: column;

      .step:nth-child(1) {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: $main;
      }

      .step:nth-child(2) {
        position: relative;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 27px;
        color: $main;
        transform: translateY(-2px);
      }
    }
  }
}

.reg__error-wrapper {
  list-style: none;
  padding: 0;
  margin: 0;

  & > .reg__error {
    margin-top: 10px;
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  height: 0px;
  opacity: 0;
  margin: 0 !important;
  transform: translateX(30px);
}

.list-leave-from,
.list-enter-to {
  height: 70px;
  margin-top: 10px;
}

.list-leave-active {
  width: 540px;
}

.reg__logo {
  margin-top: 50px;
}
</style>
