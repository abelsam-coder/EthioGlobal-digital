
import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import { 
  FaArrowRight, 
  FaRocket, 
  FaShieldAlt, 
  FaGift, 
  FaHeadset, 
  FaBolt,
  FaFacebook,
  FaFire,
  FaClock,
  FaCheckCircle,
  FaUsers,
  FaChartLine,
  FaStar,
  FaThumbsUp
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
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-20 transition-colors duration-500 ${
        isDark
          ? 'bg-[#0a0a1a]'
          : 'bg-gradient-to-br from-slate-50 via-white to-violet-50/50'
      }`}
      style={{ fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif" }}
    >
      {/* ══════════ BACKGROUND EFFECTS ══════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-500/25 to-purple-500/25 blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -right-32 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-blue-500/20 to-fuchsia-500/20 blur-3xl animate-blob-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-indigo-500/15 to-violet-500/15 blur-3xl" />

        <div className={`absolute inset-0 ${
          isDark
            ? 'opacity-[0.025] bg-[linear-gradient(rgba(255,255,255,0.1)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px_1px,transparent_1px)] bg-[size:50px_50px]'
            : 'opacity-[0.035] bg-[linear-gradient(rgba(139,92,246,0.15)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.15)_1px_1px,transparent_1px)] bg-[size:50px_50px]'
        }`} />

        <div className={`absolute inset-0 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_65%)]'
            : 'bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.1),transparent_65%)]'
        }`} />
      </div>

      {/* ══════════ CENTERED CONTENT ══════════ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Background Text Watermark for UI Depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none" style={{ zIndex: 0 }}>
          <span 
            className="font-black text-transparent opacity-[0.03]"
            style={{ 
              fontSize: 'clamp(8rem, 20vw + 5rem, 28rem)', 
              WebkitTextStroke: isDark ? '1px rgba(255,255,255,0.15)' : '1px rgba(0,0,0,0.06)',
              lineHeight: '0.8'
            }}
          >
            GROW
          </span>
        </div>

        {/* ── Top Badge Bar ── */}
        <div
          className={`relative z-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '50ms' }}
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border backdrop-blur-sm shadow-sm transition-all hover:scale-105 ${
            isDark
              ? 'border-violet-500/25 bg-violet-500/[0.08] shadow-violet-500/5'
              : 'border-violet-200 bg-white shadow-md shadow-violet-100/50'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-violet-500" />
            </span>
            <FaFacebook className="w-3.5 h-3.5 text-blue-500" />
            <span className={`text-xs font-semibold tracking-wide ${
              isDark ? 'text-violet-300' : 'text-violet-700'
            }`}>
              Facebook Management
            </span>
          </div>

          <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border shadow-sm animate-pulse-slow ${
            isDark
              ? 'border-red-500/20 bg-red-500/[0.08] shadow-red-500/5'
              : 'border-orange-200 bg-orange-50 shadow-md shadow-orange-100/50'
          }`}>
            <FaFire className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
            <span className={`text-xs font-bold ${
              isDark ? 'text-red-300' : 'text-orange-600'
            }`}>
              Only 5 Spots Left
            </span>
          </div>

          <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all hover:scale-105 ${
            isDark ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-white shadow-sm'
          }`}>
            <FaClock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" />
            <span className={`text-xs font-medium ${
              isDark ? 'text-neutral-400' : 'text-gray-600'
            }`}>
              Expires May 31, 2026
            </span>
          </div>
        </div>

        {/* ── Eyebrow ── */}
        <p
          className={`relative z-10 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-5 sm:mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isDark ? 'text-violet-400' : 'text-violet-600'}`}
          style={{ transitionDelay: '100ms' }}
        >
          For Ethiopian Businesses
        </p>

        {/* ── MASSIVE MAIN HEADLINE ── */}
        <h1
          className={`relative z-10 font-black tracking-tighter mb-6 sm:mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } ${isDark ? 'text-white' : 'text-slate-900'}`}
          style={{
            transitionDelay: '200ms',
            fontSize: 'clamp(3.5rem, 8vw + 1rem, 7.5rem)',
            lineHeight: '0.95',
            letterSpacing: '-0.04em'
          }}
        >
          Grow Your Business
          <br />
          <span className="relative inline-block mt-1 sm:mt-2">
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-sm">
              On Facebook
            </span>
            <span className="absolute -bottom-2 sm:-bottom-3 left-0 right-0 h-[4px] sm:h-[6px] bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full opacity-50 blur-[3px]" />
          </span>
        </h1>

        {/* ── Subheadline ── */}
        <p
          className={`relative z-10 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          style={{
            transitionDelay: '300ms',
            fontSize: 'clamp(1rem, 1.5vw + 0.25rem, 1.25rem)',
            lineHeight: '1.75'
          }}
        >
          Professional Facebook management with{' '}
          <span className={`font-semibold ${isDark ? 'text-violet-300' : 'text-violet-600'}`}>first month FREE</span>.
          We handle content, ads & community so you can focus on running your business.
        </p>

        {/* ── Feature Pills ── */}
        <div
          className={`relative z-10 flex flex-wrap items-center justify-center gap-2 mb-9 sm:mb-11 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '350ms' }}
        >
          {['16 Posts/Month', 'Ad Optimization', '24hr Responses', 'Weekly Reports'].map((tag, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all hover:scale-105 ${
                isDark
                  ? 'border-white/10 bg-white/[0.04] text-neutral-300 hover:border-violet-500/30 hover:bg-violet-500/[0.06]'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-violet-300 hover:bg-violet-50'
              }`}
            >
              <FaCheckCircle className="w-3.5 h-3.5 text-violet-500" />
              {tag}
            </span>
          ))}
        </div>

        {/* ── CTA Buttons ── */}
        <div
          className={`relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-10 sm:mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <a
            href="#contact"
            className="group relative w-full sm:w-auto px-9 sm:px-10 py-4 text-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
            style={{ 
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              fontSize: 'clamp(1rem, 1.2vw + 0.25rem, 1.125rem)'
            }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
            <span className="relative z-10 flex items-center justify-center gap-2.5 font-bold">
              <FaRocket className="w-5 h-5 group-hover:animate-bounce" />
              Claim Free Month
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <a
            href="#services"
            className={`group flex items-center justify-center gap-2.5 w-full sm:w-auto px-9 sm:px-10 py-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] font-bold ${
              isDark
                ? 'text-white border-white/15 hover:border-violet-400/50 hover:bg-violet-500/10'
                : 'text-slate-700 border-slate-200 hover:border-violet-300 hover:bg-violet-50 shadow-sm'
            }`}
            style={{ fontSize: 'clamp(1rem, 1.2vw + 0.25rem, 1.125rem)' }}
          >
            View Pricing
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* ── Trust Indicators ── */}
        <div
          className={`relative z-10 flex flex-wrap items-center justify-center gap-5 sm:gap-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-violet-500/10' : 'bg-violet-50'}`}>
              <FaShieldAlt className={`w-4 h-4 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>No Contract</span>
          </div>

          <div className={`w-px h-5 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />

          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}>
              <FaGift className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Month 1 Free</span>
          </div>

          <div className={`w-px h-5 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />

          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <FaHeadset className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>24/7 Support</span>
          </div>
        </div>

        {/* ── Star Rating ── */}
        <div
          className={`relative z-10 mt-6 flex items-center justify-center gap-3 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
            ))}
          </div>
          <span className={`text-sm font-medium ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>
            Trusted by 15+ Ethiopian businesses
          </span>
        </div>
      </div>

      {/* ══════════ BOTTOM STATS BAR ══════════ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div
          className={`pt-8 sm:pt-10 border-t-2 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(139,92,246,0.1)',
            transitionDelay: '700ms'
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: FaUsers, value: '15+', label: 'Ethiopian Businesses', gradient: 'from-blue-500 to-indigo-500' },
              { icon: FaThumbsUp, value: '5x', label: 'Avg Engagement Boost', gradient: 'from-violet-500 to-purple-500' },
              { icon: FaChartLine, value: '16', label: 'Posts Per Month', gradient: 'from-fuchsia-500 to-pink-500' },
              { icon: FaBolt, value: '24hr', label: 'Response Time', gradient: 'from-amber-500 to-orange-500' },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className={`text-2xl sm:text-3xl font-black mb-1 transition-colors duration-300 ${
                  isDark ? 'text-white group-hover:text-violet-400' : 'text-slate-900 group-hover:text-violet-600'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ ANIMATIONS & FONT ══════════ */}
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
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.03); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animate-blob-delayed { animation: blob-delayed 10s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}} />
    </section>
  );
}

export default Hook;
