<script setup lang="ts">
import ProfileGraph from '@/components/ProfileGraph/ProfileGraph.vue';
import type { User, UserGraphs, UserStats } from '@/interfaces/user.interface';
import { backendApi } from '@/main';
import { useUserStore } from '@/stores/user';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment';
import type { ChartDataset } from 'chart.js';

const userStore = useUserStore();
const router = useRouter();

const activeMode = ref(0);
const activeMods = ref(0);
const activeGameMode = computed(() => activeMode.value + 4 * activeMods.value);
const userPath = computed(() => router.currentRoute.value.params.user);

const isSelfUser = userStore.isSelf(userPath.value as string);
const currentUser = ref<User>();
const currentUserStats = ref<UserStats>();
const currentUserAvatar = ref<string>('');

const graphDatasets = ref<ChartDataset<'line'>[]>([]);

const setUser = () => {
  backendApi.get<User>(`/users/${userPath.value}`).then(({ data: user }) => {
    currentUser.value = user;
    currentUserAvatar.value = `url('https://a.${
      import.meta.env.VITE_APP_DOMAIN
    }/${user.id}')`;
  });
};

if (userStore.isLoggedIn) {
  if (isSelfUser) {
    if (userPath.value !== 'me')
      router.push({
        path: '/users/me',
        replace: true,
      });

    currentUser.value = userStore.user;
    currentUserAvatar.value = `url('https://a.${
      import.meta.env.VITE_APP_DOMAIN
    }/${userStore.user.id}')`;
  } else {
    setUser();
  }
} else {
  if (userPath.value === 'me') router.push({ path: '/' });
  else setUser();
}

const setCurrentStats = async () => {
  const { data: stats } = await backendApi.get<UserStats>(
    `/users/${isSelfUser ? userStore.user.id : userPath.value}/stats`,
    {
      params: {
        mode: activeGameMode.value,
      },
    },
  );
  currentUserStats.value = stats;

  const { data: graphs } = await backendApi.get<UserGraphs>(
    `/users/${isSelfUser ? userStore.user.id : userPath.value}/graphs`,
    {
      params: {
        mode: activeGameMode.value,
      },
    },
  );

  // Filling the array with basic value if the length is less than 60
  if (graphs.data.length !== 60)
    graphs.data.push(
      ...new Array(60 - graphs.data.length).fill({
        captured_at: graphs.data[graphs.data.length - 1].captured_at,
        pp: graphs.data[graphs.data.length - 1].pp,
        rank: graphs.data[graphs.data.length - 1].rank,
        country_rank: graphs.data[graphs.data.length - 1].country_rank,
      }),
    );

  // Pushing current user stats to the beginning of the array
  graphs.data.unshift({
    captured_at: new Date(),
    pp: currentUserStats.value!.pp,
    rank: currentUserStats.value!.global_rank,
    country_rank: currentUserStats.value!.country_rank,
  });

  // Set the Global Rank graph dataset
  graphDatasets.value[0] = {
    label: 'Global Rank #',
    tension: 0.1,
    data: graphs.data.map<number>(({ rank }) => rank),
  };
};

const isFriend = ref(false);
const isOnline = ref(false);
const isSupporter = ref(false);

watch(activeGameMode, async () => await setCurrentStats(), { immediate: true });
</script>

