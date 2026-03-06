import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ar from './locales/ar.json';

// In Next.js, we don't know the language on the server during build
// So we init with a default and let the Client-side I18nProvider take over.
i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ar: { translation: ar },
        },
        lng: 'en', // Default initial language
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        react: {
            useSuspense: false
        }
    });

export default i18n;
