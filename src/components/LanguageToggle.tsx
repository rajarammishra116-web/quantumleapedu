import { Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en' as const, label: 'English', nativeLabel: 'English' },
        { code: 'od' as const, label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ' },
    ];

    const currentLanguage = languages.find(lang => lang.code === language);

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                whileTap={{ scale: 0.95 }}
                aria-label="Change language"
            >
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">{currentLanguage?.nativeLabel}</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${language === lang.code
                                            ? 'bg-primary/10 text-primary font-medium'
                                            : 'text-slate-700 dark:text-slate-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{lang.nativeLabel}</span>
                                        {language === lang.code && (
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{lang.label}</span>
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