<template>
  <div class="bg">
    <section class="main">
      <div class="container">
        <div class="main__cover">
          <div class="main__info">
            <span class="main__avatar"></span>
            <div class="main__plate">
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 28.5C22.6274 28.5 28 23.1274 28 16.5C28 9.87258 22.6274 4.5 16 4.5C9.37258 4.5 4 9.87258 4 16.5C4 23.1274 9.37258 28.5 16 28.5Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-miterlimit="10"
                />
                <path
                  d="M16 20.5C18.7614 20.5 21 18.2614 21 15.5C21 12.7386 18.7614 10.5 16 10.5C13.2386 10.5 11 12.7386 11 15.5C11 18.2614 13.2386 20.5 16 20.5Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-miterlimit="10"
                />
                <path
                  d="M7.9751 25.4218C8.72836 23.9408 9.87675 22.6971 11.2931 21.8284C12.7095 20.9598 14.3387 20.5 16.0002 20.5C17.6617 20.5 19.2909 20.9598 20.7073 21.8284C22.1237 22.6971 23.272 23.9407 24.0253 25.4217"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="main__plate-info">
                <span class="player-info">{{ $t('profile.player_info') }}</span>
                <h2>{{ currentUser?.name }}</h2>
                <span class="main__plate-status">
                  <i></i>
                  <span class="status" :class="{ offline: !isOnline }">{{
                    isOnline ? $t('profile.online') : $t('profile.offline')
                  }}</span>
                </span>
              </div>
            </div>
          </div>
          <button
            v-if="!isSelfUser && userStore.isLoggedIn"
            @click="isFriend = !isFriend"
            class="main__add-friend"
            :class="{ mutual: isFriend }"
          >
            {{
              isFriend ? $t('profile.friend.added') : $t('profile.friend.add')
            }}
          </button>
          <div v-if="isSupporter" class="main__supporter">
            <svg
              width="17"
              height="18"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.75 7.5H3.9375L4.8125 6.1875L6.5625 8.8125L7.4375 7.5H8.75"
                stroke="white"
                stroke-width="0.875"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.5375 5.74965C1.53336 5.67711 1.53128 5.60432 1.53125 5.53125C1.53136 4.87398 1.75911 4.23704 2.17577 3.72871C2.59243 3.22038 3.17228 2.87204 3.81674 2.74293C4.46121 2.61381 5.1305 2.71188 5.71083 3.02046C6.29115 3.32904 6.7467 3.82909 7 4.43559L6.99999 4.43559C7.2533 3.8291 7.70884 3.32905 8.28917 3.02046C8.8695 2.71188 9.53879 2.61381 10.1833 2.74293C10.8277 2.87204 11.4076 3.22038 11.8242 3.72871C12.2409 4.23704 12.4686 4.87398 12.4688 5.53125C12.4688 9.25 7 12.3125 7 12.3125C7 12.3125 4.81553 11.0892 3.20783 9.25006"
                stroke="white"
                stroke-width="0.875"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>{{ $t('profile.supporter') }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="profile-stats">
      <div class="container">
        <div class="modes-wrapper">
          <div class="modes">
            <button
              @click="activeMode = 0"
              class="mode-btn std"
              :class="{ 'active-gamemode': activeMode === 0 }"
            >
              <i></i>
              osu!
            </button>
            <button
              @click="activeMode = 1"
              class="mode-btn taiko"
              :disabled="activeMods === 2"
              :class="{
                'active-gamemode': activeMode === 1,
                disabled: activeMods === 2,
              }"
            >
              <i></i>
              osu!taiko
            </button>
            <button
              @click="activeMode = 2"
              class="mode-btn catch"
              :disabled="activeMods === 2"
              :class="{
                'active-gamemode': activeMode === 2,
                disabled: activeMods === 2,
              }"
            >
              <i></i>
              osu!catch
            </button>
            <button
              @click="activeMode = 3"
              class="mode-btn mania"
              :disabled="[1, 2].includes(activeMods)"
              :class="{
                'active-gamemode': activeMode === 3,
                disabled: [1, 2].includes(activeMods),
              }"
            >
              <i></i>
              osu!mania
            </button>
          </div>
          <div class="mods">
            <button
              @click="activeMods = 0"
              class="mode-btn mod vanilla"
              :class="{
                'active-mod': activeMods === 0,
              }"
            >
              Vanilla
            </button>
            <button
              @click="activeMods = 1"
              class="mode-btn mod relax"
              :disabled="activeMode === 3"
              :class="{
                'active-mod': activeMods === 1,
                disabled: activeMode === 3,
              }"
            >
              Relax
            </button>
            <button
              @click="activeMods = 2"
              class="mode-btn mod autopilot"
              :disabled="[1, 2, 3].includes(activeMode)"
              :class="{
                'active-mod': activeMods === 2,
                disabled: [1, 2, 3].includes(activeMode),
              }"
            >
              Autopilot
            </button>
          </div>
        </div>
        <div class="profile__stats">
          <div class="main-info">
            <ProfileGraph :datasets="graphDatasets" />
            <div class="stats-wrapper">
              <div class="stats-rankings">
                <p>
                  <span>{{ $t('profile.global_ranking') }}</span>
                  <span>#{{ currentUserStats?.global_rank }}</span>
                </p>
                <p>
                  <span>{{ $t('profile.country_ranking') }}</span>
                  <span>#{{ currentUserStats?.country_rank }}</span>
                </p>
              </div>
              <div class="stats-ranks">
                <div class="stats-ranks__section">
                  <span class="rank">
                    <svg
                      width="21"
                      height="14"
                      viewBox="0 0 21 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.84463 13.216C3.74063 13.216 2.80463 13.03 2.03662 12.658C1.26863 12.274 0.614625 11.782 0.074625 11.182L1.87463 9.364C2.72663 10.324 3.77663 10.804 5.02463 10.804C5.69663 10.804 6.19463 10.666 6.51863 10.39C6.84263 10.114 7.00463 9.748 7.00463 9.292C7.00463 8.944 6.90863 8.656 6.71663 8.428C6.52463 8.188 6.13463 8.026 5.54663 7.942L4.30463 7.78C2.97263 7.612 1.99463 7.21 1.37063 6.574C0.758625 5.938 0.452625 5.092 0.452625 4.036C0.452625 3.472 0.560625 2.956 0.776625 2.488C0.992625 2.02 1.29863 1.618 1.69463 1.282C2.10263 0.946 2.59463 0.688 3.17063 0.508C3.75863 0.316 4.42463 0.219999 5.16863 0.219999C6.11663 0.219999 6.95063 0.369999 7.67063 0.669999C8.39063 0.969999 9.00863 1.408 9.52463 1.984L7.70663 3.82C7.40663 3.472 7.04063 3.19 6.60863 2.974C6.18863 2.746 5.65463 2.632 5.00663 2.632C4.39463 2.632 3.93863 2.74 3.63863 2.956C3.33863 3.172 3.18863 3.472 3.18863 3.856C3.18863 4.288 3.30263 4.6 3.53063 4.792C3.77063 4.984 4.15462 5.122 4.68262 5.206L5.92463 5.404C7.22063 5.608 8.18063 6.01 8.80463 6.61C9.42863 7.198 9.74063 8.038 9.74063 9.13C9.74063 9.73 9.63263 10.282 9.41663 10.786C9.20063 11.29 8.88263 11.722 8.46263 12.082C8.05463 12.442 7.54463 12.724 6.93263 12.928C6.32063 13.12 5.62463 13.216 4.84463 13.216ZM15.831 13.216C14.727 13.216 13.791 13.03 13.023 12.658C12.255 12.274 11.601 11.782 11.061 11.182L12.861 9.364C13.713 10.324 14.763 10.804 16.011 10.804C16.683 10.804 17.181 10.666 17.505 10.39C17.829 10.114 17.991 9.748 17.991 9.292C17.991 8.944 17.895 8.656 17.703 8.428C17.511 8.188 17.121 8.026 16.533 7.942L15.291 7.78C13.959 7.612 12.981 7.21 12.357 6.574C11.745 5.938 11.439 5.092 11.439 4.036C11.439 3.472 11.547 2.956 11.763 2.488C11.979 2.02 12.285 1.618 12.681 1.282C13.089 0.946 13.581 0.688 14.157 0.508C14.745 0.316 15.411 0.219999 16.155 0.219999C17.103 0.219999 17.937 0.369999 18.657 0.669999C19.377 0.969999 19.995 1.408 20.511 1.984L18.693 3.82C18.393 3.472 18.027 3.19 17.595 2.974C17.175 2.746 16.641 2.632 15.993 2.632C15.381 2.632 14.925 2.74 14.625 2.956C14.325 3.172 14.175 3.472 14.175 3.856C14.175 4.288 14.289 4.6 14.517 4.792C14.757 4.984 15.141 5.122 15.669 5.206L16.911 5.404C18.207 5.608 19.167 6.01 19.791 6.61C20.415 7.198 20.727 8.038 20.727 9.13C20.727 9.73 20.619 10.282 20.403 10.786C20.187 11.29 19.869 11.722 19.449 12.082C19.041 12.442 18.531 12.724 17.919 12.928C17.307 13.12 16.611 13.216 15.831 13.216Z"
                        fill="#CDE7E7"
                      />
                    </svg>
                    <div>{{ currentUserStats?.xh_count }}</div>
                  </span>
                  <span class="rank">
                    <svg
                      width="21"
                      height="14"
                      viewBox="0 0 21 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.84463 13.216C3.74063 13.216 2.80463 13.03 2.03662 12.658C1.26863 12.274 0.614625 11.782 0.074625 11.182L1.87463 9.364C2.72663 10.324 3.77663 10.804 5.02463 10.804C5.69663 10.804 6.19463 10.666 6.51863 10.39C6.84263 10.114 7.00463 9.748 7.00463 9.292C7.00463 8.944 6.90863 8.656 6.71663 8.428C6.52463 8.188 6.13463 8.026 5.54663 7.942L4.30463 7.78C2.97263 7.612 1.99463 7.21 1.37063 6.574C0.758625 5.938 0.452625 5.092 0.452625 4.036C0.452625 3.472 0.560625 2.956 0.776625 2.488C0.992625 2.02 1.29863 1.618 1.69463 1.282C2.10263 0.946 2.59463 0.688 3.17063 0.508C3.75863 0.316 4.42463 0.219999 5.16863 0.219999C6.11663 0.219999 6.95063 0.369999 7.67063 0.669999C8.39063 0.969999 9.00863 1.408 9.52463 1.984L7.70663 3.82C7.40663 3.472 7.04063 3.19 6.60863 2.974C6.18863 2.746 5.65463 2.632 5.00663 2.632C4.39463 2.632 3.93863 2.74 3.63863 2.956C3.33863 3.172 3.18863 3.472 3.18863 3.856C3.18863 4.288 3.30263 4.6 3.53063 4.792C3.77063 4.984 4.15462 5.122 4.68262 5.206L5.92463 5.404C7.22063 5.608 8.18063 6.01 8.80463 6.61C9.42863 7.198 9.74063 8.038 9.74063 9.13C9.74063 9.73 9.63263 10.282 9.41663 10.786C9.20063 11.29 8.88263 11.722 8.46263 12.082C8.05463 12.442 7.54463 12.724 6.93263 12.928C6.32063 13.12 5.62463 13.216 4.84463 13.216ZM15.831 13.216C14.727 13.216 13.791 13.03 13.023 12.658C12.255 12.274 11.601 11.782 11.061 11.182L12.861 9.364C13.713 10.324 14.763 10.804 16.011 10.804C16.683 10.804 17.181 10.666 17.505 10.39C17.829 10.114 17.991 9.748 17.991 9.292C17.991 8.944 17.895 8.656 17.703 8.428C17.511 8.188 17.121 8.026 16.533 7.942L15.291 7.78C13.959 7.612 12.981 7.21 12.357 6.574C11.745 5.938 11.439 5.092 11.439 4.036C11.439 3.472 11.547 2.956 11.763 2.488C11.979 2.02 12.285 1.618 12.681 1.282C13.089 0.946 13.581 0.688 14.157 0.508C14.745 0.316 15.411 0.219999 16.155 0.219999C17.103 0.219999 17.937 0.369999 18.657 0.669999C19.377 0.969999 19.995 1.408 20.511 1.984L18.693 3.82C18.393 3.472 18.027 3.19 17.595 2.974C17.175 2.746 16.641 2.632 15.993 2.632C15.381 2.632 14.925 2.74 14.625 2.956C14.325 3.172 14.175 3.472 14.175 3.856C14.175 4.288 14.289 4.6 14.517 4.792C14.757 4.984 15.141 5.122 15.669 5.206L16.911 5.404C18.207 5.608 19.167 6.01 19.791 6.61C20.415 7.198 20.727 8.038 20.727 9.13C20.727 9.73 20.619 10.282 20.403 10.786C20.187 11.29 19.869 11.722 19.449 12.082C19.041 12.442 18.531 12.724 17.919 12.928C17.307 13.12 16.611 13.216 15.831 13.216Z"
                        fill="#FFCC22"
                      />
                    </svg>
                    <div>{{ currentUserStats?.x_count }}</div>
                  </span>
                </div>
                <div class="stats-ranks__section">
                  <span class="rank">
                    <svg
                      width="10"
                      height="14"
                      viewBox="0 0 10 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.83779 13.216C3.73379 13.216 2.79779 13.03 2.02979 12.658C1.26179 12.274 0.607789 11.782 0.0677891 11.182L1.86779 9.364C2.71979 10.324 3.76979 10.804 5.01779 10.804C5.68979 10.804 6.18779 10.666 6.51179 10.39C6.83579 10.114 6.99779 9.748 6.99779 9.292C6.99779 8.944 6.90179 8.656 6.70979 8.428C6.51779 8.188 6.12779 8.026 5.53979 7.942L4.29779 7.78C2.96579 7.612 1.98779 7.21 1.36379 6.574C0.751789 5.938 0.445789 5.092 0.445789 4.036C0.445789 3.472 0.553789 2.956 0.769789 2.488C0.985789 2.02 1.29179 1.618 1.68779 1.282C2.09579 0.946 2.58779 0.688 3.16379 0.508C3.75179 0.316 4.41779 0.219999 5.16179 0.219999C6.10979 0.219999 6.94379 0.369999 7.66379 0.669999C8.38379 0.969999 9.00179 1.408 9.51779 1.984L7.69979 3.82C7.39979 3.472 7.03379 3.19 6.60179 2.974C6.18179 2.746 5.64779 2.632 4.99979 2.632C4.38779 2.632 3.93179 2.74 3.63179 2.956C3.33179 3.172 3.18179 3.472 3.18179 3.856C3.18179 4.288 3.29579 4.6 3.52379 4.792C3.76379 4.984 4.14779 5.122 4.67579 5.206L5.91779 5.404C7.21379 5.608 8.17379 6.01 8.79779 6.61C9.42179 7.198 9.73379 8.038 9.73379 9.13C9.73379 9.73 9.62579 10.282 9.40979 10.786C9.19379 11.29 8.87579 11.722 8.45579 12.082C8.04779 12.442 7.53779 12.724 6.92579 12.928C6.31379 13.12 5.61779 13.216 4.83779 13.216Z"
                        fill="#CDE7E7"
                      />
                    </svg>
                    <div>{{ currentUserStats?.sh_count }}</div>
                  </span>
                  <span class="rank">
                    <svg
                      width="10"
                      height="14"
                      viewBox="0 0 10 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.83779 13.216C3.73379 13.216 2.79779 13.03 2.02979 12.658C1.26179 12.274 0.607789 11.782 0.0677891 11.182L1.86779 9.364C2.71979 10.324 3.76979 10.804 5.01779 10.804C5.68979 10.804 6.18779 10.666 6.51179 10.39C6.83579 10.114 6.99779 9.748 6.99779 9.292C6.99779 8.944 6.90179 8.656 6.70979 8.428C6.51779 8.188 6.12779 8.026 5.53979 7.942L4.29779 7.78C2.96579 7.612 1.98779 7.21 1.36379 6.574C0.751789 5.938 0.445789 5.092 0.445789 4.036C0.445789 3.472 0.553789 2.956 0.769789 2.488C0.985789 2.02 1.29179 1.618 1.68779 1.282C2.09579 0.946 2.58779 0.688 3.16379 0.508C3.75179 0.316 4.41779 0.219999 5.16179 0.219999C6.10979 0.219999 6.94379 0.369999 7.66379 0.669999C8.38379 0.969999 9.00179 1.408 9.51779 1.984L7.69979 3.82C7.39979 3.472 7.03379 3.19 6.60179 2.974C6.18179 2.746 5.64779 2.632 4.99979 2.632C4.38779 2.632 3.93179 2.74 3.63179 2.956C3.33179 3.172 3.18179 3.472 3.18179 3.856C3.18179 4.288 3.29579 4.6 3.52379 4.792C3.76379 4.984 4.14779 5.122 4.67579 5.206L5.91779 5.404C7.21379 5.608 8.17379 6.01 8.79779 6.61C9.42179 7.198 9.73379 8.038 9.73379 9.13C9.73379 9.73 9.62579 10.282 9.40979 10.786C9.19379 11.29 8.87579 11.722 8.45579 12.082C8.04779 12.442 7.53779 12.724 6.92579 12.928C6.31379 13.12 5.61779 13.216 4.83779 13.216Z"
                        fill="#FFCC22"
                      />
                    </svg>
                    <div>{{ currentUserStats?.s_count }}</div>
                  </span>
                  <span class="rank">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.46487 13L8.56487 10.012H4.37087L3.47087 13H0.698867L4.83887 0.436H8.22287L12.3089 13H9.46487ZM6.49487 2.92H6.40487L5.01887 7.69H7.89887L6.49487 2.92Z"
                        fill="#2BFF35"
                      />
                    </svg>
                    <div>{{ currentUserStats?.a_count }}</div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="profile__details-wrapper">
            <div class="profile__details">
              <div>
                <dl class="detail__entry">
                  <dt class="detail__key">
                    {{ $t('profile.details.pp') }}
                  </dt>
                  <dd class="detail__value">
                    {{ currentUserStats?.pp.toLocaleString() }}pp
                  </dd>
                </dl>
                <dl class="detail__entry">
                  <dt class="detail__key">
                    {{ $t('profile.details.accuracy') }}
                  </dt>
                  <dd class="detail__value">
                    {{ currentUserStats?.acc.toFixed(2) }}%
                  </dd>
                </dl>
                <dl class="detail__entry">
                  <dt class="detail__key">
                    {{ $t('profile.details.ranked_score') }}
                  </dt>
                  <dd class="detail__value">
                    {{ Number(currentUserStats?.rscore).toLocaleString() }}
                  </dd>
                </dl>
                <dl class="detail__entry">
                  <dt class="detail__key">
                    {{ $t('profile.details.total_score') }}
                  </dt>
                  <dd class="detail__value">
                    {{ Number(currentUserStats?.tscore).toLocaleString() }}
                  </dd>
                </dl>
                <dl class="detail__entry">
                  <dt class="detail__key">
                    {{ $t('profile.details.max_combo') }}
                  </dt>
                  <dd class="detail__value">
                    {{ currentUserStats?.max_combo.toLocaleString() }}
                  </dd>
                </dl>
              </div>
              <div>
                <dl class="detail__entry">
                  <dt class="detail__key">
                    {{ $t('profile.details.play_count') }}
                  </dt>
                  <dd class="detail__value">
                    {{ currentUserStats?.plays.toLocaleString() }}
                  </dd>
                </dl>
                <dl class="detail__entry">
                  <dt class="detail__key">
                    {{ $t('profile.details.first_places') }}
                  </dt>
                  <dd class="detail__value">
                    {{ currentUserStats?.first_places }}
                  </dd>
                </dl>
                <dl class="detail__entry">
                  <dt class="detail__key">
                    {{ $t('profile.details.watched_replays') }}
                  </dt>
                  <dd class="detail__value">
                    {{ currentUserStats?.replay_views }}
                  </dd>
                </dl>
                <dl class="detail__entry">
                  <dt class="detail__key">
                    {{ $t('profile.details.playtime') }}
                  </dt>
                  <dd class="detail__value">
                    {{
                      moment
                        .duration(currentUserStats?.playtime, 'seconds')
                        .humanize()
                    }}
                  </dd>
                </dl>
              </div>
            </div>
            <div class="profile__level-wrapper">
              <span
                class="progress-bar"
                :style="`width: ${currentUserStats?.level.progress}%;`"
              ></span>
              <span class="level"
                >{{ $t('profile.details.level') }}
                {{ currentUserStats?.level.current }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 550px;
    background-color: $bg15;
  }
}

