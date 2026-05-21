import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import logo from '../../src/assets/logo.png';
import { 
  FaGift, 
  FaTimes, 
  FaRocket, 
  FaFire,
  FaStar 
} from 'react-icons/fa';

function Header({ logoSrc }) {
  const { isDark, toggleTheme, isTransitioning } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  
  // ══════════ PERSISTENT BANNER STATE ══════════
  const [showBanner, setShowBanner] = useState(() => {
    const saved = localStorage.getItem('bannerDismissed');
    return saved !== 'true';
  });

  const handleBannerClose = () => {
    setShowBanner(false);
    localStorage.setItem('bannerDismissed', 'true');
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Owners', id: 'founders' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
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

  // Body scroll lock
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
    <>
      {/* ══════════ TRANSPARENT BANNER ══════════ */}
      {showBanner && (
        <div className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${
          isDark 
            ? 'bg-white/[0.08] backdrop-blur-xl border-b border-white/10' 
            : 'bg-white/[0.7] backdrop-blur-md border-b border-white/50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between">
            
            {/* Left Content */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
              }`}>
                <FaFire className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">
                  LIMITED OFFER
                </span>
              </div>
              
              <div className="hidden sm:flex items-center gap-2">
                <FaGift className="w-5 h-5 text-yellow-500" />
                <p className={'text-sm font-bold ' + (isDark ? 'text-white' : 'text-gray-800')}>
                  First Month{' '}
                  <span className={'px-2 py-0.5 rounded-md ' + (isDark ? 'bg-yellow-500/20 text-yellow-200' : 'bg-yellow-100 text-yellow-700')}>
                    FREE
                  </span>
                  {' '}• Only{' '}
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/80 border border-red-400/50 text-white text-xs font-black mx-1">
                    5
                  </span>
                  {' '}spots left!
                </p>
              </div>

              {/* Mobile Text */}
              <div className="flex sm:hidden items-center gap-1.5">
                <FaGift className="w-4 h-4 text-yellow-500" />
                <p className={'text-xs font-bold ' + (isDark ? 'text-white' : 'text-gray-800')}>
                  First Month FREE • 5 spots left!
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('Pricing', 'pricing');
                }}
                className={'hidden sm:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ' + (isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-emerald-500 text-white hover:bg-emerald-600')}
              >
                <FaRocket className="w-4 h-4" />
                Claim Now
              </a>

              <button
                onClick={handleBannerClose}
                className={'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:rotate-90 ' + (isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-gray-600')}
                aria-label="Close banner permanently"
                title="Don't show again"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ MAIN NAVIGATION - TRANSPARENT/GLASS ══════════ */}
      <nav
        className={'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out ' + (showBanner ? 'top-10 sm:top-11' : 'top-0') + ' ' + (
          scrolled 
            ? (isDark 
                ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/20' 
                : 'bg-white/70 backdrop-blur-md border-b border-white/60 shadow-lg')
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16 lg:h-18">
          
          {/* ── Logo ── */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('Home', 'home'); }}
            className="group flex items-center gap-2.5 sm:gap-3 flex-shrink-0"
          >
            <div className="relative">
              <img src={logoSrc || logo} alt="EthioGlobal Digital Logo"
                className={'relative h-9 w-auto object-contain rounded-lg transition-all duration-300 group-hover:scale-105 ' + (isTransitioning ? 'opacity-0 scale-95 rotate-12' : 'opacity-100 scale-100 rotate-0')}
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className={'font-bold text-base lg:text-lg leading-tight tracking-tight transition-colors duration-300 ' + (isDark ? 'text-white' : 'text-gray-900')}>
                EthioGlobal Digital V2
              </span>
              <span className={'text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ' + (isDark ? 'text-neutral-500' : 'text-gray-400')}>
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
                  className={'relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 ' + (
                    activeLink === link.name
                      ? (isDark ? 'text-white bg-white/[0.1]' : 'text-gray-900 bg-black/5')
                      : (isDark ? 'text-neutral-300 hover:text-white hover:bg-white/[0.05]' : 'text-gray-600 hover:text-gray-900 hover:bg-black/3')
                  )}
                >
                  {link.name}
                  {activeLink === link.name && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right Side Actions ── */}
          <div className="hidden md:flex items-center gap-2.5">
            
            {/* Theme Toggle - Glass Style */}
            <button
              onClick={toggleTheme}
              className={'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group ' + (isDark ? 'bg-white/[0.08] text-yellow-400 hover:bg-white/[0.15]' : 'bg-black/[0.05] text-indigo-600 hover:bg-black/[0.08]')}
              aria-label="Toggle theme"
            >
              <div className={'transition-all duration-300 ' + (isTransitioning ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100')}>
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </div>
            </button>

            {/* CTA Button - Glass/Ghost Style */}
            <a href="#contact" 
              onClick={(e) => { e.preventDefault(); handleNavClick('Services', 'services'); }}
              className={'group relative px-5 py-2.5 text-sm font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] ' + (scrolled ? (isDark ? 'text-white bg-white/10 hover:bg-white/15 border border-white/10' : 'text-gray-900 bg-black/5 hover:bg-black/10 border border-black/10') : (isDark ? 'text-white bg-white/10 backdrop-blur-sm hover:bg-white/15 border border-white/20' : 'text-gray-900 bg-white/60 backdrop-blur-sm hover:bg-white/80 border border-white/40'))}
            >
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
            className={'md:hidden relative w-11 h-11 flex flex-col items-center justify-center rounded-xl transition-all duration-300 flex-shrink-0 ' + (isOpen ? (isDark ? 'bg-white/10' : 'bg-black/5') : (isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'))}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-5 relative">
              <span className={'block h-0.5 rounded-full transition-all duration-300 origin-center ' + (isDark ? 'bg-white' : 'bg-gray-900') + ' ' + (isOpen ? 'rotate-45 translate-y-[5.5px] w-6' : '')} />
              <span className={'block h-0.5 rounded-full transition-all duration-300 ' + (isDark ? 'bg-white' : 'bg-gray-900') + ' ' + (isOpen ? 'opacity-0 scale-50' : '')} />
              <span className={'block h-0.5 rounded-full transition-all duration-300 origin-center ' + (isDark ? 'bg-white' : 'bg-gray-900') + ' ' + (isOpen ? '-rotate-45 -translate-y-[5.5px] w-6' : '')} />
            </div>
            
            <span className={'absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-medium uppercase tracking-wider transition-opacity duration-200 ' + (isOpen ? 'opacity-100' : 'opacity-0') + ' ' + (isDark ? 'text-neutral-500' : 'text-gray-400')}>
              Close
            </span>
          </button>
        </div>

        {/* ══════════ MOBILE MENU - GLASSMORPHISM ══════════ */}
        <div className={'md:hidden overflow-hidden transition-all duration-400 ease-out ' + (isOpen ? 'max-h-[calc(100vh-5rem)] opacity-100' : 'max-h-0 opacity-0')}>
          <div className={'mx-4 mb-4 mt-2 rounded-2xl backdrop-blur-xl overflow-hidden transition-colors duration-300 ' + (isDark ? 'bg-white/[0.05] border border-white/10 shadow-2xl shadow-black/40' : 'bg-white/[0.8] border border-white/60 shadow-xl')}>
            
            {/* Mobile Menu Header */}
            <div className={'px-5 py-4 border-b flex items-center justify-between ' + (isDark ? 'border-white/[0.06]' : 'border-black/5')}>
              <span className={'text-xs font-bold uppercase tracking-widest ' + (isDark ? 'text-neutral-500' : 'text-gray-400')}>
                Menu
              </span>
              
              <button 
                onClick={toggleTheme}
                className={'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ' + (isDark ? 'bg-white/[0.08] text-yellow-400 hover:bg-white/[0.12]' : 'bg-black/[0.05] text-indigo-600 hover:bg-black/[0.08]')}
              >
                {isDark ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    Light
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
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
                  className={'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ' + (
                    activeLink === link.name
                      ? (isDark ? 'text-white bg-white/[0.08] border border-white/10' : 'text-gray-900 bg-black/5 border border-black/10')
                      : (isDark ? 'text-neutral-400 hover:text-white hover:bg-white/[0.04]' : 'text-gray-600 hover:text-gray-900 hover:bg-black/3')
                  )}
                  style={{
                    transitionDelay: isOpen ? (index * 60) + 'ms' : '0ms',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-10px)',
                  }}
                >
                  <span className="font-medium">{link.name}</span>
                  
                  {activeLink === link.name && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                      <span className={'text-[10px] font-bold uppercase ' + (isDark ? 'text-blue-400' : 'text-blue-600')}>Active</span>
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* CTA in Mobile Menu */}
            <div className={'p-4 pt-3 border-t ' + (isDark ? 'border-white/[0.06]' : 'border-black/5')}>
              <a href="#services"
                onClick={(e) => { e.preventDefault(); handleNavClick('Services', 'services'); }}
                className="group relative flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                style={{ 
                  background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
                  transitionDelay: isOpen ? (navLinks.length * 60) + 'ms' : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                }}
              >
                Get a Free Quote
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              
              <p className={'text-center text-[10px] mt-3 ' + (isDark ? 'text-neutral-600' : 'text-gray-400')}>
                No commitment required • Response within 24hrs
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;