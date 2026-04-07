import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Route guards
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

// Public / feature pages
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

// New assessment flow pages
import AssessmentStartPage from './features/AssessmentStartPage';
import AssessmentFlowPage from './features/AssessmentFlowPage';

// New pages
import DashboardPage from './features/DashboardPage';
import SavedItemsPage from './features/SavedItemsPage';
import NotificationsPage from './features/NotificationsPage';
import ReportPage from './features/ReportPage';
import ChatbotPage from './features/ChatbotPage';
import SkillGapPage from './features/SkillGapPage';

// Admin pages
import AdminDashboard from './features/admin/AdminDashboard';
import AdminUsersPage from './features/admin/UsersPage';
import AdminAssessmentsPage from './features/admin/AssessmentsPage';
import AdminQuestionsPage from './features/admin/QuestionsPage';
import AdminCareersPage from './features/admin/CareersPage';
import AdminSkillsPage from './features/admin/SkillsPage';
import AdminRoadmapsPage from './features/admin/RoadmapsPage';
import AdminFAQsPage from './features/admin/FAQsPage';
import AdminNotificationsPage from './features/admin/NotificationsPage';
import AdminReportsPage from './features/admin/ReportsPage';
import AdminRecSettingsPage from './features/admin/RecSettingsPage';
import AdminSettingsPage from './features/admin/SettingsPage';
import AdminLogsPage from './features/admin/LogsPage';
import DataPipelinePage from './features/admin/DataPipelinePage';

// Landing page components
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

// Error Boundary
import ErrorBoundary from './components/ErrorBoundary';

/* ─── Home page wrapper component ─── */
const HomePage: React.FC = () => {
  return (
    <>
      <Hero role="guest" setRole={() => {}} />
      <ProblemSection />
      <IntelligenceLoop />
      <div className="cursor-pointer">
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
};

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <ErrorBoundary>
        <Routes>
          {/* ─── Public pages (with header + footer) ─── */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/explorer" element={<CareerExplorer />} />
            <Route path="/comparison" element={<CareerComparison />} />
            <Route path="/tree" element={<CareerTreePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/learning-paths" element={<LearningPathsPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/aptitude" element={<AptitudePage />} />
            <Route path="/interest" element={<InterestPage />} />
            <Route path="/personality" element={<PersonalityPage />} />
            <Route path="/skills-assessment" element={<SkillsAssessmentPage />} />
          </Route>

          {/* ─── Protected user pages (with sidebar layout) ─── */}
          <Route element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/assessment/start" element={<AssessmentStartPage />} />
            <Route path="/assessment/:id" element={<AssessmentFlowPage />} />
            <Route path="/recommendations" element={<AIRecsPage />} />
            <Route path="/career-explorer" element={<CareerExplorer />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/roadmap/:careerId" element={<RoadmapPage />} />
            <Route path="/why-this" element={<WhyThisPage />} />
            <Route path="/ai-recs" element={<AIRecsPage />} />
            <Route path="/saved" element={<SavedItemsPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/skill-gap" element={<SkillGapPage />} />
          </Route>

          {/* ─── Admin pages ─── */}
          <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/assessments" element={<AdminAssessmentsPage />} />
            <Route path="/admin/questions" element={<AdminQuestionsPage />} />
            <Route path="/admin/careers" element={<AdminCareersPage />} />
            <Route path="/admin/skills" element={<AdminSkillsPage />} />
            <Route path="/admin/roadmaps" element={<AdminRoadmapsPage />} />
            <Route path="/admin/faqs" element={<AdminFAQsPage />} />
            <Route path="/admin/data-pipeline" element={<DataPipelinePage />} />
            <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
            <Route path="/admin/reports" element={<AdminReportsPage />} />
            <Route path="/admin/recommendation-settings" element={<AdminRecSettingsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/logs" element={<AdminLogsPage />} />
          </Route>

          {/* ─── Fallback ─── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </NotificationProvider>
  );
};

export default App;
