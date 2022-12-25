import './reset.css'; // TODO: use @vinicunca/unocss/reset.css instead
import 'uno.css';

import { createApp } from 'vue';
import { createVinicunca } from 'vinicunca';

import App from './app.vue';
import { initAppConfigStore } from './app/app.config';
import { setupRouter } from './router';

import { setupStore } from '~~/store';

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  /**
   * Multilingual configuration
   *
   * Asynchronous case: language files may be obtained from the server side
   */
  // await setupI18n(app);

  // Configure routing
  setupRouter(app);

  // router-guard
  // setupRouterGuard(router);

  // Register global directive
  // setupGlobDirectives(app);

  // Configure global error handling
  // setupErrorHandle(app);

  app.use(createVinicunca());

  app.mount('#app');
}

bootstrap();
