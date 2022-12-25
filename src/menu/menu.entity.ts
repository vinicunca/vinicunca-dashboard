import type { THEME_MODE } from '~~/theme/entity.theme';

export const SIDE_BAR_MINI_WIDTH = 48;
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80;

export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  siderHidden: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MENU_MODE;
  type: MENU_TYPE;
  theme: THEME_MODE;
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TRIGGER_TYPE;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MIX_SIDEBAR_TRIGGER;
  mixSideFixed: boolean;
}

/**
 * @description: menu type
 */
export enum MENU_TYPE {
  SIDEBAR = 'sidebar',
  MIX_SIDEBAR = 'mix-sidebar',
  MIX = 'mix',
  TOP_MENU = 'top-menu',
}

// Trigger Position
export enum TRIGGER_TYPE {
  NONE = 'NONE',
  FOOTER = 'FOOTER',
  HEADER = 'HEADER',
}

// menu mode
export enum MENU_MODE {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  VERTICAL_RIGHT = 'vertical-right',
  INLINE = 'inline',
}

export enum MENU_SPLIT_TYPE {
  NONE,
  TOP,
  LEFT,
}

export enum TOP_MENU_ALIGNMENT {
  CENTER = 'center',
  START = 'start',
  END = 'end',
}

export enum MIX_SIDEBAR_TRIGGER {
  HOVER = 'hover',
  CLICK = 'click',
}
