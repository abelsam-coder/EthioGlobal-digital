import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import { 
  FaFacebook, 
  FaStar, 
  FaArrowRight, 
  FaClock,
  FaFire,
  FaGift,
  FaRocket,
  FaEnvelope,
  FaCheckCircle,
  FaUsers,
  FaChartLine,
  FaThumbsUp,
  FaHeart,
  FaShieldAlt,
  FaHeadset
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
      className={`relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 lg:pt-28 transition-colors duration-500 pb-10 ${
        isDark ? 'bg-[#030712]' : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50/30'
      }`}
    >
      
      {/* ══════════ BACKGROUND EFFECTS ══════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-blue-500/10 to-purple-500/10 blur-3xl animate-blob-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-orange-500/5 to-pink-500/5 blur-3xl" />

        {/* Subtle Grid */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px_1px,transparent_1px)] bg-[size:50px_50px]' 
            : 'opacity-[0.04] bg-[linear-gradient(rgba(16,185,129,0.15)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.15)_1px_1px,transparent_1px)] bg-[size:50px_50px]'
        }`} />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 rounded-full opacity-20 animate-float-slow"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              background: isDark ? 'rgba(16, 185, 129, 0.6)' : 'rgba(16, 185, 129, 0.8)',
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* ── Top Badge Bar ── */}
        <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          
          {/* Main Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm shadow-sm transition-all hover:scale-105 ${
            isDark 
              ? 'border-emerald-500/20 bg-emerald-500/[0.08] shadow-emerald-500/5' 
              : 'border-emerald-200 bg-white shadow-md shadow-emerald-100/50'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500" />
            </span>
            <FaFacebook className="w-4 h-4 text-blue-500" />
            <span className={`text-xs font-semibold tracking-wide ${
              isDark ? 'text-emerald-300' : 'text-emerald-700'
            }`}>
              Facebook Management
            </span>
          </div>

          {/* Limited Spots Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm animate-pulse-slow ${
            isDark 
              ? 'border-red-500/20 bg-red-500/[0.08] shadow-red-500/5' 
              : 'border-orange-200 bg-orange-50 shadow-md shadow-orange-100/50'
          }`}>
            <FaFire className="w-3.5 h-3.5 text-orange-500" />
            <span className={`text-xs font-bold ${
              isDark ? 'text-red-300' : 'text-orange-600'
            }`}>
              Only 5 Spots Left
            </span>
          </div>

          {/* Offer Expiry */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:scale-105 ${
            isDark ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-white shadow-sm'
          }`}>
            <FaClock className="w-3.5 h-3.5 text-blue-500" />
            <span className={`text-xs font-medium ${
              isDark ? 'text-neutral-400' : 'text-gray-600'
            }`}>
              Expires May 31, 2026
            </span>
          </div>
        </div>

        {/* ── Two Column: Image LEFT / Info RIGHT ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ═══ LEFT COLUMN: Image ═══ */}
          <div className={`order-2 lg:order-1 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative">
              
              {/* Background Glow behind image */}
              <div className={`absolute -inset-6 rounded-[2rem] blur-3xl transition-colors duration-500 ${
                isDark 
                  ? 'bg-gradient-to-br from-emerald-500/15 via-cyan-500/15 to-blue-500/15' 
                  : 'bg-gradient-to-br from-emerald-300/30 via-cyan-300/30 to-blue-300/30'
              }`} />

              {/* Main Image Container */}
              <div className={`relative rounded-3xl overflow-hidden border-2 shadow-2xl transition-all duration-500 ${
                isDark 
                  ? 'border-white/10 shadow-black/40' 
                  : 'border-gray-100 shadow-gray-300/50'
              }`}>
                
                {/* Image */}
                <img 
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
                  alt="Facebook social media marketing dashboard"
                  className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[3/2]"
                  loading="eager"
                />

                {/* Gradient Overlay on bottom of image */}
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDark 
                    ? 'from-[#030712] via-transparent to-transparent' 
                    : 'from-white/80 via-transparent to-transparent'
                }`} />

                {/* Floating Engagement Card - inside image */}
                <div className={`absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto px-5 py-4 rounded-2xl shadow-xl backdrop-blur-md transition-all animate-bounce-slow ${
                  isDark 
                    ? 'bg-[#0f172a]/85 border border-emerald-500/30' 
                    : 'bg-white/85 border border-emerald-200 shadow-emerald-100/30'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[
                        'from-blue-400 to-blue-600',
                        'from-emerald-400 to-emerald-600',
                        'from-purple-400 to-purple-600',
                        'from-orange-400 to-orange-600',
                      ].map((gradient, i) => (
                        <div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} border-2 ${
                          isDark ? 'border-[#0f172a]' : 'border-white'
                        } flex items-center justify-center`}>
                          <FaUsers className="w-3.5 h-3.5 text-white/90" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className={`text-lg font-black ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>+2,847</div>
                      <div className={`text-xs font-semibold ${
                        isDark ? 'text-emerald-300' : 'text-emerald-600'
                      }`}>New Followers</div>
                    </div>
                  </div>
                </div>

                {/* Floating Stats - top right of image */}
                <div className={`absolute top-4 right-4 sm:top-6 sm:-right-4 px-4 py-3 rounded-xl shadow-xl backdrop-blur-md animate-bounce-slow-delayed transition-all ${
                  isDark 
                    ? 'bg-[#0f172a]/90 border border-blue-500/30' 
                    : 'bg-white/90 border border-blue-200 shadow-blue-100/30'
                }`}>
                  <div className="flex items-center gap-2">
                    <FaChartLine className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className="text-xl font-black text-emerald-500">5x</div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${
                        isDark ? 'text-blue-300' : 'text-blue-700'
                      }`}>Growth</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className={`absolute -z-10 -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-xl ${
                isDark ? 'bg-emerald-500/10' : 'bg-emerald-300/20'
              }`} />
            </div>
          </div>

          {/* ═══ RIGHT COLUMN: Info Content ═══ */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Eyebrow Text */}
            <p className={`text-sm font-bold uppercase tracking-[0.25em] mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
              style={{ transitionDelay: '100ms' }}
            >
              For Ethiopian Businesses
            </p>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Grow Your Business
              <br />
              <span className="relative inline-block mt-1">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  On Facebook
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full opacity-40 blur-sm" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className={`text-base sm:text-lg lg:text-xl max-w-lg leading-relaxed mb-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}
              style={{ transitionDelay: '300ms' }}
            >
              Professional Facebook management with{' '}
              <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>first month FREE</span>.
              We handle content, ads & community so you can focus on running your business.
            </p>

            {/* Quick Feature Pills */}
            <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 transition-all duration-700 delay-350 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
              style={{ transitionDelay: '350ms' }}
            >
              {[
                '16 Posts/Month',
                'Ad Optimization',
                '24hr Responses',
                'Weekly Reports'
              ].map((tag, i) => (
                <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105 ${
                  isDark 
                    ? 'border-white/10 bg-white/[0.04] text-neutral-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06]' 
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-emerald-300 hover:bg-emerald-50'
                }`}>
                  <FaCheckCircle className={`w-3 h-3 ${isDark ? 'text-emerald-500' : 'text-emerald-500'}`} />
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center gap-4 mb-10 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
              style={{ transitionDelay: '400ms' }}
            >
              {/* Primary CTA */}
              <a href="#contact"
                className="group relative w-full sm:w-auto px-8 py-4 text-base font-bold text-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  <FaRocket className="w-5 h-5 group-hover:animate-bounce" />
                  Claim Free Month
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              {/* Secondary CTA */}
              <a href="#services"
                className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] ${
                  isDark 
                    ? 'text-white border-white/20 hover:border-white/40 hover:bg-white/[0.04] shadow-lg shadow-black/20' 
                    : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-md'
                }`}
              >
                View Pricing
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                  <FaShieldAlt className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>No Contract</span>
              </div>
              
              <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />
              
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}>
                  <FaGift className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                </div>
                <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>Month 1 Free</span>
              </div>
              
              <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />
              
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                  <FaHeadset className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>24/7 Support</span>
              </div>
            </div>

            {/* Star Rating & Social Proof */}
            <div className={`mt-6 flex items-center justify-center lg:justify-start gap-3 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
                ))}
              </div>
              <span className={`text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-gray-500'}`}>
                Trusted by 15+ Ethiopian businesses
              </span>
            </div>
          </div>
        </div>

        {/* ══════════ BOTTOM STATS BAR ══════════ */}
        <div className={`mt-16 sm:mt-24 pt-8 border-t-2 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
          style={{ 
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
            transitionDelay: '700ms'
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: FaUsers, value: '15+', label: 'Ethiopian Businesses', color: 'blue' },
              { icon: FaThumbsUp, value: '5x', label: 'Avg Engagement Boost', color: 'emerald' },
              { icon: FaChartLine, value: '16', label: 'Posts Per Month', color: 'purple' },
              { icon: FaHeart, value: '24hr', label: 'Response Time', color: 'rose' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3 transition-all group-hover:scale-110 group-hover:rotate-3 ${
                  isDark ? `bg-${stat.color}-500/10 border border-${stat.color}-500/20` : `bg-${stat.color}-50 border border-${stat.color}-100 shadow-sm`
                }`}>
                  <stat.icon className={`w-7 h-7 text-${stat.color}-500`} />
                </div>
                <div className={`text-2xl sm:text-3xl font-black mb-1 transition-colors ${
                  isDark ? 'text-white group-hover:text-emerald-400' : 'text-gray-900 group-hover:text-emerald-600'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-neutral-500' : 'text-gray-500'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
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
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(-20px); opacity: 0.5; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.02); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes bounce-slow-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animate-blob-delayed { animation: blob-delayed 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-bounce-slow-delayed { animation: bounce-slow-delayed 3.5s ease-in-out infinite; }
      `}} />
    </section>
  );
}

export default Hook;
