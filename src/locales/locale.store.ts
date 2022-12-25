import type { LocaleSetting, LocaleType } from './locale.entity';

import { defineStore } from 'pinia';

import { store } from '~~/store';
import { LOCALE_KEY } from '~~/cache/cache.entity';
import { localeSetting } from '~~/locales/locale.setting';
import { createLocalStorage } from '~~/cache';

const _localStorage = createLocalStorage();
const _localeSetting = (_localStorage.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
  localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
  id: 'app-locale',

  state: (): LocaleState => ({
    localInfo: _localeSetting,
  }),

  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker;
    },
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? 'en';
    },
  },

  actions: {
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
      _localStorage.set({
        key: LOCALE_KEY,
        value: this.localInfo,
      });
    },
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
