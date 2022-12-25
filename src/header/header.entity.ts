import type { THEME_MODE } from '~~/theme/entity.theme';

export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: THEME_MODE;
  // Turn on full screen
  showFullScreen: boolean;
  // Whether to show the lock screen
  useLockPage: boolean;
  // Show document button
  showDoc: boolean;
  // Show message center button
  showNotice: boolean;
  showSearch: boolean;
}
