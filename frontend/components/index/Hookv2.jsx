
import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import { 
  FaArrowRight, 
  FaRocket, 
  FaFacebook,
  FaFire,
  FaClock,
  FaCheck
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
      style={{ 
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        paddingTop: 'clamp(7rem, 12vw, 10rem)' 
      }}
    >
      {/* ══════════ CLEAN BACKGROUND EFFECTS ══════════ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-violet-600/25 to-fuchsia-500/20 blur-3xl transition-opacity duration-1000" />
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* ══════════ MAIN CENTERED CONTENT ══════════ */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 text-center">
        
        {/* ── Sleek Top Badge ── */}
        <div
          className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-xl mb-10 sm:mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${
            isDark
              ? 'bg-white/[0.05] border-white/[0.08]'
              : 'bg-white/80 border-gray-200/50 shadow-sm'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          <div className="flex items-center gap-1.5">
            <FaFacebook className="w-3.5 h-3.5 text-blue-500" />
            <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
              Growth Partner
            </span>
          </div>
          
          <div className={`w-px h-4 ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />
          
          <div className="flex items-center gap-1.5 text-orange-500">
            <FaFire className="w-3.5 h-3.5" />
            <span className="text-xs font-bold tracking-wide">5 Spots Left</span>
          </div>
          
          <div className={`w-px h-4 ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />
          
          <div className="flex items-center gap-1.5">
            <FaClock className={`w-3 h-3 ${isDark ? 'text-neutral-500' : 'text-gray-400'}`} />
            <span className={`text-xs font-medium ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Ends May 31</span>
          </div>
        </div>

        {/* ── Clean Eyebrow ── */}
        <p
          className={`text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-6 sm:mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isDark ? 'text-violet-400/80' : 'text-violet-600'}`}
          style={{ transitionDelay: '100ms' }}
        >
          For Ethiopian Businesses
        </p>

        {/* ── STRICT 2-LINE HEADLINE ── */}
        <h1
          className={`font-extrabold tracking-tight leading-[1.05] mb-8 sm:mb-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={{
            transitionDelay: '200ms',
            fontSize: 'clamp(3rem, 7vw, 6.5rem)', // Sized perfectly to prevent 3 lines
          }}
        >
          Dominate Facebook
          <br />
          <span className="relative inline-block mt-1 sm:mt-2">
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              For Your Business
            </span>
          </span>
        </h1>

        {/* ── Subheadline ── */}
        <p
          className={`max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isDark ? 'text-neutral-400' : 'text-gray-500'}`}
          style={{
            transitionDelay: '350ms',
            fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
          }}
        >
          We handle your content, ads, and community so you can focus on running your business. 
          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}> First month absolutely free.</span>
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
            className="group relative w-full sm:w-auto px-8 py-4 text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/25 hover:-translate-y-0.5 active:scale-[0.98] text-base font-bold"
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
            className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] text-base font-bold ${
              isDark
                ? 'text-white/80 border-white/10 hover:bg-white/5 hover:border-white/20'
                : 'text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            See How It Works
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        {/* ── Attractive Trust Proof (Replaced Mouse Icon & Old Text) ── */}
        <div
          className={`mt-10 flex items-center justify-center gap-2 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex -space-x-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-bold text-white ${
                isDark ? 'border-[#050508]' : 'border-white'
              }`} style={{ background: `linear-gradient(135deg, hsl(${260 + i * 30}, 80%, 55%), hsl(${280 + i * 30}, 80%, 65%))` }}>
                {['N', 'A', 'D'][i]}
              </div>
            ))}
          </div>
          <p className={`text-sm font-medium ${isDark ? 'text-neutral-500' : 'text-gray-400'}`}>
            <span className={`font-bold ${isDark ? 'text-white/80' : 'text-gray-700'}`}>15+ Ethiopian brands</span> 
            <span className="mx-1.5">•</span> 
            Scaling with us right now
          </p>
        </div>

      </div>

      {/* ══════════ PREMIUM FONT IMPORT ══════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');
      `}} />
    </section>
  );
}

export default Hook;
