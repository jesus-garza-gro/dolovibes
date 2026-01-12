import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar traducciones en español
import commonES from './locales/es/common.json';
import homeES from './locales/es/home.json';
import aboutES from './locales/es/about.json';
import experiencesES from './locales/es/experiences.json';
import packageInfoES from './locales/es/packageInfo.json';
import quoteFormES from './locales/es/quoteForm.json';
import hikingLevelES from './locales/es/hikingLevel.json';
import legalES from './locales/es/legal.json';

// Importar traducciones en inglés
import commonEN from './locales/en/common.json';
import homeEN from './locales/en/home.json';
import aboutEN from './locales/en/about.json';
import experiencesEN from './locales/en/experiences.json';
import packageInfoEN from './locales/en/packageInfo.json';
import quoteFormEN from './locales/en/quoteForm.json';
import hikingLevelEN from './locales/en/hikingLevel.json';
import legalEN from './locales/en/legal.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            es: {
                common: commonES,
                home: homeES,
                about: aboutES,
                experiences: experiencesES,
                packageInfo: packageInfoES,
                quoteForm: quoteFormES,
                hikingLevel: hikingLevelES,
                legal: legalES,
            },
            en: {
                common: commonEN,
                home: homeEN,
                about: aboutEN,
                experiences: experiencesEN,
                packageInfo: packageInfoEN,
                quoteForm: quoteFormEN,
                hikingLevel: hikingLevelEN,
                legal: legalEN,
            }
        },
        lng: 'es', // Idioma por defecto
        fallbackLng: 'es', // Idioma de respaldo
        defaultNS: 'common', // Namespace por defecto
        interpolation: {
            escapeValue: false, // React ya escapa por defecto
        },
    });

export default i18n;
