
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
import CollegeMappingPage from './features/CollegeMappingPage';
import CollegeAddOnsPage from './features/CollegeAddOnsPage';
import CollegeGapsPage from './features/CollegeGapsPage';
import CollegeReadinessPage from './features/CollegeReadinessPage';
import CollegeInternshipsPage from './features/CollegeInternshipsPage';
import CollegeProgramsPage from './features/CollegeProgramsPage';
import CollegeTransfersPage from './features/CollegeTransfersPage';
import CollegeNepFlexibilityPage from './features/CollegeNepFlexibilityPage';
import CollegeAssessmentsPage from './features/CollegeAssessmentsPage';
import CollegeExamsPage from './features/CollegeExamsPage';
import CollegeJobsPage from './features/CollegeJobsPage';
import CollegeFellowshipsPage from './features/CollegeFellowshipsPage';
import CounselorStudentListPage from './features/CounselorStudentListPage';
import CounselorProfilesPage from './features/CounselorProfilesPage';
import CounselorProgressPage from './features/CounselorProgressPage';
import CounselorSkillGapsPage from './features/CounselorSkillGapsPage';
import CounselorRiskFlagsPage from './features/CounselorRiskFlagsPage';
import CounselorRecommendationsPage from './features/CounselorRecommendationsPage';
import CounselorProgressReportPage from './features/CounselorProgressReportPage';
import CounselorExportPage from './features/CounselorExportPage';
import AdminDashboardPage from './features/AdminDashboardPage';
import AdminTimetableGeneratePage from './features/AdminTimetableGeneratePage';
import AdminTimetableScenariosPage from './features/AdminTimetableScenariosPage';
import AdminTimetableConflictsPage from './features/AdminTimetableConflictsPage';
import AdminAcademicsCoursesPage from './features/AdminAcademicsCoursesPage';
import AdminAcademicsCreditsPage from './features/AdminAcademicsCreditsPage';
import AdminAcademicsElectivesPage from './features/AdminAcademicsElectivesPage';
import AdminAcademicsFacultyPage from './features/AdminAcademicsFacultyPage';
import AdminInfraRoomsPage from './features/AdminInfraRoomsPage';
import AdminInfraLabsPage from './features/AdminInfraLabsPage';
import AdminInfraCapacityPage from './features/AdminInfraCapacityPage';
import AdminReportsPage from './features/AdminReportsPage';
import AdminUsersRolesPage from './features/AdminUsersRolesPage';
import AdminInstitutionsPage from './features/AdminInstitutionsPage';
import GovAnalyticsEnrollmentPage from './features/GovAnalyticsEnrollmentPage';
import GovAnalyticsRegionalPage from './features/GovAnalyticsRegionalPage';
import GovSkillsDemandSupplyPage from './features/GovSkillsDemandSupplyPage';
import GovSkillsNsqfAdoptionPage from './features/GovSkillsNsqfAdoptionPage';
import GovInstPerformancePage from './features/GovInstPerformancePage';
import GovInstCapacityPage from './features/GovInstCapacityPage';
import GovReportsPage from './features/GovReportsPage';
import NepPathwaysPage from './features/NepPathwaysPage';
import CollegesPage from './features/CollegesPage';
import ScholarshipsPage from './features/ScholarshipsPage';
import AdmissionsPage from './features/AdmissionsPage';
import PathwaysPage from './features/PathwaysPage';
import NSQFPage from './features/NSQFPage';
import ApprenticeshipsPage from './features/ApprenticeshipsPage';
import RoadmapPage from './features/RoadmapPage';
import AIRecsPage from './features/AIRecsPage';
import WhyThisPage from './features/WhyThisPage';
import ExploreCareersPage from './features/ExploreCareersPage';
import ExploreDegreesPage from './features/ExploreDegreesPage';
import ExploreSkillsPage from './features/ExploreSkillsPage';
import AptitudePage from './features/AptitudePage';
import InterestPage from './features/InterestPage';
import PersonalityPage from './features/PersonalityPage';
import SkillsAssessmentPage from './features/SkillsAssessmentPage';
import CertsPage from './features/CertsPage';
import ExamsPage from './features/ExamsPage';
import CommunityPage from './features/CommunityPage';
import ProfilePage from './features/ProfilePage';

