import type { ConfigEnv, UserConfig } from 'vite';

import path from 'path';

import dayjs from 'dayjs';
import { loadEnv } from 'vite';

import pkg from './package.json';
import { createVitePlugins } from './build/vite/plugin';
import { getEnvVars } from './build/vite/utils.vite';
import { createProxy } from './build/vite/proxy';
import { OUTPUT_DIR } from './build/entities';

function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = getEnvVars(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        // ~/xxx => src/xxx
        {
          find: /~\//,
          replacement: `${pathResolve('src')}/`,
        },
        // #/xxx => types/xxx
        {
          find: /#\//,
          replacement: `${pathResolve('types')}/`,
        },
      ],
    },
    server: {
      https: true,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      reportCompressedSize: true, // Turning off can slightly reduce packaging time
      chunkSizeWarningLimit: 2000,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    plugins: createVitePlugins({ viteEnv, isBuild }),

    optimizeDeps: {
      include: [
        '@vue/runtime-core',
        '@vue/shared',
      ],
    },
  };
};
