
import React, { useState } from 'react';
import Header, { UserRole } from './components/Header';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import IntelligenceLoop from './components/IntelligenceLoop';
import CareerTree from './components/CareerTree';
import MappingSection from './components/MappingSection';
import CollegeMap from './components/CollegeMap';
import VocationalNavigator from './components/VocationalNavigator';
import Segmentation from './components/Segmentation';
import Governance from './components/Governance';
import CareerAdvisor from './components/CareerAdvisor';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import { NotificationProvider } from './context/NotificationContext';
import AboutPage from './features/AboutPage';
import CareerExplorer from './features/CareerExplorer';
import CareerComparison from './features/CareerComparison';
import CareerTreePage from './features/CareerTreePage';
import RoadmapPage from './features/RoadmapPage';
import AIRecsPage from './features/AIRecsPage';
import WhyThisPage from './features/WhyThisPage';
import AptitudePage from './features/AptitudePage';
import InterestPage from './features/InterestPage';
import PersonalityPage from './features/PersonalityPage';
import SkillsAssessmentPage from './features/SkillsAssessmentPage';
import ProfilePage from './features/ProfilePage';
import ExplorePage from './features/ExplorePage';
import LearningPathsPage from './features/LearningPathsPage';
import OpportunitiesPage from './features/OpportunitiesPage';

type Page = 'home' | 'about' | 'explorer' | 'comparison' | 'tree' | 'roadmap' | 'ai-recs' | 'why-this' | 'aptitude' | 'interest' | 'personality' | 'skills-assessment' | 'profile' | 'explore' | 'learning-paths' | 'opportunities';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('guest');
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'explorer':
        return <CareerExplorer onNavigate={handleNavigate} />;
      case 'comparison':
        return <CareerComparison onNavigate={handleNavigate} />;
      case 'tree':
        return <CareerTreePage onNavigate={handleNavigate} />;
      case 'roadmap':
        return <RoadmapPage onNavigate={handleNavigate} />;
      case 'ai-recs':
        return <AIRecsPage onNavigate={handleNavigate} />;
      case 'why-this':
        return <WhyThisPage onNavigate={handleNavigate} />;
      case 'aptitude':
        return <AptitudePage onNavigate={handleNavigate} />;
      case 'interest':
        return <InterestPage onNavigate={handleNavigate} />;
      case 'personality':
        return <PersonalityPage onNavigate={handleNavigate} />;
      case 'skills-assessment':
        return <SkillsAssessmentPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'explore':
        return <ExplorePage onNavigate={handleNavigate} />;
      case 'learning-paths':
        return <LearningPathsPage onNavigate={handleNavigate} />;
      case 'opportunities':
        return <OpportunitiesPage onNavigate={handleNavigate} />;
      default:
        return (
          <>
            <Hero role={role} setRole={setRole} />
            <ProblemSection />
            <IntelligenceLoop />
            <div onClick={() => handleNavigate('tree')} className="cursor-pointer">
              <CareerTree />
            </div>
            <MappingSection />
            <CollegeMap />
            <VocationalNavigator />
            <Segmentation />

            <section id="ai-advisor" className="py-24 px-4 bg-[#080808]">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
                    Talk to your <span className="gradient-text">Soulmate AI</span>
                  </h2>
                  <p className="text-blue-500/60 max-w-2xl mx-auto uppercase text-[10px] font-black tracking-[0.4em]">
                    NEP-2020 COMPLIANT • REAL-TIME LABOR DATA • EXPLAINABLE ADVICE
                  </p>
                </div>
                <CareerAdvisor />
              </div>
            </section>

            <Governance />
            <TrustSection />

            <section className="py-32 relative overflow-hidden bg-gradient-to-t from-blue-900/20 to-transparent">
              <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight uppercase">
                  Action Without <br /><span className="text-blue-500">Pressure.</span>
                </h2>
                <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">
                  Start with clarity. Build your future with confidence using the world's most advanced career intelligence engine.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all shadow-2xl shadow-blue-600/40 uppercase tracking-widest text-xs">
                    Start Free Assessment
                  </button>
                  <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black transition-all backdrop-blur-md uppercase tracking-widest text-xs">
                    Talk to a Counselor
                  </button>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  const footerVisiblePages: Page[] = ['home', 'about', 'explorer', 'comparison', 'roadmap', 'ai-recs', 'why-this', 'aptitude', 'interest', 'personality', 'skills-assessment', 'profile', 'explore', 'learning-paths', 'opportunities'];

  return (
    <NotificationProvider>
      <div className="min-h-screen flex flex-col selection:bg-blue-500/30 bg-[#050505]">
        <Header role={role} onNavigate={handleNavigate} />

        <main className="flex-grow pt-20">
          {renderContent()}
        </main>

        {footerVisiblePages.includes(currentPage) && <Footer />}
      </div>
    </NotificationProvider>
  );
};

export default App;
