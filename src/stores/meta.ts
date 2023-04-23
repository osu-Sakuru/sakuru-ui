import type { MetaStateOptions } from '@/interfaces/stateOptions.interface';
import { detectMobile } from '@/utils';
import { defineStore } from 'pinia';

export const useMetaStore = defineStore('meta', {
  state: () =>
    ({
      isMobile: detectMobile(),
    } as MetaStateOptions),
});
