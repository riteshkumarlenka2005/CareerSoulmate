import React, { useState, useRef, useEffect } from 'react';
import { useI18n, Language, SUPPORTED_LANGUAGES } from '../context/I18nContext';

const LanguageSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, languages } = useI18n();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (langCode: Language) => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all"
                aria-label="Select language"
            >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300 hidden sm:inline">
                    {currentLanguage.code.toUpperCase()}
                </span>
                <svg
                    className={`w-3 h-3 text-gray-200 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 bottom-full mb-2 md:left-auto md:right-0 md:bottom-auto md:top-full md:mt-2 w-56 md:w-48 bg-[#0a0a0a] border border-white/10 rounded-xl py-2 shadow-2xl z-[200] animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-top-2 duration-200 max-h-[60vh] overflow-y-auto">
                    <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                            Select Language
                        </p>
                    </div>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors ${language === lang.code ? 'bg-blue-500/10 border-l-2 border-blue-500' : ''
                                }`}
                        >
                            <span className="text-xl">{lang.flag}</span>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium text-white">{lang.nativeName}</span>
                                <span className="text-xs text-gray-300">{lang.name}</span>
                            </div>
                            {language === lang.code && (
                                <svg className="w-4 h-4 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
