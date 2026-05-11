import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import logo from '../../src/assets/logo.png';

function Header({ logoSrc }) {
  const { isDark, toggleTheme, isTransitioning } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Owners', id: 'founders' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  // Scroll detection with direction awareness
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      // Active link detection
      let current = 'Home';
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= 120) current = link.name;
      }
      setActiveLink(current);
      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when mobile menu open
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
      const navHeight = window.innerWidth < 640 ? 64 : 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out ${
        scrolled 
          ? `${isDark ? 'bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-white/95 backdrop-blur-xl border-b border-gray-100'} shadow-sm py-2 sm:py-3` 
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16 lg:h-18">
        
        {/* ── Logo ── */}
        <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('Home', 'home'); }}
          className="group flex items-center gap-2.5 sm:gap-3 flex-shrink-0"
        >
          <div className="relative">
            <div className={`absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500 ${isTransitioning ? 'opacity-0' : ''}`} />
            <img src={logoSrc || logo} alt="EthioGlobal Digital Logo"
              className={`relative h-9 w-auto object-contain rounded-lg transition-all duration-500 group-hover:scale-105 ${isTransitioning ? 'opacity-0 scale-95 rotate-12' : 'opacity-100 scale-100 rotate-0'}`}
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className={`font-bold text-base lg:text-lg leading-tight tracking-tight transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              EthioGlobal Digital V2
            </span>
            <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
              isDark ? 'text-neutral-500' : 'text-gray-400'
            }`}>
              Digital Agency
            </span>
          </div>
        </a>

        {/* ── Desktop Navigation ── */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} 
                onClick={(e) => { e.preventDefault(); handleNavClick(link.name, link.id); }}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 ${
                  activeLink === link.name
                    ? `${isDark ? 'text-white bg-white/[0.08]' : 'text-gray-900 bg-gray-100'} shadow-sm`
                    : `${isDark ? 'text-neutral-400 hover:text-white hover:bg-white/[0.04]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
                }`}
              >
                {link.name}
                {/* Active indicator dot */}
                {activeLink === link.name && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right Side Actions ── */}
        <div className="hidden md:flex items-center gap-2.5">
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group ${
              isDark 
                ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 hover:shadow-lg hover:shadow-yellow-500/20' 
                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:shadow-md'
            }`}
            aria-label="Toggle theme"
          >
            <div className={`transition-all duration-500 ease-out ${isTransitioning ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
              {isDark ? (
                <svg className="w-5 h-5 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </div>
            
            {/* Tooltip */}
            <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
              isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-900 text-indigo-400'
            }`}>
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* CTA Button */}
          <a href="#services" 
            onClick={(e) => { e.preventDefault(); handleNavClick('Services', 'services'); }}
            className="group relative px-5 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)' }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
            
            <span className="relative z-10 flex items-center gap-2">
              Get a Quote
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
        </div>

        {/* ── Mobile Hamburger Menu ── */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden relative w-11 h-11 flex flex-col items-center justify-center rounded-xl transition-all duration-300 flex-shrink-0 ${
            isOpen 
              ? (isDark ? 'bg-white/10' : 'bg-gray-100') 
              : (isDark ? 'hover:bg-white/5 active:bg-white/10' : 'hover:bg-gray-100 active:bg-gray-200')
          }`}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-5 relative">
            <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${isDark ? 'bg-white' : 'bg-gray-900'} ${isOpen ? 'rotate-45 translate-y-[5.5px] w-6' : ''}`} />
            <span className={`block h-0.5 rounded-full transition-all duration-300 ${isDark ? 'bg-white' : 'bg-gray-900'} ${isOpen ? 'opacity-0 scale-50' : ''}`} />
            <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${isDark ? 'bg-white' : 'bg-gray-900'} ${isOpen ? '-rotate-45 -translate-y-[5.5px] w-6' : ''}`} />
          </div>
          
          {/* Close/Open label */}
          <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-medium uppercase tracking-wider transition-opacity duration-200 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          } ${isDark ? 'text-neutral-500' : 'text-gray-400'}`}>
            Close
          </span>
        </button>
      </div>

      {/* ══════════ MOBILE MENU ══════════ */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
        isOpen ? 'max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`mx-4 mb-4 mt-2 rounded-2xl border backdrop-blur-xl overflow-hidden transition-colors duration-300 ${
          isDark 
            ? 'bg-[#0f0f15]/95 border-white/[0.08] shadow-2xl shadow-black/30' 
            : 'bg-white/95 border-gray-200 shadow-xl shadow-gray-200/50'
        }`}>
          
          {/* Mobile Menu Header */}
          <div className={`px-5 py-4 border-b flex items-center justify-between ${
            isDark ? 'border-white/[0.06]' : 'border-gray-100'
          }`}>
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isDark ? 'text-neutral-500' : 'text-gray-400'
            }`}>
              Menu
            </span>
            
            {/* Theme Toggle in Mobile */}
            <button 
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                isDark 
                  ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' 
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              {isDark ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Light
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  Dark
                </>
              )}
            </button>
          </div>

          {/* Nav Links */}
          <div className="p-3 space-y-1">
            {navLinks.map((link, index) => (
              <a key={link.id} href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.name, link.id); }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeLink === link.name
                    ? `${isDark ? 'text-white bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20' : 'text-gray-900 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'} shadow-sm`
                    : `${isDark ? 'text-neutral-400 hover:text-white hover:bg-white/[0.04]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 60}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-10px)',
                }}
              >
                <span className="font-medium">{link.name}</span>
                
                {activeLink === link.name && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                    <span className={`text-[10px] font-bold uppercase ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>Active</span>
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* CTA in Mobile Menu */}
          <div className={`p-4 pt-3 border-t ${isDark ? 'border-white/[0.06]' : 'border-gray-100'}`}>
            <a href="#services"
              onClick={(e) => { e.preventDefault(); handleNavClick('Services', 'services'); }}
              className="group relative flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
              style={{ 
                background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
                transitionDelay: isOpen ? `${navLinks.length * 60}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              Get a Free Quote
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <p className={`text-center text-[10px] mt-3 ${
              isDark ? 'text-neutral-600' : 'text-gray-400'
            }`}>
              No commitment required • Response within 24hrs
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;