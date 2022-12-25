import type { AppRouteRecordRaw } from '~~/router/router.entity';

import { LAYOUT } from '~~/router/router.entity';

const comp: AppRouteRecordRaw = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  redirect: '/comp/button',
  meta: {},

  children: [
    {
      path: 'button',
      name: 'ButtonDemo',
      component: () => import('~~/demos/comp/button.vue'),
      meta: {},
    },
  ],
};

export default comp;
