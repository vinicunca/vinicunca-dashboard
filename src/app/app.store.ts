import type { THEME_MODE } from '~~/theme/entity.theme';
import type { BeforeMiniState, ProjectConfig } from './app.entity';
import type { HeaderSetting } from '~~/header/header.entity';
import type { MenuSetting } from '~~/menu/menu.entity';
import type { TransitionSetting } from '~~/transition/transition.entity';
import type { MultiTabsSetting } from '~~/tabs/tabs.entity';

import { defineStore } from 'pinia';
import { mergeDeep } from '@vinicunca/js-utilities';

import { PersistentCache } from '~~/cache/cache.persistent';
import { APP_DARK_MODE_KEY, PROJ_CFG_KEY } from '~~/cache/cache.entity';
import { DARK_MODE } from '~~/theme/setting.theme';
import { store } from '~~/store';
import { resetRouter } from '~~/router';

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

export const useAppStore = defineStore({
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
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY) || DARK_MODE;
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
      localStorage.setItem(APP_DARK_MODE_KEY, mode);
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
export function useAppStoreWithOut() {
  return useAppStore(store);
}

