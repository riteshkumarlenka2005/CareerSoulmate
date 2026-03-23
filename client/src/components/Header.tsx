import React, { useState, useEffect, useMemo, useRef } from 'react';
import LanguageSelector from './LanguageSelector';
import AuthModal from './AuthModal';
import UserProgress from './UserProgress';
import NotificationCenter from './NotificationCenter';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';

export type UserRole = 'guest' | 'user';

interface MegaMenuChild {
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuChild[];
}

interface NavItem {
  label: string;
  children?: { label: string; action?: () => void }[];
  megaMenu?: MegaMenuSection[];
  action?: () => void;
}

interface HeaderProps {
  role?: UserRole;
  onNavigate?: (page: any) => void;
}

const Header: React.FC<HeaderProps> = ({ role = 'guest', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useI18n();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Icons = {
    AI: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    Career: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    Academic: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    Tools: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 11-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    Reports: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 2v-6m-8 13h10a2 2 0 002-2V9a2 2 0 00-2-2h-3l-1-1H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  };

  const getNavItems = (currentRole: UserRole): NavItem[] => {
    const aboutItem: NavItem = { label: 'About', action: () => onNavigate?.('about') };

    if (currentRole === 'user') {
      return [
        {
          label: 'My Career',
          children: [
            { label: 'Roadmap', action: () => onNavigate?.('roadmap') },
            { label: 'AI Recs', action: () => onNavigate?.('ai-recs') },
            { label: 'Why This?', action: () => onNavigate?.('why-this') }
          ]
        },
        {
          label: 'Explore',
          children: [
            { label: 'Careers · Degrees · Skills', action: () => onNavigate?.('explore') },
            { label: 'Learning Paths', action: () => onNavigate?.('learning-paths') },
            { label: 'Opportunities', action: () => onNavigate?.('opportunities') }
          ]
        },
        {
          label: 'Assessments',
          children: [
            { label: 'Aptitude', action: () => onNavigate?.('aptitude') },
            { label: 'Interest', action: () => onNavigate?.('interest') },
            { label: 'Personality', action: () => onNavigate?.('personality') },
            { label: 'Skills', action: () => onNavigate?.('skills-assessment') }
          ]
        },
        {
          label: 'Career Tools',
          children: [
            { label: 'Career Explorer', action: () => onNavigate?.('explorer') },
            { label: 'Career Tree', action: () => onNavigate?.('tree') },
            { label: 'Compare Careers', action: () => onNavigate?.('comparison') }
          ]
        },
        aboutItem
      ];
    }

    // guest (public) navigation
    return [
      {
        label: 'Discover Careers',
        megaMenu: [
          {
            title: 'Career Discovery Tools',
            items: [
              { label: 'Explorer', description: 'Guided discovery through filters.', icon: Icons.Tools, action: () => onNavigate?.('explorer') },
              { label: 'Career Tree', description: 'Visualize progression paths.', icon: Icons.Career, action: () => onNavigate?.('tree') },
              { label: 'Comparison', description: 'Evaluate salary and growth.', icon: Icons.Reports, action: () => onNavigate?.('comparison') },
            ],
          },
        ],
      },
      {
        label: 'Explore All',
        megaMenu: [
          {
            title: 'Discovery Hub',
            items: [
              { label: 'Careers · Degrees · Skills', description: 'All-in-one exploration.', icon: Icons.Academic, action: () => onNavigate?.('explore') },
              { label: 'Learning Paths', description: 'Skill pathways, NEP & NSQF.', icon: Icons.Tools, action: () => onNavigate?.('learning-paths') },
              { label: 'Opportunities', description: 'Scholarships, exams & more.', icon: Icons.Career, action: () => onNavigate?.('opportunities') },
            ],
          },
        ],
      },
      {
        label: 'Assessments',
        megaMenu: [
          {
            title: 'Know Yourself',
            items: [
              { label: 'Aptitude Test', description: 'Measure your analytical skills.', icon: Icons.AI, action: () => onNavigate?.('aptitude') },
              { label: 'Interest Finder', description: 'Discover your passions.', icon: Icons.Career, action: () => onNavigate?.('interest') },
              { label: 'Personality Type', description: 'Uncover work style fit.', icon: Icons.Tools, action: () => onNavigate?.('personality') },
              { label: 'Skills Assessment', description: 'Evaluate your toolkit.', icon: Icons.Reports, action: () => onNavigate?.('skills-assessment') },
            ],
          },
        ],
      },
      aboutItem,
    ];
  };

  const navItems = useMemo(() => getNavItems(role as UserRole), [role, onNavigate]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-black/95 border-b border-white/10 shadow-2xl' : 'bg-black'
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <div
          onClick={() => onNavigate?.('home')}
          className="flex items-center gap-4 cursor-pointer group shrink-0"
        >
          <div className="relative w-11 h-11 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617] to-[#1e293b] rounded-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
            <div className="absolute inset-0 bg-blue-500/5 blur-md"></div>

            <svg
              viewBox="0 0 24 24"
              className="relative z-10 w-6 h-6 text-cyan-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21v-7" />
              <path d="M12 14c0-2.5 3-4 6-6" />
              <path d="M12 14c0-2.5-3-4-6-6" />
              <path d="M12 14v7" />
              <circle cx="18" cy="8" r="1" fill="currentColor" />
              <circle cx="6" cy="8" r="1" fill="currentColor" />
              <circle cx="12" cy="7" r="1" fill="currentColor" />
              <circle cx="12" cy="14" r="1" fill="currentColor" />
            </svg>
          </div>

          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-bold tracking-tight text-[#f8fafc]">
              CareerSoulmate
            </span>
            <span className="text-xs tracking-[0.2em] text-[#94a3b8] uppercase">
              Mapping Destiny
            </span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden xl:flex items-center gap-8">
          {navItems.map((item, idx) => {
            const hasDropdown = Boolean(item.children || item.megaMenu);

            return (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => !hasDropdown && item.action?.()}
                  className={`flex items-center gap-1.5 text-sm font-bold tracking-widest uppercase py-4 transition-colors ${activeDropdown === item.label ? 'text-white' : 'text-[#9ca3af] hover:text-white'}`}
                >
                  {item.label}
                  {hasDropdown && (
                    <svg className={`w-3 h-3 opacity-60 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Standard Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 w-56 bg-[#0a0a0a] border border-white/10 rounded-xl py-2 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {item.children.map((child, i) => (
                      <button
                        key={i}
                        onClick={child.action}
                        className="block w-full text-left px-6 py-3 text-xs font-bold text-[#9ca3af] hover:text-white hover:bg-white/5 uppercase tracking-widest transition-all"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Mega Menu */}
                {item.megaMenu && activeDropdown === item.label && (
                  <div className="absolute top-full w-[680px] bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] animate-in fade-in slide-in-from-top-2 duration-200 border-white/10 left-0">
                    <div className={`grid ${item.megaMenu.length > 1 ? 'grid-cols-2 gap-x-12' : 'grid-cols-1'} gap-y-10`}>
                      {item.megaMenu.map((section, sIdx) => (
                        <div key={sIdx} className="space-y-6">
                          <h4 className="text-sm font-black tracking-[0.2em] text-[#4285f4] uppercase px-2 border-l-2 border-[#4285f4]/30">
                            {section.title}
                          </h4>
                          <div className="space-y-2">
                            {section.items.map((subItem, iIdx) => (
                              <button
                                key={iIdx}
                                onClick={subItem.action}
                                className="w-full flex items-start gap-5 p-4 rounded-2xl hover:bg-white/[0.03] transition-all group"
                              >
                                <div className="mt-1 p-3 rounded-xl bg-white/[0.04] text-[#4285f4] group-hover:bg-[#4285f4]/10 group-hover:text-cyan-400 transition-all shadow-sm">
                                  {subItem.icon}
                                </div>
                                <div className="flex flex-col items-start text-left">
                                  <span className="text-sm font-extrabold text-[#f8fafc] group-hover:text-white tracking-wide uppercase mb-1">
                                    {subItem.label}
                                  </span>
                                  <span className="text-sm text-[#94a3b8] font-medium leading-relaxed group-hover:text-[#cbd5e1]">
                                    {subItem.description}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-5 ml-6">
            <LanguageSelector />
            <NotificationCenter />
          </div>

          {isAuthenticated && user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-xs font-semibold text-white">{user.fullName.split(' ')[0]}</span>
                  <span className="text-xs text-gray-300">{user.points || 0} pts</span>
                </div>
                <svg className={`w-3 h-3 text-gray-200 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-xl py-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-semibold text-white">{user.fullName}</p>
                    <p className="text-xs text-gray-300">{user.email}</p>
                  </div>
                  <div className="px-4 py-3 border-b border-white/10">
                    <UserProgress compact />
                  </div>
                  <button
                    onClick={() => { onNavigate?.('profile'); setShowUserMenu(false); }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {t('auth.profile')}
                  </button>
                  <button
                    onClick={() => { logout(); setShowUserMenu(false); }}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {t('auth.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
                className="text-sm font-bold tracking-[0.15em] text-[#9ca3af] hover:text-white uppercase transition-colors px-2"
              >
                {t('nav.login')}
              </button>
              <button
                onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                className="text-sm font-bold tracking-[0.15em] px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white uppercase transition-all rounded-lg shadow-lg shadow-blue-500/25 whitespace-nowrap"
              >
                {t('nav.signup')}
              </button>
            </div>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="xl:hidden text-[#9ca3af] hover:text-white"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-20 bg-black p-6 overflow-y-auto z-[90] animate-in slide-in-from-bottom-2">
          {navItems.map((item, idx) => (
            <div key={idx} className="mb-8">
              <div className="text-xs font-black tracking-[0.2em] text-blue-500 uppercase mb-4 px-2 border-l-2 border-blue-500/50">
                {item.label}
              </div>

              {item.children && (
                <div className="grid grid-cols-1 gap-2">
                  {item.children.map((child, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        child.action?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-3 px-2 text-sm font-bold text-gray-200 hover:text-white uppercase tracking-wider"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}

              {item.megaMenu && (
                <div className="space-y-6">
                  {item.megaMenu.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      {section.items.map((subItem, iIdx) => (
                        <button
                          key={iIdx}
                          onClick={() => {
                            subItem.action();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-4 p-3 rounded-lg bg-white/5"
                        >
                          <div className="text-blue-400 shrink-0">
                            {subItem.icon}
                          </div>
                          <div className="flex flex-col text-left">
                            <span className="text-xs font-bold text-gray-300 uppercase">
                              {subItem.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {!item.children && !item.megaMenu && (
                <button
                  onClick={() => {
                    item.action?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-3 px-2 text-sm font-bold text-gray-200 hover:text-white uppercase tracking-wider"
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}

          <div className="pt-4 md:pt-6 border-t border-white/10 flex flex-col gap-4">
            <button className="w-full py-4 text-sm font-bold text-center text-white uppercase tracking-widest bg-blue-600 rounded-xl">
              Get Started
            </button>
            <button className="w-full py-4 text-sm font-bold text-center text-gray-200 uppercase tracking-widest">
              Login to Account
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </header>
  );
};

export default Header;
