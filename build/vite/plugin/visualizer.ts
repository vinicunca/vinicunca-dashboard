/**
 * Package file volume analysis
 */
import type { Plugin } from 'vite';

import visualizer from 'rollup-plugin-visualizer';

export function configVisualizerConfig() {
  if (process.env.REPORT === 'true') {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin;
  }

  return [];
}
