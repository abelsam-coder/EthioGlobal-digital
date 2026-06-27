import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import { FaArrowRight, FaRocket, FaShieldAlt, FaGift, FaHeadset, FaBolt } from 'react-icons/fa';

function Hook() {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-16 transition-colors duration-500 ${
        isDark
          ? 'bg-[#0a0a1a]'
          : 'bg-gradient-to-br from-slate-50 via-white to-violet-50/50'
      }`}
      style={{ fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif" }}
    >
      {/* ══════════ BACKGROUND EFFECTS ══════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-blue-500/15 to-fuchsia-500/15 blur-3xl animate-blob-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 blur-3xl" />

        <div className={`absolute inset-0 ${
          isDark
            ? 'opacity-[0.025] bg-[linear-gradient(rgba(255,255,255,0.1)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px_1px,transparent_1px)] bg-[size:50px_50px]'
            : 'opacity-[0.035] bg-[linear-gradient(rgba(139,92,246,0.15)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.15)_1px_1px,transparent_1px)] bg-[size:50px_50px]'
        }`} />

        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_60%)]'
            : 'bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_60%)]'
        }`} />
      </div>

      {/* ══════════ CENTERED CONTENT ══════════ */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* ── Main Headline ── */}
        <h1 
          className={`font-bold leading-[1.08] tracking-tight mb-4 sm:mb-5 md:mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          } ${isDark ? 'text-white' : 'text-slate-900'}`}
          style={{ 
            transitionDelay: '200ms',
            fontSize: 'clamp(1.875rem, 5vw + 0.5rem, 4.5rem)',
            letterSpacing: '-0.02em'
          }}
        >
          Grow Your Business
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              On Facebook
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-[3px] sm:h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full opacity-50 blur-[2px]" />
          </span>
        </h1>

        {/* ── Subheadline ── */}
        <p 
          className={`max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-9 md:mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          style={{ 
            transitionDelay: '300ms',
            fontSize: 'clamp(0.875rem, 1.5vw + 0.25rem, 1.25rem)',
            lineHeight: '1.7'
          }}
        >
          <span style={{ fontSize: '0.9em' }}>Professional</span> Facebook management with{' '}
          <span className={`font-semibold ${isDark ? 'text-violet-300' : 'text-violet-600'}`}>first month FREE</span>.
          We handle content, ads & community so you can focus on running your business.
        </p>

        {/* ── CTA Buttons ── */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <a href="#contact"
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ 
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)'
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FaRocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:animate-bounce" />
              Claim Free Month
              <FaArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <a href="#services"
            className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${
              isDark
                ? 'text-white border-white/15 hover:border-violet-400/50 hover:bg-violet-500/10'
                : 'text-slate-700 border-slate-200 hover:border-violet-300 hover:bg-violet-50 shadow-sm'
            }`}
            style={{ 
              fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)'
            }}
          >
            View Pricing
            <FaArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* ── Minimal Trust Indicators ── */}
        <div 
          className={`flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-2.5 sm:gap-y-3 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {[
            { icon: FaShieldAlt, label: 'No Contract' },
            { icon: FaGift, label: 'Month 1 Free' },
            { icon: FaHeadset, label: '24/7 Support' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 sm:gap-2">
              <item.icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                isDark ? 'text-violet-400' : 'text-violet-500'
              }`} />
              <span 
                className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                style={{ 
                  fontSize: 'clamp(0.6875rem, 1vw + 0.125rem, 0.875rem)'
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes blob-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 40px) scale(1.05); }
          66% { transform: translate(20px, -30px) scale(0.95); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animate-blob-delayed { animation: blob-delayed 10s ease-in-out infinite; }
      `}} />
    </section>
  );
}

export default Hook;