import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en from '../locales/en.json';
import sw from '../locales/sw.json';

// Initialize i18n
export const i18n = new I18n({
  en,
  sw,
});

// Normalize locale: 'en-US' → 'en', 'sw-TZ' → 'sw'
const locales = getLocales();
const rawLocale = locales?.[0]?.languageCode ?? 'en';
i18n.locale = rawLocale.split('-')[0]; // strip region suffix

i18n.enableFallback = true;
i18n.defaultLocale = 'en';
i18n.missingTranslationPrefix = ''; // suppress '[missing...]' prefix

export default i18n;
