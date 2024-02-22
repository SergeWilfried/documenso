import type { InitOptions } from 'i18next';
import translationEn from 'zod-i18n-map/locales/en/zod.json';
import translationFr from 'zod-i18n-map/locales/fr/zod.json';
import { z } from '@documenso/lib/i18n/settings';
import { zodI18nMap } from 'zod-i18n-map';
export const FALLBACK_LOCALE = 'en';
export const supportedLocales = ['en', 'zh-CN', 'sv'] as const;
export type Locales = (typeof supportedLocales)[number];

// You can name the cookie to whatever you want
export const LANGUAGE_COOKIE = 'preferred_language';

export function getOptions(lang = FALLBACK_LOCALE, ns = 'common'): InitOptions {
  return {
    // debug: true, // Set to true to see console logs
    supportedLngs: supportedLocales,
    fallbackLng: FALLBACK_LOCALE,
    lng: lang,
    ns,
    resources: {
      fr: { zod: translationFr },
      en: { zod: translationEn },
    },
  };
}

z.setErrorMap(zodI18nMap);
// export configured zod instance
export { z };
