'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import i18n from '@/i18n/config';
import { useTranslation } from 'react-i18next';

interface I18nContextType {
    lang: 'en' | 'ar';
    toggleLang: () => void;
}

const I18nContext = createContext<I18nContextType>({} as I18nContextType);

export function I18nProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<'en' | 'ar'>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const savedLang = localStorage.getItem('lang') as 'en' | 'ar';
        const i18nLang = i18n.language || 'en';
        const defaultLang = savedLang || (i18nLang.startsWith('ar') ? 'ar' : 'en');
        const finalLang = (defaultLang === 'ar' || defaultLang === 'en') ? defaultLang : 'en';

        setLang(finalLang);
        if (typeof i18n.changeLanguage === 'function') {
            i18n.changeLanguage(finalLang);
        }
        updateDocumentStyles(finalLang);
    }, []);

    const updateDocumentStyles = (l: 'en' | 'ar') => {
        if (typeof document !== 'undefined') {
            document.documentElement.lang = l;
            document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
        }
    };

    const toggleLang = () => {
        const next = lang === 'en' ? 'ar' : 'en';
        setLang(next);
        if (typeof i18n.changeLanguage === 'function') {
            i18n.changeLanguage(next);
        }
        localStorage.setItem('lang', next);
        updateDocumentStyles(next);
    };

    return (
        <I18nContext.Provider value={{ lang, toggleLang }}>
            <div className={mounted ? (lang === 'ar' ? 'rtl-theme' : 'ltr-theme') : 'ltr-theme'}>
                {children}
            </div>
        </I18nContext.Provider>
    );
}

export const useI18n = () => useContext(I18nContext);