.main {
  margin-top: 100px;
}

.main__cover {
  position: relative;
  z-index: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 400px;
  background: url('@/assets/img/profile-cover.jpg') no-repeat center;
  background-size: cover;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(248, 248, 249, 0) 100%
    );
  }
}

.main__info {
  display: flex;
  align-items: flex-end;
  margin: 24px 32px;
}

.main__plate {
  display: flex;
  align-items: center;
  height: 80px;
  margin-left: 12px;
  padding: 18px 94px 18px 32px;
  background-color: $tile-bright;

  &-info {
    position: relative;
    display: flex;
    align-self: end;
    margin-left: 24px;

    .player-info {
      position: absolute;
      bottom: 100%;
      left: 0;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: $main;
    }

    & > h2 {
      position: relative;
      margin: 0;
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 27px;
      color: $main;
    }
  }

  &-status {
    display: flex;
    align-items: center;
    margin-left: 4px;

    & > i {
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 4px;
      background-image: url('@/assets/svg/user-formerly-known.svg');
    }

    .status {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      color: $n-success;
      transform: translateY(2px);
    }

    .offline {
      color: $n-error;
    }
  }
}

.main__avatar {
  position: relative;
  display: block;
  width: 128px;
  height: 128px;
  background-image: v-bind(currentUserAvatar);
  background-repeat: no-repeat;
  background-size: cover;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.main__add-friend {
  // TODO: if user not logged in make cursor default
  position: relative;
  margin: 24px 32px;
  padding: 18px 32px 18px 68px;
  outline: none;
  border: none;
  color: $main;
  background: transparent;
  transition: color 0.3s ease, background-color 0.2s ease;

  &::after,
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 25px;
    width: 25px;
    height: 2px;
    border-radius: 4px;
    background-color: $main;
    transition: all 0.3s ease;
  }

  &::before {
    transform: rotate(90deg);
  }

  &:hover {
    color: $main-hover;

    &::after,
    &::before {
      background-color: $main-hover;
    }
  }
}

