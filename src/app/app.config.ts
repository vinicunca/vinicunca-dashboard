import type { ProjectConfig } from './app.entity';

import { mergeDeep } from '@vinicunca/js-utilities';

import { useAppStore } from './app.store';
import { projectSettings } from './app.setting';

import { useLocaleStore } from '~~/locales/locale.store';
import { getCommonStoragePrefix, getStorageShortName } from '~~/utils/env';
import { PersistentCache } from '~~/cache/cache.persistent';
import { PROJ_CFG_KEY } from '~~/cache/cache.entity';
// import { PRIMARY_COLOR } from '~~/theme/setting.theme';

export function initAppConfigStore() {
  const localeStore = useLocaleStore();
  const appStore = useAppStore();
  let projectConfig: ProjectConfig = PersistentCache.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projectConfig = mergeDeep(projectSettings, projectConfig || {}) as ProjectConfig;
  // const darkMode = storeApp.getDarkMode;
  // const {
  //   colorWeak,
  //   grayMode,
  //   themeColor,

  //   headerSetting: { bgColor: headerBgColor } = {},
  //   menuSetting: { bgColor } = {},
  // } = projectConfig;

  // try {
  //   if (themeColor && themeColor !== PRIMARY_COLOR) {
  //     changeTheme(themeColor);
  //   }

  //   grayMode && updateGrayMode(grayMode);
  //   colorWeak && updateColorWeak(colorWeak);
  // } catch (error) {
  //   console.log(error);
  // }
  appStore.setProjectConfig(projectConfig);

  // init dark mode
  // updateDarkTheme(darkMode);
  // if (darkMode === ThemeEnum.DARK) {
  //   updateHeaderBgColor();
  //   updateSidebarBgColor();
  // } else {
  //   headerBgColor && updateHeaderBgColor(headerBgColor);
  //   bgColor && updateSidebarBgColor(bgColor);
  // }
  // init store
  localeStore.initLocale();

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

/**
  * As the version continues to iterate, there will be more and more cache keys stored in localStorage.
  * This method is used to delete useless keys
  */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}

