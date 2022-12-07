import 'uno.css';
import { createApp } from 'vue';

import App from './app.vue';

import { setupStore } from '~/store';

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  // initAppConfigStore();

  // // Register global components
  // // 注册全局组件
  // registerGlobComp(app);

  // // Multilingual configuration
  // // 多语言配置
  // // Asynchronous case: language files may be obtained from the server side
  // // 异步案例：语言文件可能从服务器端获取
  // await setupI18n(app);

  // // Configure routing
  // // 配置路由
  // setupRouter(app);

  // // router-guard
  // // 路由守卫
  // setupRouterGuard(router);

  // // Register global directive
  // // 注册全局指令
  // setupGlobDirectives(app);

  // // Configure global error handling
  // // 配置全局错误处理
  // setupErrorHandle(app);

  // // https://next.router.vuejs.org/api/#isready
  // // await router.isReady();

  // app.mount('#app');
}

bootstrap();