.mutual {
  border-radius: 4px;
  background: $primary-btn;

  &::after {
    top: calc(50% + 5px);
    width: 10px;
    transform: rotate(45deg);
  }

  &::before {
    left: calc(25px + 4px);
    transform: rotate(-45deg);
  }

  &:hover {
    color: $main;
    background: $primary-btn-hover;

    &::after,
    &::before {
      background-color: $main;
    }
  }
}

.main__supporter {
  position: absolute;
  z-index: $zindex-ontop;
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 24px 32px;
  right: 0;
  top: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: $main;
  background-color: $primary-btn;
  border-radius: 4px;
  cursor: default;

  & > svg {
    margin-right: 5px;
  }
}

.modes-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.mode-btn {
  position: relative;
  width: 135px;
  height: 50px;
  padding: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  border: none;
  outline: none;
  background: transparent;
  color: $main;

  & > i {
    display: inline-block;
    width: 16px;
    height: 16px;
    transform: translateY(3px);
  }
}

.mod {
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: $main-hover;
}
.std {
  background-color: $bg59;

  & > i {
    background: url('@/assets/svg/modes/std.svg');
  }
}

.taiko {
  background-color: $bg48;

  & > i {
    background: url('@/assets/svg/modes/taiko.svg');
  }
}

.catch {
  background-color: $bg33;

  & > i {
    background: url('@/assets/svg/modes/catch.svg');
  }
}

