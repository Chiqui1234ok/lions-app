// Sometimes stackoverflow > documentation:
// https://stackoverflow.com/questions/73078162/vue-use-i18n-within-the-setup-script
import { createI18n } from 'vue-i18n'
import enUS from '@/locales/enUS';
import esAR from '@/locales/esAR';

const messages = { 'en-US': enUS, 'es-AR': esAR };

const locales = [
  { code: 'enUS', name: 'English' },
  { code: 'esAR', name: 'Español (Argentina)' }
];

const i18n = createI18n({
    legacy: false,
    locales: locales,
    defaultLocale: 'enUS',
    fallbackLocale: 'enUS',
    messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
});

export default i18n