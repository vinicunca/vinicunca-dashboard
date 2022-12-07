import type { AppRouteRecordRaw } from '../router.entity';

import { PAGE_ROUTE } from '../router.entity';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic';

const modules = import.meta.glob<Record<string, string>>('./modules/**/*.ts', { eager: true });
const routeModuleList: AppRouteRecordRaw[] = [];

Object.keys(modules).forEach((_key) => {
  const mod = modules[_key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const ROOT_ROUTE: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PAGE_ROUTE.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LOGIN_ROUTE: AppRouteRecordRaw = {
  path: PAGE_ROUTE.BASE_LOGIN,
  name: 'Login',
  // component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: 'Login',
  },
};

// Basic routing without permission
export const BASIC_ROUTES = [
  LOGIN_ROUTE,
  ROOT_ROUTE,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
