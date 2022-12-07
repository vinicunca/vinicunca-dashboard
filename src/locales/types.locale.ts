export type LocaleType = 'en' | 'ru' | 'ja' | 'ko' | 'zh_CN' | 'id';

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}
