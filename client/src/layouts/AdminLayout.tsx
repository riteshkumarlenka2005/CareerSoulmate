import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const adminNavItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { path: '/admin/users', label: 'Users', icon: '👥' },
  { path: '/admin/assessments', label: 'Assessments', icon: '📝' },
  { path: '/admin/questions', label: 'Questions', icon: '❓' },
  { path: '/admin/careers', label: 'Careers', icon: '💼' },
  { path: '/admin/skills', label: 'Skills', icon: '🎯' },
  { path: '/admin/roadmaps', label: 'Roadmaps', icon: '🗺️' },
  { path: '/admin/faqs', label: 'FAQs', icon: '💬' },
  { path: '/admin/data-pipeline', label: 'Data Pipeline', icon: '⚡' },
  { path: '/admin/notifications', label: 'Notifications', icon: '🔔' },
  { path: '/admin/recommendation-settings', label: 'Rec. Settings', icon: '⚙️' },
  { path: '/admin/reports', label: 'Reports', icon: '📈' },
  { path: '/admin/settings', label: 'Settings', icon: '🔧' },
  { path: '/admin/logs', label: 'Activity Logs', icon: '📋' },
];

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-[#050505] text-white">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white text-lg shadow-xl"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-60 bg-[#0a0a0a] border-r border-white/5
          flex flex-col z-40 transition-transform duration-300 overflow-hidden
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Admin branding */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600/20 flex items-center justify-center text-red-400 font-black text-sm">
              CS
            </div>
            <div>
              <p className="text-white text-sm font-bold">Admin Panel</p>
              <p className="text-red-400 text-[10px] uppercase tracking-wider font-bold">CareerSoulmate</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow overflow-y-auto py-2">
          {adminNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-all
                  ${isActive
                    ? 'text-red-400 bg-red-500/10 border-r-2 border-red-500'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Admin user info + logout */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-red-600/20 flex items-center justify-center text-red-400 text-xs font-bold">
              {user?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{user?.fullName}</p>
              <p className="text-gray-500 text-[10px] truncate">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-1.5 text-[10px] text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-all"
            >
              View Site
            </button>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="flex-1 py-1.5 text-[10px] text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/10 rounded transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-grow w-full lg:w-auto min-w-0 p-4 sm:p-6 lg:p-8 overflow-x-hidden pt-16 lg:pt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
