import { useState, useEffect } from 'react';

function Header({ logoSrc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Owners', id: 'founders' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // ── Find which section is currently in view ──
      let current = 'Home';

      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        // If the top of this section has scrolled past 120px from viewport top
        // (accounts for fixed nav height ~80px + small buffer)
        if (rect.top <= 120) {
          current = link.name;
        }
      }

      setActiveLink(current);
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (name, id) => {
    setActiveLink(name);
    setIsOpen(false);

    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-[#050505]/70 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('Home', 'home');
          }}
          className="group flex items-center gap-3"
        >
          <img
            src={logoSrc}
            alt="EthioDigital Global Logo"
            className="h-9 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg leading-tight tracking-tight">
              EthioDigital Global
            </span>
            <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-[0.2em]">
              Digital Agency
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.name, link.id);
                }}
                className={`relative px-5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeLink === link.name
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {activeLink === link.name && (
                  <span className="absolute inset-0 bg-white/[0.06] rounded-lg border border-white/[0.08]" />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* CTA → Services */}
        <div className="hidden md:block">
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('Services', 'services');
            }}
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 skew-x-12" />
            <span className="relative z-10 flex items-center gap-2">
              Get a Quote
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-500 origin-center ${isOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-500 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
            <span className={`block h-[1.5px] bg-white rounded-full transition-all duration-500 origin-center ${isOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-4 border-t border-white/5 mt-3">
          <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.06] p-4 space-y-1">
            {navLinks.map((link, index) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.name, link.id);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeLink === link.name
                    ? 'text-white bg-white/[0.06] border border-white/[0.08]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 75}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                }}
              >
                <span>{link.name}</span>
                {activeLink === link.name && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                )}
              </a>
            ))}

            <div className="pt-3 px-1">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('Services', 'services');
                }}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get a Quote
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;