.mania {
  background-color: $bg26;

  & > i {
    background: url('@/assets/svg/modes/mania.svg');
  }
}

.vanilla {
  background-color: $bg48;
}

.relax {
  background-color: $bg33;
}

.autopilot {
  background-color: $bg26;
}

.active-gamemode {
  background-color: $primary-btn;
}

.active-mod {
  color: #000000;
  background-color: $main-hover;
}

.profile__stats {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 18px 0 36px 0;
  padding: 24px;
  background-color: $bg26;
}

.main-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.stats-wrapper {
  display: flex;
  justify-content: space-between;
}

.stats-rankings {
  display: flex;
  align-items: center;

  & > p:nth-child(2) {
    margin-left: 8px;
  }

  & > p {
    margin: 0;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: $bg48;

    & > span {
      display: block;
    }

    & > span:nth-child(1) {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: $secondary;
    }

    & > span:nth-child(2) {
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 27px;
      color: $main;
    }
  }
}

.stats-ranks {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.stats-ranks__section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 25px;
}

.rank {
  text-align: center;

  & > div {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: $secondary;
  }
}

.profile__details-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.profile__details {
  display: flex;
  gap: 70px;
  margin-bottom: 20px;

  & > div {
    width: 265px;
  }
}

.detail__entry {
  display: flex;
  justify-content: space-between;
  margin: 0 0 2px 0;
}

.detail__key {
  margin: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: $main;
}

.detail__value {
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: $main;
}

.profile__level-wrapper {
  position: relative;
  width: 100%;
  padding: 4px 16px;
  border-radius: 4px;
  overflow: hidden;
  background-color: $bg48;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  border-radius: 4px;
  display: block;
  background-color: $main-hover;
}

.level {
  display: block;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: $main;
  transform: translateY(2px);
}

.disabled {
  background-color: #1a1a1a;

  &:hover {
    background-color: #1a1a1a;
  }
}
</style>
