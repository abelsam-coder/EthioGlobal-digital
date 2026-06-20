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
      
      {/* ══════════ BACKGROUND EFFECTS (2D Only) ══════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Gradient Orbs - Beautiful ambient lighting */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-blue-500/10 to-purple-500/10 blur-3xl animate-blob-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-orange-500/5 to-pink-500/5 blur-3xl" />

        {/* Subtle Grid Pattern */}
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
        <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 transition-all duration-700 ${
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

        {/* ── Two Column Layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ═══ LEFT COLUMN: Content ═══ */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            
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
                {/* Animated Underline */}
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
          </div>

          {/* ═══ RIGHT COLUMN: Visual Card ═══ */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="relative max-w-lg mx-auto">
              
              {/* Background Glow - More prominent in light mode */}
              <div className={`absolute -inset-4 rounded-3xl blur-2xl transition-colors duration-500 ${
                isDark 
                  ? 'bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 opacity-60' 
                  : 'bg-gradient-to-r from-emerald-300/40 via-cyan-300/40 to-blue-300/40 opacity-80'
              }`} />

              {/* Main Card */}
              <div className={`relative rounded-3xl overflow-hidden border-2 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] ${
                isDark 
                  ? 'bg-gradient-to-b from-[#0f172a] to-[#020617] border-white/10 shadow-black/30' 
                  : 'bg-white border-gray-100 shadow-gray-200/50'
              }`}>
                
                {/* Card Header - Gradient Bar */}
                <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

                <div className="p-6 sm:p-8">
                  
                  {/* Offer Badge Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/25">
                      <FaFire className="w-3.5 h-3.5 text-white animate-pulse" />
                      <span className="text-xs font-bold text-white tracking-wide">LIMITED OFFER</span>
                    </div>
                    
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
                      ))}
                    </div>
                  </div>

                  {/* Big Value Prop */}
                  <div className="text-center mb-6 pb-6 border-b-2 border-dashed"
                    style={{
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
                    }}
                  >
                    <div className="text-7xl sm:text-8xl font-black mb-2 bg-gradient-to-br from-emerald-300 via-green-400 to-teal-400 bg-clip-text text-transparent">
                      FREE
                    </div>
                    <p className={`text-lg font-bold mb-1 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      First Month Management
                    </p>
                    <p className={`text-sm ${
                      isDark ? 'text-neutral-500' : 'text-gray-500'
                    }`}>
                      You only pay ad spend (9K or 18K Birr)
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {[
                      { icon: FaCheckCircle, text: "16 professional posts per month", color: "emerald" },
                      { icon: FaCheckCircle, text: "Custom graphics & brand assets", color: "blue" },
                      { icon: FaCheckCircle, text: "Ad optimization (9K or 18K budget)", color: "purple" },
                      { icon: FaCheckCircle, text: "24-hour community response", color: "pink" },
                      { icon: FaCheckCircle, text: "Weekly performance reports", color: "orange" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 group">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all group-hover:scale-110 ${
                          isDark ? `bg-${item.color}-500/10 border border-${item.color}-500/20` : `bg-${item.color}-50 border border-${item.color}-200`
                        }`}>
                          <item.icon className={`w-3.5 h-3.5 text-${item.color}-500`} />
                        </div>
                        <span className={`text-sm font-medium transition-colors ${
                          isDark ? 'text-neutral-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'
                        }`}>
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA in Card */}
                  <a href="#contact"
                    className="group relative w-full py-4 text-base font-bold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg block text-center"
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FaEnvelope className="w-5 h-5" />
                      Reserve Your Spot Now
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>

                  {/* Urgency Note */}
                  <p className={`text-center text-xs mt-4 font-medium ${
                    isDark ? 'text-neutral-500' : 'text-gray-400'
                  }`}>
                    ⚡ After May 31: Regular price ETB 25,000/month
                  </p>
                </div>
              </div>

              {/* Floating Stats Cards - Positioned absolutely */}
              <div className={`absolute -top-3 -right-3 sm:top-2 sm:-right-6 px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm animate-bounce-slow transition-colors ${
                isDark 
                  ? 'bg-[#0f172a]/90 border border-emerald-500/30' 
                  : 'bg-white/90 border border-emerald-200 shadow-emerald-100/50'
              }`}>
                <div className="text-2xl font-black text-emerald-500">5x</div>
                <div className={`text-[10px] font-bold uppercase tracking-wider ${
                  isDark ? 'text-emerald-300' : 'text-emerald-700'
                }`}>Engagement</div>
              </div>

              <div className={`absolute -bottom-3 -left-3 sm:bottom-2 sm:-left-6 px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm animate-bounce-slow-delayed transition-colors ${
                isDark 
                  ? 'bg-[#0f172a]/90 border border-blue-500/30' 
                  : 'bg-white/90 border border-blue-200 shadow-blue-100/50'
              }`}
                style={{ animationDelay: '1s' }}
              >
                <div className="text-2xl font-black text-blue-500">15+</div>
                <div className={`text-[10px] font-bold uppercase tracking-wider ${
                  isDark ? 'text-blue-300' : 'text-blue-700'
                }`}>Businesses</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ BOTTOM STATS BAR ══════════ */}
        <div className={`mt-16 sm:mt-24 pt-8 border-t-2 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
          style={{ 
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
            transitionDelay: '600ms'
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

     

      {/* Custom Animations - No JSX Error */}
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
          0%, 100% { transform: translateY(0) opacity: 0.2; }
          50% { transform: translateY(-20px) opacity: 0.5; }
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
        @keyframes scroll-down {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.4; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animate-blob-delayed { animation: blob-delayed 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-bounce-slow-delayed { animation: bounce-slow-delayed 3.5s ease-in-out infinite; }
        .animate-scroll-down { animation: scroll-down 2s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
      `}} />
    </section>
  );
}

export default Hook;
