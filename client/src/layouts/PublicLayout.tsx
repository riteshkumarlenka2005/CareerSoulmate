import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (page: string) => {
    const routeMap: Record<string, string> = {
      home: '/', about: '/about', explorer: '/explorer', comparison: '/comparison',
      tree: '/tree', roadmap: '/roadmap', 'ai-recs': '/ai-recs', 'why-this': '/why-this',
      aptitude: '/aptitude', interest: '/interest', personality: '/personality',
      'skills-assessment': '/skills-assessment', profile: '/profile', explore: '/explore',
      'learning-paths': '/learning-paths', opportunities: '/opportunities',
      dashboard: '/dashboard',
    };
    navigate(routeMap[page] || `/${page}`);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-500/30 bg-[#050505]">
      <Header role="guest" onNavigate={handleNavigate} />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
