import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VitePluginCertificate from 'vite-plugin-mkcert';
import Unocss from 'unocss/vite';

import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { configVisualizerConfig } from './visualizer';
import { configImageminPlugin } from './imagemin';
import { configCompressPlugin } from './compress';

export function createVitePlugins({ viteEnv, isBuild }: { viteEnv: ViteEnv; isBuild: boolean }) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    VitePluginCertificate({
      source: 'coding',
    }),
    Unocss(),
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    );

    // vite-plugin-pwa
    // vitePlugins.push(configPwaConfig(viteEnv));
  }

  return vitePlugins;
}
