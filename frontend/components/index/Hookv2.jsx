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
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 transition-colors duration-500 ${
        isDark
          ? 'bg-[#0a0a1a]'
          : 'bg-gradient-to-br from-slate-50 via-white to-violet-50/50'
      }`}
      style={{ fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif" }}
    >
      {/* ══════════ BACKGROUND EFFECTS ══════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Ambient purple/violet orbs */}
        <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-blue-500/15 to-fuchsia-500/15 blur-3xl animate-blob-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 blur-3xl" />

        {/* Subtle grid */}
        <div className={`absolute inset-0 ${
          isDark
            ? 'opacity-[0.025] bg-[linear-gradient(rgba(255,255,255,0.1)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px_1px,transparent_1px)] bg-[size:50px_50px]'
            : 'opacity-[0.035] bg-[linear-gradient(rgba(139,92,246,0.15)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.15)_1px_1px,transparent_1px)] bg-[size:50px_50px]'
        }`} />

        {/* Radial glow at center */}
        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_60%)]'
            : 'bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_60%)]'
        }`} />
      </div>

      {/* ══════════ CENTERED CONTENT ══════════ */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">

        

        
        {/* ── Main Headline ── */}
        <h1 className={`text-5xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-5 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        } ${isDark ? 'text-white' : 'text-slate-900'}`}
          style={{ transitionDelay: '200ms' }}
        >
          Grow Your Business
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              On Facebook
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full opacity-50 blur-[2px]" />
          </span>
        </h1>

        {/* ── Subheadline ── */}
        <p className={`text-base sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-9 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        } ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          style={{ transitionDelay: '300ms' }}
        >
          Professional Facebook management with{' '}
          <span className={`font-semibold ${isDark ? 'text-violet-300' : 'text-violet-600'}`}>first month FREE</span>.
          We handle content, ads & community so you can focus on running your business.
        </p>

        {/* ── CTA Buttons ── */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
          style={{ transitionDelay: '400ms' }}
        >
          {/* Primary CTA — Purple gradient */}
          <a href="#contact"
            className="group relative w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FaRocket className="w-4 h-4 group-hover:animate-bounce" />
              Claim Free Month
              <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          {/* Secondary CTA — Outline */}
          <a href="#services"
            className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl border transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${
              isDark
                ? 'text-white border-white/15 hover:border-violet-400/50 hover:bg-violet-500/10'
                : 'text-slate-700 border-slate-200 hover:border-violet-300 hover:bg-violet-50 shadow-sm'
            }`}
          >
            View Pricing
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* ── Minimal Trust Indicators ── */}
        <div className={`flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
          style={{ transitionDelay: '500ms' }}
        >
          {[
            { icon: FaShieldAlt, label: 'No Contract' },
            { icon: FaGift, label: 'Month 1 Free' },
            { icon: FaHeadset, label: '24/7 Support' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className={`w-3.5 h-3.5 ${
                isDark ? 'text-violet-400' : 'text-violet-500'
              }`} />
              <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations + Font Import */}
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
