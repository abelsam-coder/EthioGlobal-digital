import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import logo from '../../src/assets/logo.png';

function Header({ logoSrc }) {
  const { isDark, toggleTheme, isTransitioning } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Owners', id: 'founders' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = 'Home';
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 120) current = link.name;
      }
      setActiveLink(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (name, id) => {
    setActiveLink(name);
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = window.innerWidth < 640 ? 56 : 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ease-out ${
        scrolled
          ? 'py-1.5 sm:py-2.5 shadow-lg shadow-black/10'
          : 'py-3 sm:py-4'
      }`}
      style={{
        backgroundColor: scrolled
          ? (isDark ? 'rgba(5, 5, 5, 0.85)' : 'rgba(255, 255, 255, 0.88)')
          : (isDark ? 'rgba(5, 5, 5, 0.4)' : 'rgba(255, 255, 255, 0.4)'),
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(16px) saturate(150%)',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(16px) saturate(150%)',
        borderBottom: scrolled
          ? (isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)')
          : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16 lg:h-[76px]">

        {/* ── Logo ── */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('Home', 'home'); }}
          className="group flex items-center gap-2.5 sm:gap-3 flex-shrink-0"
        >
          <img
            src={logoSrc || logo}
            alt="EthioGlobal Digital"
            className="h-9 sm:h-10 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden lg:flex flex-col leading-none">
            <span className={`font-bold text-base xl:text-lg tracking-tight transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              EthioGlobal Digital
            </span>
            <span className={`text-xs font-semibold uppercase tracking-[0.15em] mt-0.5 transition-colors duration-300 ${
              isDark ? 'text-neutral-500' : 'text-gray-400'
            }`}>
              Digital Agency
            </span>
          </div>
        </a>

        {/* ── Desktop Nav ── */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.name, link.id); }}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeLink === link.name
                    ? isDark
                      ? 'text-white bg-white/[0.08]'
                      : 'text-gray-900 bg-gray-900/[0.06]'
                    : isDark
                      ? 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-900/[0.04]'
                }`}
              >
                {link.name}
                {activeLink === link.name && (
                  <span
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #d946ef)' }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop Right ── */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
              isDark
                ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
            }`}
            aria-label="Toggle theme"
          >
            <span className={`transition-all duration-400 ${isTransitioning ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
              {isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </span>
          </button>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('Contact', 'contact'); }}
            className="group relative px-5 py-2.5 text-sm font-semibold text-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20 hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 skew-x-12" />
            <span className="relative z-10 flex items-center gap-2">
              Get a Quote
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden relative w-11 h-11 flex flex-col items-center justify-center rounded-lg transition-all duration-200 flex-shrink-0 ${
            isOpen
              ? (isDark ? 'bg-white/10' : 'bg-gray-100')
              : (isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100')
          }`}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-[5px] w-5">
            <span className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${isDark ? 'bg-white' : 'bg-gray-900'} ${isOpen ? 'rotate-45 translate-y-[7px] w-6' : ''}`} />
            <span className={`block h-[2px] rounded-full transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-900'} ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${isDark ? 'bg-white' : 'bg-gray-900'} ${isOpen ? '-rotate-45 -translate-y-[7px] w-6' : ''}`} />
          </div>
        </button>
      </div>

      {/* ══════════ MOBILE MENU ══════════ */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className="mx-3 sm:mx-4 mb-3 mt-1 rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: isDark ? 'rgba(10, 10, 18, 0.92)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)',
            boxShadow: isDark
              ? '0 25px 60px -12px rgba(0,0,0,0.5)'
              : '0 25px 60px -12px rgba(0,0,0,0.15)',
          }}
        >
          {/* Menu Header */}
          <div
            className="px-5 py-3.5 flex items-center justify-between"
            style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.06)' }}
          >
            <span className={`text-xs font-bold uppercase tracking-[0.15em] ${
              isDark ? 'text-neutral-500' : 'text-gray-400'
            }`}>
              Navigation
            </span>
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isDark
                  ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                  : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
              }`}
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              {isDark ? 'Light' : 'Dark'}
            </button>
          </div>

          {/* Nav Links */}
          <div className="p-3 space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.name, link.id); }}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all duration-300 ${
                  activeLink === link.name
                    ? isDark
                      ? 'text-white bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/15'
                      : 'text-gray-900 bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200/60'
                    : isDark
                      ? 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
                }}
              >
                <span>{link.name}</span>
                {activeLink === link.name && (
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #d946ef)' }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div
            className="p-4 pt-3"
            style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.06)' }}
          >
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('Contact', 'contact'); }}
              className="group relative flex items-center justify-center gap-2 w-full py-3.5 text-[15px] font-semibold text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #d946ef 100%)',
                transitionDelay: isOpen ? `${navLinks.length * 50}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              Get a Free Quote
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <p className={`text-center text-xs mt-3 ${
              isDark ? 'text-neutral-600' : 'text-gray-400'
            }`}>
              No commitment • Response within 24hrs
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
