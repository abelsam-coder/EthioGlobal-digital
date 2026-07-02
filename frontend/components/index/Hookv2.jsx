
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
  FaThumbsUp,
  FaEye
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
      className={`relative min-h-screen flex items-center overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-16 transition-colors duration-500 ${
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

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full animate-float-particle opacity-30"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              background: isDark ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.8)',
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* ══════════ TWO-COLUMN LAYOUT ══════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top Badge Bar ── */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-14 transition-all duration-700 ${
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

        {/* ── Grid: Left Text / Right Image ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">

          {/* ═══ LEFT COLUMN: Content ═══ */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <p
              className={`text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-4 sm:mb-5 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${isDark ? 'text-violet-400' : 'text-violet-600'}`}
              style={{ transitionDelay: '100ms' }}
            >
              For Ethiopian Businesses
            </p>

            <h1
              className={`font-bold leading-[1.05] sm:leading-[1.08] tracking-tight mb-5 sm:mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              } ${isDark ? 'text-white' : 'text-slate-900'}`}
              style={{
                transitionDelay: '200ms',
                fontSize: 'clamp(2rem, 4.5vw + 0.5rem, 4rem)',
                letterSpacing: '-0.02em'
              }}
            >
              Grow Your Business
              <br />
              <span className="relative inline-block mt-1">
                <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                  On Facebook
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] sm:h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full opacity-50 blur-[2px]" />
              </span>
            </h1>

            <p
              className={`max-w-lg mx-auto lg:mx-0 leading-relaxed mb-7 sm:mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
              style={{
                transitionDelay: '300ms',
                fontSize: 'clamp(0.875rem, 1.3vw + 0.25rem, 1.125rem)',
                lineHeight: '1.7'
              }}
            >
              Professional Facebook management with{' '}
              <span className={`font-semibold ${isDark ? 'text-violet-300' : 'text-violet-600'}`}>first month FREE</span>.
              We handle content, ads & community so you can focus on running your business.
            </p>

            <div
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-7 sm:mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              {['16 Posts/Month', 'Ad Optimization', '24hr Responses', 'Weekly Reports'].map((tag, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105 ${
                    isDark
                      ? 'border-white/10 bg-white/[0.04] text-neutral-300 hover:border-violet-500/30 hover:bg-violet-500/[0.06]'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-violet-300 hover:bg-violet-50'
                  }`}
                >
                  <FaCheckCircle className="w-3 h-3 text-violet-500" />
                  {tag}
                </span>
              ))}
            </div>

            <div
              className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 sm:mb-10 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <a
                href="#contact"
                className="group relative w-full sm:w-auto px-7 sm:px-8 py-3.5 text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <FaRocket className="w-4 h-4 group-hover:animate-bounce" />
                  Claim Free Month
                  <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="#services"
                className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-xl border-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${
                  isDark
                    ? 'text-white border-white/15 hover:border-violet-400/50 hover:bg-violet-500/10'
                    : 'text-slate-700 border-slate-200 hover:border-violet-300 hover:bg-violet-50 shadow-sm'
                }`}
                style={{ fontSize: 'clamp(0.875rem, 1.2vw + 0.25rem, 1rem)' }}
              >
                View Pricing
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-violet-500/10' : 'bg-violet-50'}`}><FaShieldAlt className={`w-3.5 h-3.5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} /></div>
                <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>No Contract</span>
              </div>
              <div className={`w-px h-4 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}><FaGift className={`w-3.5 h-3.5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} /></div>
                <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Month 1 Free</span>
              </div>
              <div className={`w-px h-4 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}><FaHeadset className={`w-3.5 h-3.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} /></div>
                <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>24/7 Support</span>
              </div>
            </div>

            <div
              className={`mt-5 flex items-center justify-center lg:justify-start gap-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (<FaStar key={i} className="w-3.5 h-3.5 text-yellow-400 drop-shadow-sm" />))}
              </div>
              <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>Trusted by 15+ Ethiopian businesses</span>
            </div>
          </div>

          {/* ═══ RIGHT COLUMN: 3D App/Window Image Structure ═══ */}
          <div
            className={`order-1 lg:order-2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative max-w-lg mx-auto lg:ml-auto lg:mr-0" style={{ perspective: '1200px' }}>
              
              {/* Ambient Glow */}
              <div className={`absolute -inset-8 rounded-[3rem] blur-3xl transition-all duration-500 group-hover:blur-2xl ${
                isDark
                  ? 'bg-gradient-to-br from-violet-600/30 via-fuchsia-500/20 to-blue-500/30 opacity-70'
                  : 'bg-gradient-to-br from-violet-300/50 via-fuchsia-200/40 to-blue-300/50 opacity-80'
              }`} />

              {/* 3D Floating Container */}
              <div 
                className="relative transition-transform duration-700 ease-out hover:[transform:rotateY(-1deg)_rotateX(1deg)_scale(1.02)]"
                style={{ transform: 'rotateY(-5deg) rotateX(3deg)', transformStyle: 'preserve-3d' }}
              >
                <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 shadow-2xl ${
                  isDark
                    ? 'border-white/[0.08] shadow-black/50 shadow-violet-500/10'
                    : 'border-white/80 shadow-gray-400/30 shadow-violet-200/20'
                }`}>
                  
                  {/* App / Browser Top Bar */}
                  <div className={`flex items-center gap-3 px-4 sm:px-5 py-3 border-b ${
                    isDark ? 'bg-[#121220]/90 border-white/[0.06]' : 'bg-gray-50/90 border-gray-200/80'
                  }`}>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                    </div>
                    <div className="flex-1 mx-2 sm:mx-4">
                      <div className={`max-w-xs mx-auto h-7 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-medium ${
                        isDark ? 'bg-white/[0.05] text-neutral-500' : 'bg-white text-gray-400 border border-gray-100 shadow-inner'
                      }`}>
                        <FaFacebook className="w-3 h-3 text-blue-500 mr-2" />
                        ethioglobal.digital/business
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      isDark ? 'bg-white/[0.05] text-neutral-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <FaArrowRight className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  {/* Main Image Area */}
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                      alt="Data analytics dashboard showing business growth metrics"
                      className="w-full aspect-[4/3] sm:aspect-[16/10] object-cover"
                      loading="eager"
                    />
                    
                    {/* Inner Gradient Overlay for depth */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isDark ? 'from-[#121220] via-transparent to-transparent' : 'from-white/60 via-transparent to-transparent'
                    }`} />
                  </div>
                </div>

                {/* ── Floating UI Elements ── */ */}
                
                {/* Top Left: Live Viewers Pill */}
                <div className={`absolute -top-3 -left-3 sm:-top-4 sm:-left-6 px-3 py-2 rounded-xl shadow-xl backdrop-blur-xl border animate-bounce-slow-delayed z-20 ${
                  isDark ? 'bg-[#121220]/95 border-red-500/30' : 'bg-white/95 border-red-200 shadow-red-100/40'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <FaEye className="w-4 h-4 text-red-500" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-red-500">1.2K</div>
                      <div className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-red-300' : 'text-red-600'}`}>Live Now</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Right: ROI Card */}
                <div className={`absolute -bottom-4 -right-3 sm:-bottom-6 sm:-right-6 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border animate-bounce-slow z-20 ${
                  isDark ? 'bg-[#121220]/95 border-emerald-500/30' : 'bg-white/95 border-emerald-200 shadow-emerald-100/40'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isDark ? 'bg-emerald-500/15' : 'bg-emerald-50'}`}>
                      <FaChartLine className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-500 font-bold mb-0.5">Return on Ad Spend</div>
                      <div className="text-2xl font-black text-emerald-500 leading-none">5.4x</div>
                    </div>
                  </div>
                  {/* Mini Chart SVG */}
                  <div className="mt-3 flex items-end gap-1 h-6">
                    {[40, 65, 45, 80, 55, 90, 75, 95].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-emerald-500/30 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-sm transition-all duration-500" style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle Right: Engagement Badge */}
                <div className={`absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-5 px-3 py-2.5 rounded-xl shadow-xl backdrop-blur-xl border z-20 ${
                  isDark ? 'bg-[#121220]/90 border-violet-500/30' : 'bg-white/90 border-violet-200 shadow-violet-100/40'
                }`}>
                  <div className="flex items-center gap-2">
                    <FaThumbsUp className="w-4 h-4 text-violet-500" />
                    <div>
                      <div className="text-lg font-black text-violet-500 leading-none">847%</div>
                      <div className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-violet-300' : 'text-violet-600'}`}>Engagement</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floor Shadow / Reflection */}
              <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full blur-2xl -z-10 ${
                isDark ? 'bg-violet-500/20' : 'bg-violet-400/25'
              }`} />
            </div>
          </div>
        </div>

        {/* ══════════ BOTTOM STATS BAR ══════════ */}
        <div
          className={`mt-16 sm:mt-24 pt-8 sm:pt-10 border-t-2 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(139,92,246,0.1)',
            transitionDelay: '700ms'
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
            {[
              { icon: FaUsers, value: '15+', label: 'Ethiopian Businesses', gradient: 'from-blue-500 to-indigo-500' },
              { icon: FaThumbsUp, value: '5x', label: 'Avg Engagement Boost', gradient: 'from-violet-500 to-purple-500' },
              { icon: FaChartLine, value: '16', label: 'Posts Per Month', gradient: 'from-fuchsia-500 to-pink-500' },
              { icon: FaBolt, value: '24hr', label: 'Response Time', gradient: 'from-amber-500 to-orange-500' },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className={`inline-flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-2xl mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br ${stat.gradient} shadow-lg`}>
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
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-25px); opacity: 0.6; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.03); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-slow-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animate-blob-delayed { animation: blob-delayed 10s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 5s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-bounce-slow-delayed { animation: bounce-slow-delayed 3.5s ease-in-out infinite; }
      `}} />
    </section>
  );
}

export default Hook;
