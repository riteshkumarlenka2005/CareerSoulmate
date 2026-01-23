import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Supported languages
export type Language = 'en' | 'hi';

export interface LanguageOption {
    code: Language;
    name: string;
    nativeName: string;
    flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

// Translation keys type
type TranslationKey = keyof typeof translations.en;

// Translations
const translations = {
    en: {
        // Header & Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.discoverCareers': 'Discover Careers',
        'nav.coursesAndDegrees': 'Courses & Degrees',
        'nav.examsAndOutcomes': 'Exams & Outcomes',
        'nav.skillsAndVocational': 'Skills & Vocational',
        'nav.resources': 'Resources',
        'nav.login': 'Login',
        'nav.signup': 'Sign Up',
        'nav.getStarted': 'Get Started',

        // Hero Section
        'hero.title': 'Find Your Career Soulmate',
        'hero.subtitle': 'AI-powered career guidance for students and professionals',
        'hero.cta': 'Start Your Journey',
        'hero.exploreCareers': 'Explore Careers',

        // Assessments
        'assessment.aptitude': 'Aptitude Assessment',
        'assessment.interest': 'Interest Assessment',
        'assessment.personality': 'Personality Assessment',
        'assessment.skills': 'Skills Assessment',
        'assessment.start': 'Start Assessment',
        'assessment.continue': 'Continue',
        'assessment.complete': 'Complete',
        'assessment.timeRemaining': 'Time Remaining',
        'assessment.question': 'Question',
        'assessment.of': 'of',

        // Colleges
        'colleges.title': 'Find Your Perfect College',
        'colleges.subtitle': 'Discover government colleges across India',
        'colleges.nearMe': 'Find Colleges Near Me',
        'colleges.searchPlaceholder': 'Search colleges by name, location...',
        'colleges.filterByState': 'Filter by State',
        'colleges.filterByType': 'Filter by Type',
        'colleges.filterByProgram': 'Filter by Program',
        'colleges.programs': 'Programs',
        'colleges.cutoffs': 'Cut-offs',
        'colleges.facilities': 'Facilities',
        'colleges.scholarships': 'Scholarships',
        'colleges.bookmark': 'Bookmark',
        'colleges.viewDetails': 'View Details',
        'colleges.distance': 'Distance',
        'colleges.km': 'km away',

        // NSQF & Pathways
        'nsqf.title': 'NSQF Levels Guide',
        'nsqf.subtitle': 'National Skills Qualifications Framework',
        'nsqf.level': 'Level',
        'nsqf.requirements': 'Requirements',
        'nsqf.roles': 'Job Roles',

        'pathways.title': 'Skill Pathways',
        'pathways.subtitle': 'NSQF-aligned career progression routes',
        'pathways.viewPathway': 'View Pathway',
        'pathways.duration': 'Duration',
        'pathways.demand': 'Demand',

        // Career Tree
        'careerTree.title': 'Career Tree',
        'careerTree.subtitle': 'Visualize your career progression',
        'careerTree.zoom': 'Zoom',
        'careerTree.reset': 'Reset View',
        'careerTree.download': 'Download Path',

        // Scholarships & Admissions
        'scholarships.title': 'Scholarships',
        'scholarships.subtitle': 'Find financial aid opportunities',
        'scholarships.eligible': 'Eligible',
        'scholarships.partiallyEligible': 'Partially Eligible',
        'scholarships.notEligible': 'Not Eligible',
        'scholarships.deadline': 'Deadline',
        'scholarships.daysLeft': 'days left',

        'admissions.title': 'Admission Deadlines',
        'admissions.subtitle': 'Track important dates',
        'admissions.critical': 'Critical',
        'admissions.upcoming': 'Upcoming',

        // AI Features
        'ai.chatTitle': 'Career Soulmate AI',
        'ai.chatPlaceholder': 'Ask me about careers, skills, or education...',
        'ai.recommendations': 'AI Recommendations',
        'ai.personalizedFor': 'Personalized for you',

        // Common
        'common.loading': 'Loading...',
        'common.error': 'Something went wrong',
        'common.retry': 'Try Again',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.search': 'Search',
        'common.filter': 'Filter',
        'common.sort': 'Sort',
        'common.all': 'All',
        'common.viewAll': 'View All',
        'common.learnMore': 'Learn More',
        'common.seeMore': 'See More',
        'common.back': 'Back',
        'common.next': 'Next',
        'common.previous': 'Previous',
        'common.high': 'High',
        'common.medium': 'Medium',
        'common.low': 'Low',

        // Footer
        'footer.tagline': 'Empowering learners to find their career soulmate',
        'footer.quickLinks': 'Quick Links',
        'footer.resources': 'Resources',
        'footer.contact': 'Contact Us',
        'footer.rights': 'All rights reserved',

        // Auth
        'auth.login': 'Login',
        'auth.signup': 'Sign Up',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.confirmPassword': 'Confirm Password',
        'auth.fullName': 'Full Name',
        'auth.forgotPassword': 'Forgot Password?',
        'auth.noAccount': "Don't have an account?",
        'auth.hasAccount': 'Already have an account?',
        'auth.loginSuccess': 'Login successful!',
        'auth.signupSuccess': 'Account created successfully!',
        'auth.logout': 'Logout',
        'auth.profile': 'My Profile',
    },
    hi: {
        // Header & Navigation
        'nav.home': 'होम',
        'nav.about': 'हमारे बारे में',
        'nav.discoverCareers': 'करियर खोजें',
        'nav.coursesAndDegrees': 'कोर्स और डिग्री',
        'nav.examsAndOutcomes': 'परीक्षा और परिणाम',
        'nav.skillsAndVocational': 'कौशल और व्यावसायिक',
        'nav.resources': 'संसाधन',
        'nav.login': 'लॉगिन',
        'nav.signup': 'साइन अप',
        'nav.getStarted': 'शुरू करें',

        // Hero Section
        'hero.title': 'अपना करियर सोलमेट खोजें',
        'hero.subtitle': 'छात्रों और पेशेवरों के लिए AI-संचालित करियर मार्गदर्शन',
        'hero.cta': 'अपनी यात्रा शुरू करें',
        'hero.exploreCareers': 'करियर देखें',

        // Assessments
        'assessment.aptitude': 'योग्यता मूल्यांकन',
        'assessment.interest': 'रुचि मूल्यांकन',
        'assessment.personality': 'व्यक्तित्व मूल्यांकन',
        'assessment.skills': 'कौशल मूल्यांकन',
        'assessment.start': 'मूल्यांकन शुरू करें',
        'assessment.continue': 'जारी रखें',
        'assessment.complete': 'पूर्ण',
        'assessment.timeRemaining': 'शेष समय',
        'assessment.question': 'प्रश्न',
        'assessment.of': 'में से',

        // Colleges
        'colleges.title': 'अपना सही कॉलेज खोजें',
        'colleges.subtitle': 'भारत भर में सरकारी कॉलेज खोजें',
        'colleges.nearMe': 'मेरे पास कॉलेज खोजें',
        'colleges.searchPlaceholder': 'नाम, स्थान से कॉलेज खोजें...',
        'colleges.filterByState': 'राज्य द्वारा फ़िल्टर',
        'colleges.filterByType': 'प्रकार द्वारा फ़िल्टर',
        'colleges.filterByProgram': 'कार्यक्रम द्वारा फ़िल्टर',
        'colleges.programs': 'कार्यक्रम',
        'colleges.cutoffs': 'कट-ऑफ',
        'colleges.facilities': 'सुविधाएं',
        'colleges.scholarships': 'छात्रवृत्ति',
        'colleges.bookmark': 'बुकमार्क',
        'colleges.viewDetails': 'विवरण देखें',
        'colleges.distance': 'दूरी',
        'colleges.km': 'किमी दूर',

        // NSQF & Pathways
        'nsqf.title': 'NSQF स्तर गाइड',
        'nsqf.subtitle': 'राष्ट्रीय कौशल योग्यता फ्रेमवर्क',
        'nsqf.level': 'स्तर',
        'nsqf.requirements': 'आवश्यकताएं',
        'nsqf.roles': 'नौकरी भूमिकाएं',

        'pathways.title': 'कौशल मार्ग',
        'pathways.subtitle': 'NSQF-संरेखित करियर प्रगति मार्ग',
        'pathways.viewPathway': 'मार्ग देखें',
        'pathways.duration': 'अवधि',
        'pathways.demand': 'मांग',

        // Career Tree
        'careerTree.title': 'करियर ट्री',
        'careerTree.subtitle': 'अपनी करियर प्रगति को देखें',
        'careerTree.zoom': 'ज़ूम',
        'careerTree.reset': 'रीसेट करें',
        'careerTree.download': 'पथ डाउनलोड करें',

        // Scholarships & Admissions
        'scholarships.title': 'छात्रवृत्ति',
        'scholarships.subtitle': 'वित्तीय सहायता के अवसर खोजें',
        'scholarships.eligible': 'पात्र',
        'scholarships.partiallyEligible': 'आंशिक रूप से पात्र',
        'scholarships.notEligible': 'पात्र नहीं',
        'scholarships.deadline': 'अंतिम तिथि',
        'scholarships.daysLeft': 'दिन शेष',

        'admissions.title': 'प्रवेश की अंतिम तिथियां',
        'admissions.subtitle': 'महत्वपूर्ण तिथियां ट्रैक करें',
        'admissions.critical': 'महत्वपूर्ण',
        'admissions.upcoming': 'आगामी',

        // AI Features
        'ai.chatTitle': 'करियर सोलमेट AI',
        'ai.chatPlaceholder': 'करियर, कौशल या शिक्षा के बारे में पूछें...',
        'ai.recommendations': 'AI सिफारिशें',
        'ai.personalizedFor': 'आपके लिए व्यक्तिगत',

        // Common
        'common.loading': 'लोड हो रहा है...',
        'common.error': 'कुछ गलत हो गया',
        'common.retry': 'पुनः प्रयास करें',
        'common.save': 'सहेजें',
        'common.cancel': 'रद्द करें',
        'common.search': 'खोजें',
        'common.filter': 'फ़िल्टर',
        'common.sort': 'क्रमबद्ध करें',
        'common.all': 'सभी',
        'common.viewAll': 'सभी देखें',
        'common.learnMore': 'और जानें',
        'common.seeMore': 'और देखें',
        'common.back': 'वापस',
        'common.next': 'अगला',
        'common.previous': 'पिछला',
        'common.high': 'उच्च',
        'common.medium': 'मध्यम',
        'common.low': 'निम्न',

        // Footer
        'footer.tagline': 'शिक्षार्थियों को उनका करियर सोलमेट खोजने में सशक्त बनाना',
        'footer.quickLinks': 'त्वरित लिंक',
        'footer.resources': 'संसाधन',
        'footer.contact': 'संपर्क करें',
        'footer.rights': 'सर्वाधिकार सुरक्षित',

        // Auth
        'auth.login': 'लॉगिन',
        'auth.signup': 'साइन अप',
        'auth.email': 'ईमेल',
        'auth.password': 'पासवर्ड',
        'auth.confirmPassword': 'पासवर्ड की पुष्टि करें',
        'auth.fullName': 'पूरा नाम',
        'auth.forgotPassword': 'पासवर्ड भूल गए?',
        'auth.noAccount': 'खाता नहीं है?',
        'auth.hasAccount': 'पहले से खाता है?',
        'auth.loginSuccess': 'लॉगिन सफल!',
        'auth.signupSuccess': 'खाता सफलतापूर्वक बनाया गया!',
        'auth.logout': 'लॉगआउट',
        'auth.profile': 'मेरी प्रोफ़ाइल',
    },
};

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    languages: LanguageOption[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
    children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('careersoulmate-language');
        return (saved as Language) || 'en';
    });

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('careersoulmate-language', lang);
        document.documentElement.lang = lang;
    }, []);

    const t = useCallback((key: string): string => {
        const langTranslations = translations[language];
        return (langTranslations as Record<string, string>)[key] || key;
    }, [language]);

    return (
        <I18nContext.Provider value={{ language, setLanguage, t, languages: SUPPORTED_LANGUAGES }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = (): I18nContextType => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

export default I18nContext;
