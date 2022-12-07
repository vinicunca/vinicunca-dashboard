import type { LocaleSetting, LocaleType } from './locale.entity';

export const LOCALE: Record<string, LocaleType> = {
  EN_US: 'en',
  ID: 'id',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.EN_US,
  // Default locale
  fallback: LOCALE.EN_US,
  // available Locales
  availableLocales: [LOCALE.EN_US, LOCALE.ID],
};

// locale list
export const localeList = [
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
  {
    text: 'Indonesian',
    event: LOCALE.ID,
  },
];
