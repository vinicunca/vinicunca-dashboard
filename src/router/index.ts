import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import { createRouter, createWebHashHistory } from 'vue-router';

import { BASIC_ROUTES } from './routes';

const WHITE_LIST_NAMES: string[] = [];

function getRouteNames(array: any[]) {
  array.forEach((item) => {
    if (item.name) {
      WHITE_LIST_NAMES.push(item.name);
      getRouteNames(item.children || []);
    }
  });
}

getRouteNames(BASIC_ROUTES);

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: BASIC_ROUTES as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;

    if (name && !WHITE_LIST_NAMES.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export function setupRouter(app: App<Element>) {
  app.use(router);
}
