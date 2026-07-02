
import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import { 
  FaArrowRight, 
  FaRocket, 
  FaFacebook,
  FaFire,
  FaClock
} from 'react-icons/fa';

function Hook() {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#050508]' : 'bg-[#fafafa]'
      }`}
      style={{ fontFamily: "'Inter', 'Space Grotesk', system-ui, sans-serif" }}
    >
      {/* ══════════ ULTRA-CLEAN BACKGROUND ══════════ */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary subtle glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-violet-600/20 via-fuchsia-500/15 to-blue-600/20 blur-3xl transition-opacity duration-1000" />
        
        {/* Secondary ambient glows */}
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* ══════════ MAIN CENTERED CONTENT ══════════ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        
        {/* ── Single, Sleek Top Badge ── */}
        <div
          className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-xl mb-10 sm:mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${
            isDark
              ? 'bg-white/[0.05] border-white/[0.08] shadow-lg shadow-black/20'
              : 'bg-white/80 border-gray-200/50 shadow-lg shadow-gray-200/50'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          <div className="flex items-center gap-1.5">
            <FaFacebook className="w-3.5 h-3.5 text-blue-500" />
            <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
              Facebook Management
            </span>
          </div>
          
          <div className={`w-px h-4 ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />
          
          <div className="flex items-center gap-1.5 text-orange-500">
            <FaFire className="w-3.5 h-3.5" />
            <span className="text-xs font-bold tracking-wide">Only 5 Spots Left</span>
          </div>
          
          <div className={`w-px h-4 ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />
          
          <div className="flex items-center gap-1.5">
            <FaClock className={`w-3 h-3 ${isDark ? 'text-neutral-500' : 'text-gray-400'}`} />
            <span className={`text-xs font-medium ${isDark ? 'text-white/50' : 'text-gray-500'}`}>May 31, 2026</span>
          </div>
        </div>

        {/* ── Clean Eyebrow ── */}
        <p
          className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] mb-6 sm:mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isDark ? 'text-violet-400/80' : 'text-violet-600'}`}
          style={{ transitionDelay: '100ms' }}
        >
          For Ethiopian Businesses
        </p>

        {/* ── MASSIVE MAIN HEADLINE ── */}
        <h1
          className={`font-extrabold tracking-tighter leading-[0.9] mb-8 sm:mb-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={{
            transitionDelay: '200ms',
            fontSize: 'clamp(4rem, 12vw + 1rem, 10rem)',
          }}
        >
          Grow Your Business
          <br />
          <span className="relative inline-block mt-2 sm:mt-4">
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              On Facebook
            </span>
          </span>
        </h1>

        {/* ── Minimal Subheadline ── */}
        <p
          className={`max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isDark ? 'text-neutral-400' : 'text-gray-500'}`}
          style={{
            transitionDelay: '350ms',
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
          }}
        >
          Professional social media management tailored for Ethiopian businesses. 
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}> Month 1 FREE</span> — you only pay ad spend.
        </p>

        {/* ── Premium CTA Buttons ── */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '450ms' }}
        >
          <a
            href="#contact"
            className="group relative w-full sm:w-auto px-8 py-4 text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/25 hover:-translate-y-0.5 active:scale-[0.98] text-base font-semibold"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FaRocket className="w-4 h-4 group-hover:animate-bounce" />
              Claim Free Month
              <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <a
            href="#services"
            className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] text-base font-semibold ${
              isDark
                ? 'text-white/80 border-white/10 hover:bg-white/5 hover:border-white/20'
                : 'text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            View Pricing
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        {/* ── Subtle Micro-copy ── */}
        <p
          className={`mt-8 text-xs tracking-wide transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          } ${isDark ? 'text-neutral-600' : 'text-gray-400'}`}
          style={{ transitionDelay: '600ms' }}
        >
          No credit card required • Cancel anytime
        </p>

      </div>

      {/* ══════════ SUBTLE SCROLL INDICATOR ══════════ */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`} style={{ transitionDelay: '1000ms' }}>
        <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5 ${
          isDark ? 'border-white/10' : 'border-gray-300'
        }`}>
          <div className={`w-1.5 h-3 rounded-full animate-bounce-slow ${
            isDark ? 'bg-white/30' : 'bg-gray-400'
          }`} />
        </div>
      </div>

      {/* ══════════ MINIMAL ANIMATIONS ══════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(6px); opacity: 1; }
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}} />
    </section>
  );
}

export default Hook;
