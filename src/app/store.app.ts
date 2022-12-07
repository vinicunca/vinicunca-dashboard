import type { THEME_MODE } from '~/theme/entity.theme';
import type { ProjectConfig } from './types.app';
import type { BeforeMiniState } from './entity.app';
import type { HeaderSetting } from '~/header/entity.header';
import type { MenuSetting } from '~/menu/entity.menu';
import type { TransitionSetting } from '~/transition/entity.transition';
import type { MultiTabsSetting } from '~/tabs/entity.tab';

import { defineStore } from 'pinia';
import { mergeDeep } from '@vinicunca/js-utilities';

import { PersistentCache } from '~/cache/persistent.cache';
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '~/cache/entity.cache';
import { DARK_MODE } from '~/theme/setting.theme';
import { store } from '~/store';
import { resetRouter } from '~/router';

interface AppState {
  darkMode?: THEME_MODE;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;
  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState;
}

let timeId: TimeoutHandle;

export const useStoreApp = defineStore({
  id: 'app',

  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: PersistentCache.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),

  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || DARK_MODE;
    },

    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },

    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },

    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
  },

  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setDarkMode(mode: THEME_MODE): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    },

    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = mergeDeep(this.projectConfig || {}, config) as ProjectConfig;
      PersistentCache.setLocal({ key: PROJ_CFG_KEY, value: this.projectConfig });
    },

    async resetAllState() {
      resetRouter();
      PersistentCache.clearAll();
    },

    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});

// Need to be used outside the setup
export function useStoreAppWithOut() {
  return useStoreApp(store);
}

