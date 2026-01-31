import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'od'; // English and Odia

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.courses': 'Courses',
        'nav.materials': 'Study Materials',
        'nav.simulations': 'Simulations',
        'nav.about': 'About Us',

        // Common
        'common.learnMore': 'Learn More',
        'common.getStarted': 'Get Started',
        'common.viewAll': 'View All',
        'common.loading': 'Loading...',
        'common.search': 'Search',
        'common.filter': 'Filter',
        'common.close': 'Close',

        // Hero Section
        'hero.title': 'Empowering Education Through Innovation',
        'hero.subtitle': 'Quality learning resources for students across India',

        // Footer
        'footer.company': 'Company',
        'footer.resources': 'Resources',
        'footer.legal': 'Legal',
        'footer.contact': 'Contact Us',
        'footer.email': 'Email',
        'footer.phone': 'Phone',
        'footer.rights': 'All rights reserved',
    },
    od: {
        // Navigation (Odia translations)
        'nav.home': 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
        'nav.courses': 'ପାଠ୍ୟକ୍ରମ',
        'nav.materials': 'ଅଧ୍ୟୟନ ସାମଗ୍ରୀ',
        'nav.simulations': 'ସିମୁଲେସନ୍',
        'nav.about': 'ଆମ ବିଷୟରେ',

        // Common
        'common.learnMore': 'ଅଧିକ ଜାଣନ୍ତୁ',
        'common.getStarted': 'ଆରମ୍ଭ କରନ୍ତୁ',
        'common.viewAll': 'ସମସ୍ତ ଦେଖନ୍ତୁ',
        'common.loading': 'ଲୋଡ୍ ହେଉଛି...',
        'common.search': 'ଖୋଜନ୍ତୁ',
        'common.filter': 'ଫିଲ୍ଟର୍',
        'common.close': 'ବନ୍ଦ କରନ୍ତୁ',

        // Hero Section
        'hero.title': 'ନବସୃଜନ ମାଧ୍ୟମରେ ଶିକ୍ଷାକୁ ସଶକ୍ତ କରିବା',
        'hero.subtitle': 'ସମଗ୍ର ଭାରତର ଛାତ୍ରମାନଙ୍କ ପାଇଁ ଗୁଣବତ୍ତା ଶିକ୍ଷା ସମ୍ବଳ',

        // Footer
        'footer.company': 'କମ୍ପାନୀ',
        'footer.resources': 'ସମ୍ବଳ',
        'footer.legal': 'ଆଇନଗତ',
        'footer.contact': 'ଯୋଗାଯୋଗ କରନ୍ତୁ',
        'footer.email': 'ଇମେଲ୍',
        'footer.phone': 'ଫୋନ୍',
        'footer.rights': 'ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('language') as Language;
        return saved || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language === 'en' ? 'en' : 'or'; // ISO code for Odia
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
