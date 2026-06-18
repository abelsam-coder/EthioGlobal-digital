import { useState } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn, FaHeart, FaXmark } from 'react-icons/fa6';
import logo from '../../src/assets/logo.png';

const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    content: `At EthioGlobal Digital, we take your privacy seriously. We collect only the information necessary to provide our services — your name, email, business page details, and communication preferences. We never sell your personal data to third parties. All data is stored securely with industry-standard encryption. You may request deletion of your data at any time by contacting us. We use analytics tools solely to improve our service quality, not to track you across the web.`
  },
  terms: {
    title: 'Terms of Service',
    content: `By engaging EthioGlobal Digital, you agree to provide accurate business information and timely feedback on deliverables. Our services are provided on a month-to-month basis with no long-term contract required. Payment is due at the start of each service period. We reserve the right to refuse content that violates Ethiopian law or Facebook's community standards. Results vary based on industry, budget, and market conditions — we commit to best practices, not guaranteed follower counts. Either party may terminate with 7 days written notice.`
  },
  regulations: {
    title: 'Regulatory Compliance',
    content: `EthioGlobal Digital operates in full compliance with Ethiopian laws, including the Consumer Protection Proclamation and electronic transaction regulations. Our advertising practices follow Facebook/Meta's Advertising Standards and the National Election Board of Ethiopia guidelines during election periods. We maintain transparent records of all ad spend and content published on behalf of clients. All financial transactions are processed through recognized Ethiopian banking channels.`
  },
  cookies: {
    title: 'Cookie Policy',
    content: `Our website uses essential cookies to maintain your session and preferences, including your dark/light mode choice. We use analytics cookies to understand how visitors interact with our site — these are anonymized and do not identify you personally. No advertising or third-party tracking cookies are used. You can disable non-essential cookies through your browser settings at any time. Disabling cookies may affect some site functionality but will not prevent you from using our core services.`
  }
};

function Footer() {
  const { isDark } = useTheme();
  const [activeLegal, setActiveLegal] = useState(null);

  const openLegal = (key) => {
    setActiveLegal(activeLegal === key ? null : key);
  };

  const closeLegal = () => {
    setActiveLegal(null);
  };

  return (
    <footer
      className={`relative overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#06060f]' : 'bg-white'
      }`}
      style={{ fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif" }}
    >
      {/* ══════════ TOP GRADIENT LINE ══════════ */}
      <div className={`absolute top-0 left-0 right-0 h-px ${
        isDark
          ? 'bg-gradient-to-r from-transparent via-violet-500/60 to-transparent'
          : 'bg-gradient-to-r from-transparent via-violet-400/40 to-transparent'
      }`} />

      {/* ══════════ BACKGROUND GLOW ══════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-3xl ${
          isDark
            ? 'bg-gradient-to-t from-violet-600/8 to-transparent'
            : 'bg-gradient-to-t from-violet-300/10 to-transparent'
        }`} />
        <div className={`absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full blur-3xl ${
          isDark ? 'bg-fuchsia-600/5' : 'bg-fuchsia-200/15'
        }`} />
      </div>

      {/* ══════════ LEGAL CONTENT PANEL ══════════ */}
      <div
        className={`relative z-20 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          activeLegal ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`mx-5 sm:mx-6 mt-5 rounded-2xl p-6 sm:p-8 border transition-colors duration-500 ${
          isDark
            ? 'bg-violet-500/5 border-violet-500/20'
            : 'bg-violet-50/80 border-violet-200/60'
        }`}>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, #7c3aed, #d946ef)' }} />
                <h3 className={`text-lg sm:text-xl font-bold transition-colors duration-500 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {activeLegal && legalContent[activeLegal]?.title}
                </h3>
              </div>
              <button
                onClick={closeLegal}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                  isDark
                    ? 'text-slate-400 hover:text-white hover:bg-white/10'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <FaXmark className="w-4 h-4" />
              </button>
            </div>
            <p className={`text-sm leading-relaxed transition-colors duration-500 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {activeLegal && legalContent[activeLegal]?.content}
            </p>
          </div>
        </div>
      </div>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 pt-14 pb-8">

        {/* ── Top Row: Brand + Nav Columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

          {/* ── Brand Column ── */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-4">
            <a href="#" className="inline-flex items-center gap-2.5 mb-4 group">
              <img
                src={logo}
                alt="EthioGlobal Digital Logo"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="flex flex-col leading-none">
                <span className={`text-base font-bold tracking-tight transition-colors duration-500 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  EthioGlobal
                </span>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                  Digital
                </span>
              </div>
            </a>
            <p className={`text-sm leading-relaxed mb-5 transition-colors duration-500 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Empowering businesses in Hawassa and beyond with world-class digital solutions.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { icon: FaFacebookF, label: 'Facebook' },
                { icon: FaXTwitter, label: 'X' },
                { icon: FaInstagram, label: 'Instagram' },
                { icon: FaLinkedinIn, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-250 ${
                    isDark
                      ? 'text-slate-400 bg-white/5 border border-white/5 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/10'
                      : 'text-slate-400 bg-slate-100 border border-slate-100 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Services ── */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 tracking-wide transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Services
            </h4>
            <ul className="space-y-2.5">
              {['Social Media Management', 'Facebook Ads', 'Content Creation', 'Analytics & Reports'].map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className={`text-sm text-left transition-colors duration-200 cursor-default ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 tracking-wide transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '#home' },
                { label: 'Pricing', href: '#services' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href}
                    className={`text-sm transition-colors duration-200 ${
                      isDark
                        ? 'text-slate-400 hover:text-violet-400'
                        : 'text-slate-500 hover:text-violet-600'
                    }`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal ── */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 tracking-wide transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Legal
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Privacy Policy', key: 'privacy' },
                { label: 'Terms of Service', key: 'terms' },
                { label: 'Regulations', key: 'regulations' },
                { label: 'Cookie Policy', key: 'cookies' },
              ].map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => openLegal(item.key)}
                    className={`text-sm text-left transition-colors duration-200 ${
                      activeLegal === item.key
                        ? 'text-violet-500 font-medium'
                        : isDark
                          ? 'text-slate-400 hover:text-violet-400'
                          : 'text-slate-500 hover:text-violet-600'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className={`h-px mb-8 ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent'
            : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'
        }`} />

        {/* ── Bottom Row ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-xs flex items-center gap-1.5 transition-colors duration-500 ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}>
            © {new Date().getFullYear()} EthioGlobal Digital. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5">
            <FaHeart className="w-3 h-3 text-violet-500" />
            <p className={`text-xs transition-colors duration-500 ${
              isDark ? 'text-slate-600' : 'text-slate-400'
            }`}>
              Developed by
            </p>
            <a
              href="https://abel-samuel.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200"
            >
              Abel Samuel
            </a>
          </div>
        </div>
      </div>

      {/* ══════════ FONT IMPORT ══════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
      `}} />
    </footer>
  );
}

export default Footer;