import type { MENU_MODE, MENU_TYPE, MenuSetting } from '~/menu/menu.entity';
import type { CACHE_TYPE } from '~/cache/cache.entity';
import type { HeaderSetting } from '~/header/header.entity';
import type { MultiTabsSetting } from '~/tabs/tabs.entity';
import type { TransitionSetting } from '~/transition/transition.entity';

export enum SETTINGS_BUTTON_POSITION {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}

export enum PERMISSION_MODE {
  ROLE = 'ROLE',
  BACK = 'BACK',
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

export enum SESSION_TIMEOUT_PROCESSING {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

export enum CONTENT_MODE {
  // auto width
  FULL = 'full',
  // fixed width
  FIXED = 'fixed',
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MENU_MODE;
  menuType?: MENU_TYPE;
}

export interface ProjectConfig {
  // Storage location of permission related information
  permissionCacheType: CACHE_TYPE;
  // Whether to show the configuration button
  showSettingButton: boolean;
  // Whether to show the theme switch button
  showDarkModeToggle: boolean;
  // Configure where the button is displayed
  settingButtonPosition: SETTINGS_BUTTON_POSITION;
  // Permission mode
  permissionMode: PERMISSION_MODE;
  // Session timeout processing
  sessionTimeoutProcessing: SESSION_TIMEOUT_PROCESSING;
  // Website gray mode, open for possible mourning dates
  grayMode: boolean;
  // Whether to turn on the color weak mode
  colorWeak: boolean;
  // Theme color
  themeColor: string;

  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent: boolean;
  // content width
  contentMode: CONTENT_MODE;
  // Whether to display the logo
  showLogo: boolean;
  // Whether to show the global footer
  showFooter: boolean;
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting;
  // menuSetting
  menuSetting: MenuSetting;
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting;
  // Animation configuration
  transitionSetting: TransitionSetting;
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean;
  // Lock screen time
  lockTime: number;
  // Show breadcrumbs
  showBreadCrumb: boolean;
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean;
  // Use error-handler-plugin
  useErrorHandle: boolean;
  // Whether to open back to top
  useOpenBackTop: boolean;
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean;
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean;
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean;
}
