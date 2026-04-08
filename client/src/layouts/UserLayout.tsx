import React from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const userNavItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/profile', label: 'Profile', icon: '👤' },
  { path: '/assessment/start', label: 'Assessment', icon: '📝' },
  { path: '/recommendations', label: 'Recommendations', icon: '🎯' },
  { path: '/career-explorer', label: 'Explore Careers', icon: '🔍' },
  { path: '/saved', label: 'Saved', icon: '❤️' },
  { path: '/chatbot', label: 'AI Chatbot', icon: '🤖' },
  { path: '/notifications', label: 'Notifications', icon: '🔔' },
  { path: '/report', label: 'Career Report', icon: '📄' },
];

const UserLayout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleNavigate = (page: string) => {
    const routeMap: Record<string, string> = {
      home: '/', about: '/about', explorer: '/career-explorer', comparison: '/comparison',
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
      <Header role="user" onNavigate={handleNavigate} />

      <div className="flex flex-grow pt-20">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-600/30 text-white text-xl"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-[#0a0a0a] border-r border-white/5
            flex flex-col z-40 transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* User info */}
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              {user?.avatar ? (
                <img src={user.avatar} alt="" className="w-10 h-10 rounded-lg object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold">
                  {user?.fullName?.charAt(0) || '?'}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold truncate">{user?.fullName || 'User'}</p>
                <p className="text-gray-500 text-xs truncate">{user?.email}</p>
              </div>
            </div>
            {user?.points !== undefined && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-yellow-400 text-xs">⭐ {user.points} pts</span>
                {user.badges && user.badges.length > 0 && (
                  <span className="text-gray-500 text-xs">• {user.badges.length} badges</span>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-grow overflow-y-auto py-3">
            {userNavItems.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-5 py-3 text-sm transition-all
                    ${isActive
                      ? 'text-blue-400 bg-blue-500/10 border-r-2 border-blue-500'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Settings link */}
          <div className="p-3 border-t border-white/5">
            <Link
              to="/skill-gap"
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-500 hover:text-white transition-all rounded-lg hover:bg-white/5"
            >
              <span>📊</span>
              <span>Skill Gap Analysis</span>
            </Link>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-grow w-full lg:w-auto min-w-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
