import type { MENU_MODE, MENU_TYPE } from '~/menu/entity.menu';

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
