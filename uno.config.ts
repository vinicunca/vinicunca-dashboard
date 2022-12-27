import { defineConfig, presetIcons, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetVinicunca } from '@vinicunca/unocss-preset';

export default defineConfig({
  theme: {
    colors: {
      brand: {
        background: '#FFFFFF',
        primary: '#1976D2',
        secondary: '#9c27b0',
        error: '#d32f2f',
        info: '#0288d1',
        success: '#2e7d32',
        warning: '#ed6c02',
      },
    },

    textIndent: {
      button: '0.0892857143em',
    },

    letterSpacing: {
      button: '0.0892857143em',
    },

  },

  presets: [
    presetUno(),

    presetIcons(),

    presetWebFonts({
      provider: 'google',
      fonts: {
        'sans': [
          {
            // name: 'Inter',
            // weights: ['100..900'],
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
          },
        ],
        'mono': [
          {
            name: 'Fira Code',
            weights: ['300..700'],
          },
        ],
        'source': [
          {
            name: 'Source Sans Pro',
            weights: [400],
          },
        ],
        'ubuntu-mono': [
          {
            name: 'Ubuntu Mono',
            weights: [700],
          },
        ],
      },
    }),

    presetVinicunca({
      prefix: 'vin-',
      theme: {
        preflights: {
          'background': '#fff',
          'on-background': '#000',
          'surface': '#fff',
          'on-surface': '#000',
          'overlay-multiplier': 1,
          'scrollbar-offset': '0px',
        },
      },
      components: {
        button: {
          blackContrast: '#000',
          whiteContrast: '#fff',
          sizes: {
            'x-small': '[--vin-height:20px] text-[0.625rem] min-w-[36px] px-2',
            'small': '[--vin-height:28px] text-[0.75rem] min-w-[50px] px-3',
            'large': '[--vin-height:44px] text-[1rem] min-w-[78px] px-5',
            'x-large': '[--vin-height:52px] text-[1.125rem] min-w-[92px] px-6',
          },
        },
      },
    }),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  shortcuts: [
    {
      'vin-grid': `
        grid
        grid-rows-[repeat(var(--grid-rows,1),1fr)]
        grid-cols-[repeat(var(--grid-cols,12),1fr)]
        gap-[var(--grid-gap,1.5rem)]
      `,
    },
    [
      /^g-col-(.*)$/,
      ([, c]) => `col-start-auto col-end-[span_${c}]`,
    ],
    [
      /^g-start-(.*)$/,
      ([, c]) => `col-start-${c}`,
    ],
  ],
});