type Page = 'home' | 'about' | 'explorer' | 'comparison' | 'tree' | 'mapping' | 'add-ons' | 'gaps' | 'readiness' | 'internships' | 'programs' | 'transfers' | 'nep-flexibility' | 'assessments' | 'college-exams' | 'college-jobs' | 'college-fellowships' | 'student-list' | 'counselor-profiles' | 'counselor-progress' | 'counselor-skill-gaps' | 'risk-flags' | 'counselor-recs' | 'counselor-report' | 'counselor-export' | 'admin-dashboard' | 'admin-timetable-generate' | 'admin-timetable-scenarios' | 'admin-timetable-conflicts' | 'admin-academics-courses' | 'admin-academics-credits' | 'admin-academics-electives' | 'admin-academics-faculty' | 'admin-infra-rooms' | 'admin-infra-labs' | 'admin-infra-capacity' | 'admin-reports' | 'super-admin-users-roles' | 'super-admin-institutions' | 'gov-analytics-enrollment' | 'gov-analytics-regional' | 'gov-skills-demand-supply' | 'gov-skills-nsqf-adoption' | 'gov-inst-performance' | 'gov-inst-capacity' | 'gov-reports' | 'nep' | 'colleges' | 'scholarships' | 'admissions' | 'pathways' | 'nsqf' | 'apprenticeships' | 'roadmap' | 'ai-recs' | 'why-this' | 'explore-careers' | 'explore-degrees' | 'explore-skills' | 'aptitude' | 'interest' | 'personality' | 'skills-assessment' | 'certs' | 'exams' | 'community' | 'profile';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('public');
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
      case 'mapping':
        return <CollegeMappingPage onNavigate={handleNavigate} />;
      case 'add-ons':
        return <CollegeAddOnsPage onNavigate={handleNavigate} />;
      case 'gaps':
        return <CollegeGapsPage onNavigate={handleNavigate} />;
      case 'readiness':
        return <CollegeReadinessPage onNavigate={handleNavigate} />;
      case 'internships':
        return <CollegeInternshipsPage onNavigate={handleNavigate} />;
      case 'programs':
        return <CollegeProgramsPage onNavigate={handleNavigate} />;
      case 'transfers':
        return <CollegeTransfersPage onNavigate={handleNavigate} />;
      case 'nep-flexibility':
        return <CollegeNepFlexibilityPage onNavigate={handleNavigate} />;
      case 'assessments':
        return <CollegeAssessmentsPage onNavigate={handleNavigate} />;
      case 'college-exams':
        return <CollegeExamsPage onNavigate={handleNavigate} />;
      case 'college-jobs':
        return <CollegeJobsPage onNavigate={handleNavigate} />;
      case 'college-fellowships':
        return <CollegeFellowshipsPage onNavigate={handleNavigate} />;
      case 'student-list':
        return <CounselorStudentListPage onNavigate={handleNavigate} />;
      case 'counselor-profiles':
        return <CounselorProfilesPage onNavigate={handleNavigate} />;
      case 'counselor-progress':
        return <CounselorProgressPage onNavigate={handleNavigate} />;
      case 'counselor-skill-gaps':
        return <CounselorSkillGapsPage onNavigate={handleNavigate} />;
      case 'risk-flags':
        return <CounselorRiskFlagsPage onNavigate={handleNavigate} />;
      case 'counselor-recs':
        return <CounselorRecommendationsPage onNavigate={handleNavigate} />;
      case 'counselor-report':
        return <CounselorProgressReportPage onNavigate={handleNavigate} />;
      case 'counselor-export':
        return <CounselorExportPage onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboardPage onNavigate={handleNavigate} />;
      case 'admin-timetable-generate':
        return <AdminTimetableGeneratePage onNavigate={handleNavigate} />;
      case 'admin-timetable-scenarios':
        return <AdminTimetableScenariosPage onNavigate={handleNavigate} />;
      case 'admin-timetable-conflicts':
        return <AdminTimetableConflictsPage onNavigate={handleNavigate} />;
      case 'admin-academics-courses':
        return <AdminAcademicsCoursesPage onNavigate={handleNavigate} />;
      case 'admin-academics-credits':
        return <AdminAcademicsCreditsPage onNavigate={handleNavigate} />;
      case 'admin-academics-electives':
        return <AdminAcademicsElectivesPage onNavigate={handleNavigate} />;
      case 'admin-academics-faculty':
        return <AdminAcademicsFacultyPage onNavigate={handleNavigate} />;
      case 'admin-infra-rooms':
        return <AdminInfraRoomsPage onNavigate={handleNavigate} />;
      case 'admin-infra-labs':
        return <AdminInfraLabsPage onNavigate={handleNavigate} />;
      case 'admin-infra-capacity':
        return <AdminInfraCapacityPage onNavigate={handleNavigate} />;
      case 'admin-reports':
        return <AdminReportsPage onNavigate={handleNavigate} />;
      case 'super-admin-users-roles':
        return <AdminUsersRolesPage onNavigate={handleNavigate} />;
      case 'super-admin-institutions':
        return <AdminInstitutionsPage onNavigate={handleNavigate} />;
      case 'gov-analytics-enrollment':
        return <GovAnalyticsEnrollmentPage onNavigate={handleNavigate} />;
      case 'gov-analytics-regional':
        return <GovAnalyticsRegionalPage onNavigate={handleNavigate} />;
      case 'gov-skills-demand-supply':
        return <GovSkillsDemandSupplyPage onNavigate={handleNavigate} />;
      case 'gov-skills-nsqf-adoption':
        return <GovSkillsNsqfAdoptionPage onNavigate={handleNavigate} />;
      case 'gov-inst-performance':
        return <GovInstPerformancePage onNavigate={handleNavigate} />;
      case 'gov-inst-capacity':
        return <GovInstCapacityPage onNavigate={handleNavigate} />;
      case 'gov-reports':
        return <GovReportsPage onNavigate={handleNavigate} />;
      case 'nep':
        return <NepPathwaysPage onNavigate={handleNavigate} />;
      case 'colleges':
        return <CollegesPage onNavigate={handleNavigate} />;
      case 'scholarships':
        return <ScholarshipsPage onNavigate={handleNavigate} />;
      case 'admissions':
        return <AdmissionsPage onNavigate={handleNavigate} />;
      case 'pathways':
        return <PathwaysPage onNavigate={handleNavigate} />;
      case 'nsqf':
        return <NSQFPage onNavigate={handleNavigate} />;
      case 'apprenticeships':
        return <ApprenticeshipsPage onNavigate={handleNavigate} />;
      case 'roadmap':
        return <RoadmapPage onNavigate={handleNavigate} />;
      case 'ai-recs':
        return <AIRecsPage onNavigate={handleNavigate} />;
      case 'why-this':
        return <WhyThisPage onNavigate={handleNavigate} />;
      case 'explore-careers':
        return <ExploreCareersPage onNavigate={handleNavigate} />;
      case 'explore-degrees':
        return <ExploreDegreesPage onNavigate={handleNavigate} />;
      case 'explore-skills':
        return <ExploreSkillsPage onNavigate={handleNavigate} />;
      case 'aptitude':
        return <AptitudePage onNavigate={handleNavigate} />;
      case 'interest':
        return <InterestPage onNavigate={handleNavigate} />;
      case 'personality':
        return <PersonalityPage onNavigate={handleNavigate} />;
      case 'skills-assessment':
        return <SkillsAssessmentPage onNavigate={handleNavigate} />;
      case 'certs':
        return <CertsPage onNavigate={handleNavigate} />;
      case 'exams':
        return <ExamsPage onNavigate={handleNavigate} />;
      case 'community':
        return <CommunityPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
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

  const footerVisiblePages: Page[] = ['home', 'about', 'explorer', 'mapping', 'add-ons', 'gaps', 'readiness', 'internships', 'programs', 'transfers', 'nep-flexibility', 'assessments', 'college-exams', 'college-jobs', 'college-fellowships', 'student-list', 'counselor-profiles', 'counselor-progress', 'counselor-skill-gaps', 'risk-flags', 'counselor-recs', 'counselor-report', 'counselor-export', 'admin-dashboard', 'admin-timetable-generate', 'admin-timetable-scenarios', 'admin-timetable-conflicts', 'admin-academics-courses', 'admin-academics-credits', 'admin-academics-electives', 'admin-academics-faculty', 'admin-infra-rooms', 'admin-infra-labs', 'admin-infra-capacity', 'admin-reports', 'super-admin-users-roles', 'super-admin-institutions', 'gov-analytics-enrollment', 'gov-analytics-regional', 'gov-skills-demand-supply', 'gov-skills-nsqf-adoption', 'gov-inst-performance', 'gov-inst-capacity', 'gov-reports', 'nep', 'colleges', 'scholarships', 'admissions', 'pathways', 'nsqf', 'apprenticeships', 'roadmap', 'ai-recs', 'why-this', 'explore-careers', 'explore-degrees', 'explore-skills', 'aptitude', 'interest', 'personality', 'skills-assessment', 'certs', 'exams'];

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
