import { useState, useEffect } from 'react';
import { 
  FaFacebook, 
  FaCheckCircle, 
  FaStar, 
  FaCalendarAlt, 
  FaArrowRight, 
  FaShieldAlt, 
  FaUsers, 
  FaChartLine, 
  FaClock, 
  FaImage, 
  FaCreditCard, 
  FaPhone, 
  FaHandshake, 
  FaQuoteLeft,
  FaMapMarkerAlt,
  FaBolt,
  FaGift,
  FaUserTie,
  FaChartBar,
  FaComments,
  FaPaintBrush,
  FaBullhorn,
  FaEnvelope,
  FaHeadset,
  FaFileAlt,
  FaThumbsUp,
  FaHeart,
  FaRocket,
  FaLock,
  FaAward,
  FaCrown,
  FaGem,
  FaFire,
  FaTimesCircle,
  FaExclamationTriangle,
  FaGlobe,
  FaMoneyBillWave
} from 'react-icons/fa';

// ══════════ SAFE THEME HOOK ══════════
function useSafeTheme() {
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    try {
      const html = document.documentElement;
      const hasDarkClass = html.classList.contains('dark');
      
      if (hasDarkClass !== undefined) {
        setIsDark(hasDarkClass);
        
        const observer = new MutationObserver(() => {
          setIsDark(html.classList.contains('dark'));
        });
        observer.observe(html, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
      }
    } catch (e) {
      console.log('Using system preference fallback');
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    
    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return { isDark };
}

// ══════════ MAIN COMPONENT ══════════
function Service() {
  const { isDark } = useSafeTheme();

  return (
    <section id="services" className={`relative min-h-screen py-16 sm:py-24 overflow-hidden transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-[#0a0a0f] via-[#050510] to-[#0a0a15]' 
        : 'bg-gradient-to-b from-gray-50 via-white to-emerald-50/30'
    }`}>
      
      {/* ─── Animated Background ─── */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-[400px] h-[400px] rounded-full blur-[120px] animate-pulse ${
          isDark ? 'bg-blue-600/10' : 'bg-blue-400/15'
        }`} />
        <div className={`absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse ${
          isDark ? 'bg-purple-600/8' : 'bg-purple-400/12'
        }`} style={{ animationDelay: '1s' }} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] ${
          isDark ? 'bg-emerald-500/5' : 'bg-emerald-400/10'
        }`} />
        
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: isDark 
              ? 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)'
              : 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 rounded-full animate-float-slow"
            style={{
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 3) * 25}%`,
              background: isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.6)',
              boxShadow: `0 0 ${6 + i}px ${isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.6)'}`,
              animationDelay: `${i * 0.7}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ══════════ HERO SECTION ══════════ */}
        <div className="text-center mb-16 sm:mb-24">
          <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-sm mb-8 transition-all hover:scale-105 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20' 
              : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-md'
          }`}>
            <FaFacebook className="w-4 h-4 text-blue-500" />
            <span className={`text-sm font-semibold tracking-wide uppercase ${
              isDark ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Professional Facebook Management
            </span>
            <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
            <span className={`text-xs ${isDark ? 'text-blue-400/80' : 'text-blue-600'}`}>For Ethiopian Businesses</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="block">Grow Your Business</span>
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              On Facebook
            </span>
          </h1>

          <p className={`max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed mb-8 ${
            isDark ? 'text-neutral-400' : 'text-gray-600'
          }`}>
            Limited Launch Offer:{" "}
            <span className="inline-flex items-center gap-2 text-emerald-500 font-bold">
              <FaGift className="w-4 h-4" />
              First Month FREE!
            </span>{" "}
            Only{" "}
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-black mx-1">
              5
            </span>{" "}
            spots available.
          </p>

          <div className={`inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-sm shadow-lg transition-all hover:scale-105 ${
            isDark 
              ? 'bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border-orange-500/20 shadow-orange-500/5' 
              : 'bg-gradient-to-r from-orange-50 via-red-50 to-orange-50 border-orange-200 shadow-md'
          }`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaFire className="w-6 h-6 text-orange-500 animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              </div>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Offer Expires:</span>
              <span className="text-lg font-black text-orange-500">May 31, 2026</span>
            </div>
            <div className={`hidden sm:block w-px h-6 ${isDark ? 'bg-orange-500/30' : 'bg-orange-200'}`} />
            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
              <FaClock className="w-4 h-4 text-orange-500" />
              <span>Reserve before deadline</span>
            </div>
          </div>
        </div>

        {/* ══════════ MAIN PRICING CARD ══════════ */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative group">
            <div className={`absolute -inset-1 rounded-3xl opacity-25 group-hover:opacity-40 blur-2xl transition-opacity duration-1000 ${
              isDark ? 'bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500' : 'bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300'
            }`} />
            
            <div className={`relative rounded-3xl border overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl ${
              isDark 
                ? 'bg-gradient-to-br from-[#0f0f1a]/95 to-[#0a0a12]/95 backdrop-blur-2xl border-white/10 shadow-black/30' 
                : 'bg-white/95 backdrop-blur-xl border-gray-200 shadow-gray-200/50'
            }`}>
              
              <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" />

              <div className="p-8 sm:p-10 lg:p-12">
                
                {/* Header */}
                <div className={`flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 pb-8 border-b ${
                  isDark ? 'border-white/5' : 'border-gray-100'
                }`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl border ${
                        isDark ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/30' : 'bg-gradient-to-br from-emerald-100 to-cyan-100 border-emerald-200'
                      }`}>
                        <FaCrown className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/30">
                        <FaStar className="w-3 h-3 text-white" />
                        <span className="text-xs font-bold text-white tracking-wide">LAUNCH OFFER</span>
                      </div>
                    </div>
                    
                    <h2 className={`text-3xl sm:text-4xl font-black mb-3 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      Complete Facebook Management
                    </h2>
                    <p className={`text-base leading-relaxed max-w-xl ${
                      isDark ? 'text-neutral-400' : 'text-gray-600'
                    }`}>
                      Professional social media management tailored for Ethiopian businesses.
                    </p>
                  </div>

                  {/* Spots Counter */}
                  <div className={`flex-shrink-0 p-5 rounded-2xl border backdrop-blur-sm text-center min-w-[140px] ${
                    isDark ? 'bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20' : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200'
                  }`}>
                    <div className="text-4xl font-black text-red-500 mb-1">5</div>
                    <div className={`text-xs uppercase tracking-wider font-medium ${
                      isDark ? 'text-red-300/80' : 'text-red-600'
                    }`}>Spots Left</div>
                    <div className={`mt-2 flex items-center justify-center gap-1 text-[10px] ${
                      isDark ? 'text-neutral-500' : 'text-gray-500'
                    }`}>
                      <FaUsers className="w-3 h-3" />
                      <span>Limited</span>
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className={`mb-10 pb-10 border-b ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-lg line-through decoration-red-500/60 decoration-2 ${
                          isDark ? 'text-neutral-500' : 'text-gray-400'
                        }`}>
                          ETB 25,000
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-500 text-xs font-bold">
                          SAVE 42%
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-lg font-medium ${isDark ? 'text-neutral-400' : 'text-gray-500'}`}>ETB</span>
                        <span className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 via-green-400 to-emerald-400">
                          14,400
                        </span>
                        <span className={`text-xl font-medium ${isDark ? 'text-neutral-500' : 'text-gray-400'}`}>/month</span>
                      </div>
                    </div>
                    
                    <div className={`sm:ml-auto px-5 py-3 rounded-xl border ${
                      isDark ? 'bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/20' : 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200'
                    }`}>
                      <div className="flex items-center gap-2 text-emerald-600 font-bold">
                        <FaGift className="w-5 h-5" />
                        <span>MONTH 1 = FREE!</span>
                      </div>
                      <div className={`text-xs mt-1 ${isDark ? 'text-emerald-400/70' : 'text-emerald-600'}`}>Pay only ad spend</div>
                    </div>
                  </div>

                  {/* Pricing Table */}
                  <div className={`rounded-2xl border overflow-hidden backdrop-blur-sm ${
                    isDark ? 'bg-black/40 border-white/5' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className={`px-5 py-3 border-b ${isDark ? 'bg-white/[0.03]' : 'bg-gray-100'}`}>
                      <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                        <FaCreditCard className="w-4 h-4" />
                        Pricing Breakdown (Ethiopian Birr)
                      </h4>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-gray-200 bg-gray-50'}`}>
                          <th className={`py-3 px-5 text-left font-semibold ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>Month</th>
                          <th className={`py-3 px-5 text-left font-semibold ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>Management Fee</th>
                          <th className={`py-3 px-5 text-left font-semibold ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>Ad Spend</th>
                          <th className={`py-3 px-5 text-left font-semibold ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={`${isDark ? 'bg-emerald-500/5 hover:bg-emerald-500/10' : 'bg-emerald-50 hover:bg-emerald-100'} transition-colors`}>
                          <td className={`py-4 px-5 font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <FaCalendarAlt className="w-4 h-4 text-emerald-500" />
                            Month 1
                            <span className="ml-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 text-[10px] font-bold">FREE</span>
                          </td>
                          <td className="py-4 px-5 text-emerald-600 font-bold text-lg">0 Birr (FREE)</td>
                          <td className={`py-4 px-5 ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>9,000 or 18,000</td>
                          <td className={`py-4 px-5 font-medium ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>9K or 18K</td>
                        </tr>
                        <tr className={`transition-colors ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                          <td className={`py-4 px-5 font-medium flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            <FaCalendarAlt className={`w-4 h-4 ${isDark ? 'text-neutral-500' : 'text-gray-400'}`} />
                            Month 2+
                          </td>
                          <td className={`py-4 px-5 font-medium ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>14,400 Birr</td>
                          <td className={`py-4 px-5 ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>9,000 or 18,000</td>
                          <td className={`py-4 px-5 font-medium ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>23.4K or 32.4K</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className={`px-5 py-3 flex items-start gap-2 border-t ${
                      isDark ? 'bg-yellow-500/5 border-yellow-500/10' : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <FaExclamationTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className={`text-xs ${isDark ? 'text-yellow-200/80' : 'text-yellow-800'}`}>
                        <strong className={isDark ? 'text-yellow-300' : 'text-yellow-900'}>After May 31, 2026:</strong> Regular price 25,000 Birr/month applies.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features Grid */}
                <div className={`mb-10 pb-10 border-b ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                  <h4 className={`flex items-center gap-2 text-lg font-bold mb-6 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    <FaGem className="w-5 h-5 text-cyan-500" />
                    What's Included
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { icon: FaPaintBrush, title: "Content Creation", desc: "16 posts/month (4 per week) with professional graphics", color: "purple" },
                      { icon: FaBullhorn, title: "Ad Management", desc: "9K or 18K Birr budget options with optimization", color: "blue" },
                      { icon: FaComments, title: "Community Mgmt", desc: "Comments & DMs answered within 24 hours", color: "green" },
                      { icon: FaChartBar, title: "Weekly Reports", desc: "Performance metrics & improvement recommendations", color: "orange" },
                      { icon: FaUserTie, title: "Account Manager", desc: "Dedicated professional managing your account", color: "pink" },
                      { icon: FaGlobe, title: "Bilingual Content", desc: "Custom captions in Amharic or English", color: "cyan" }
                    ].map((feature, i) => (
                      <div key={i} className={`group flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                        isDark ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10' : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200 hover:shadow-md'
                      }`}>
                        <div className={`flex-shrink-0 p-2.5 rounded-lg border transition-colors ${
                          isDark ? `bg-${feature.color}-500/10 border-${feature.color}-500/20 group-hover:bg-${feature.color}-500/20` : `bg-${feature.color}-50 border-${feature.color}-200`
                        }`}>
                          <feature.icon className={`w-5 h-5 text-${feature.color}-500`} />
                        </div>
                        <div>
                          <h5 className={`font-semibold text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h5>
                          <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-500' : 'text-gray-600'}`}>{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button className="group relative w-full sm:flex-1 py-5 px-8 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      <FaRocket className="w-5 h-5" />
                      Claim Your Free Month
                      <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                  </button>
                  
                  <div className={`flex items-center gap-4 text-sm w-full sm:w-auto justify-center ${
                    isDark ? 'text-neutral-500' : 'text-gray-600'
                  }`}>
                    <span className="flex items-center gap-1.5">
                      <FaShieldAlt className="w-4 h-4 text-emerald-500" />
                      No Contract
                    </span>
                    <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />
                    <span className="flex items-center gap-1.5">
                      <FaTimesCircle className="w-4 h-4 text-emerald-500" />
                      Cancel Anytime
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ CLIENT RESULTS ══════════ */}
        <div className="mb-20">
         

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
         
          </div>
        </div>

        {/* ══════════ TWO COLUMN INFO ══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          
          {/* You Provide */}
          <div className={`p-8 rounded-3xl border transition-all hover:scale-[1.01] hover:shadow-lg ${
            isDark ? 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/10' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100 shadow-sm'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-100 border-blue-200'
              }`}>
                <FaHandshake className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>You Provide</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                { icon: FaFacebook, text: "Facebook page access (Admin rights)", color: "blue" },
                { icon: FaImage, text: "Logo and brand colors/guidelines", color: "purple" },
                { icon: FaFileAlt, text: "8-10 high-quality photos monthly", color: "pink" },
                { icon: FaMoneyBillWave, text: "Ad budget (paid directly to Facebook)", color: "green" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className={`flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                    isDark ? 'bg-white/5 border-white/10 group-hover:bg-white/10' : 'bg-gray-50 border-gray-200 group-hover:bg-gray-100'
                  }`}>
                    <item.icon className={`w-4 h-4 text-${item.color}-500`} />
                  </div>
                  <span className={`pt-1 ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Launch Dates */}
          <div className={`p-8 rounded-3xl border transition-all hover:scale-[1.01] hover:shadow-lg ${
            isDark ? 'bg-gradient-to-br from-orange-500/5 to-red-500/5 border-orange-500/10' : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-100 shadow-sm'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-100 border-orange-200'
              }`}>
                <FaCalendarAlt className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Launch Dates</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { month: "June 2026", spots: 2, status: "available", color: "emerald" },
                { month: "July 2026", spots: 3, status: "available", color: "yellow" },
                { month: "August 2026", spots: 0, status: "waitlist", color: "red" }
              ].map((date, i) => (
                <div key={i} className={`p-4 rounded-xl border flex items-center justify-between transition-all hover:scale-[1.02] ${
                  date.status === 'available' 
                    ? (isDark ? 'bg-white/[0.02] border-white/5' : 'bg-white border-gray-100')
                    : (isDark ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200')
                }`}>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className={`w-5 h-5 text-${date.color}-500`} />
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{date.month}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    date.status === 'available' 
                      ? `bg-${date.color}-500/10 text-${date.color}-600 border-${date.color}-500/20`
                      : 'bg-red-500/10 text-red-600 border-red-500/20'
                  }`}>
                    {date.spots > 0 ? `${date.spots} spots remaining` : 'Waitlist only'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ GET STARTED STEPS ══════════ */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              How It Works
            </h2>
            <p className={`text-lg ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>Get started in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", icon: FaPhone, title: "Contact Us", desc: "Reach out to reserve your spot before the deadline", color: "blue" },
              { step: "02", icon: FaComments, title: "Strategy Call", desc: "15-minute call to understand your business goals", color: "purple" },
              { step: "03", icon: FaRocket, title: "Launch Campaign", desc: "We set up everything and start driving results", color: "emerald" }
            ].map((item, i) => (
              <div key={i} className="relative group">
                {i < 2 && (
                  <div className={`hidden md:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 ${
                    isDark ? 'bg-gradient-to-r from-white/10 to-white/5' : 'bg-gradient-to-r from-gray-200 to-gray-100'
                  }`} />
                )}
                
                <div className={`relative p-8 rounded-2xl border transition-all duration-300 text-center group-hover:-translate-y-2 hover:shadow-xl ${
                  isDark ? 'bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/5 hover:border-white/10' : 'bg-white border-gray-100 hover:border-gray-200'
                }`}>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold shadow-lg">
                    Step {item.step}
                  </div>
                  
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                    isDark ? `bg-${item.color}-500/20 border-${item.color}-500/20` : `bg-${item.color}-50 border-${item.color}-200`
                  }`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-500`} />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-500' : 'text-gray-600'}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ GUARANTEE SECTION ══════════ */}
        <div className="mb-20">
          <div className={`max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl border relative overflow-hidden transition-all hover:scale-[1.01] ${
            isDark 
              ? 'bg-gradient-to-br from-emerald-500/5 via-green-500/5 to-teal-500/5 border-emerald-500/20' 
              : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-emerald-200'
          }`}>
            <div className="absolute inset-0 opacity-30">
              <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] ${
                isDark ? 'bg-emerald-500' : 'bg-emerald-300'
              }`} />
              <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] ${
                isDark ? 'bg-teal-500' : 'bg-teal-300'
              }`} />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center ${
                  isDark ? 'bg-gradient-to-br from-emerald-500/20 to-green-500/20 border-emerald-500/30' : 'bg-gradient-to-br from-emerald-100 to-green-100 border-emerald-300'
                }`}>
                  <FaShieldAlt className="w-12 h-12 text-emerald-500" />
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 ${
                  isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-100 border-emerald-200'
                }`}>
                  <FaAward className="w-4 h-4 text-emerald-500" />
                  <span className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>30-Day Guarantee</span>
                </div>
                <h3 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Try Risk-Free for 30 Days
                </h3>
                <p className={`text-lg leading-relaxed ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                  If you're not completely satisfied with our service within the first 30 days, cancel with absolutely no obligation.
                </p>
              </div>

              <div className={`flex-shrink-0 px-6 py-3 rounded-xl border text-center ${
                isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-100 border-emerald-200'
              }`}>
                <div className="text-3xl font-black text-emerald-500 mb-1">100%</div>
                <div className={`text-xs font-medium ${isDark ? 'text-emerald-300/70' : 'text-emerald-700'}`}>SATISFACTION</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ FINAL CTA WITH ENHANCED GLOWS ══════════ */}
        <div className="relative">
          {/* Main Background Glow */}
          <div className={`absolute inset-0 rounded-3xl blur-3xl opacity-30 transition-all duration-700 ${
            isDark 
              ? 'bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20' 
              : 'bg-gradient-to-r from-emerald-200/40 via-cyan-200/40 to-blue-200/40'
          }`} />
          
          <div className={`relative p-10 sm:p-16 rounded-3xl border text-center overflow-hidden transition-all hover:scale-[1.01] ${
            isDark 
              ? 'bg-gradient-to-br from-[#0f1a15] to-[#0a1210] border-emerald-500/20' 
              : 'bg-gradient-to-br from-white to-gray-50 border-emerald-200 shadow-xl'
          }`}>
            
            {/* ═══ DECORATIVE MULTI-GLOW SYSTEM ═══ */}
            
            {/* Top Left - Emerald/Teal Glow */}
            <div className={`absolute -top-8 -left-8 w-56 h-56 rounded-full blur-[130px] transition-colors duration-700 ${
              isDark 
                ? 'bg-gradient-to-br from-emerald-500/18 to-teal-500/12' 
                : 'bg-gradient-to-br from-emerald-300/35 to-teal-200/25'
            }`} />
            
            {/* Top Right - Blue/Purple Accent */}
            <div className={`absolute -top-6 -right-6 w-44 h-44 rounded-full blur-[110px] transition-colors duration-700 ${
              isDark 
                ? 'bg-gradient-to-bl from-blue-500/15 to-purple-500/10' 
                : 'bg-gradient-to-bl from-blue-300/28 to-purple-200/18'
            }`} />
            
            {/* Bottom Right - Cyan (Your Original, Enhanced) */}
            <div className={`absolute -bottom-6 -right-6 w-52 h-52 rounded-full blur-[120px] animate-pulse-slow transition-colors duration-700 ${
              isDark 
                ? 'bg-gradient-to-tl from-cyan-400/20 to-blue-400/15' 
                : 'bg-gradient-to-tl from-cyan-300/40 to-blue-300/30'
            }`}
              style={{ animationDuration: '5s' }}
            />
            
            {/* Bottom Left - Warm Orange Accent */}
            <div className={`absolute -bottom-8 left-10 w-40 h-40 rounded-full blur-[100px] transition-colors duration-700 ${
              isDark 
                ? 'bg-orange-500/10' 
                : 'bg-orange-200/25'
            }`} />

            {/* Center Ambient Fill */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none" />

            {/* Floating Orb - Moves independently (Top Center) */}
            <div 
              className="absolute top-12 right-1/4 w-36 h-36 rounded-full blur-[90px] animate-float"
              style={{
                background: isDark 
                  ? 'rgba(6, 182, 212, 0.15)' 
                  : 'rgba(34, 211, 238, 0.25)',
                animationDelay: '1.5s'
              }}
            />
            
            {/* Secondary Floating Orb (Bottom Left) */}
            <div 
              className="absolute bottom-16 left-8 w-32 h-32 rounded-full blur-[80px] animate-float-delayed"
              style={{
                background: isDark 
                  ? 'rgba(16, 185, 129, 0.12)' 
                  : 'rgba(16, 185, 129, 0.2)',
                animationDelay: '2.5s'
              }}
            />

            {/* ═══ END DECORATIVE GLOWS ═══ */}

            <div className="relative z-10">
              {/* Content */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${
                isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200'
              }`}>
                <FaFire className="w-4 h-4 text-red-500 animate-pulse" />
                <span className={`text-sm font-bold ${isDark ? 'text-red-300' : 'text-red-700'}`}>Limited Time Offer</span>
              </div>

              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Reserve Your Spot Before<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  May 31, 2026
                </span>
              </h2>

              <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                Limited to <strong className={isDark ? 'text-white' : 'text-gray-900'}>5 businesses only</strong> to ensure quality service.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a href="#contact" className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
                >
                  <FaEnvelope className="w-5 h-5" />
                  Contact Us Now
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                </a>
                
                <div className={`flex items-center gap-6 text-sm ${isDark ? 'text-neutral-500' : 'text-gray-600'}`}>
                  <span className="flex items-center gap-2">
                    <FaLock className="w-4 h-4 text-emerald-500" />
                    Secure
                  </span>
                  <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />
                  <span className="flex items-center gap-2">
                    <FaHeadset className="w-4 h-4 text-emerald-500" />
                    Support
                  </span>
                </div>
              </div>

              <p className={`text-xs ${isDark ? 'text-neutral-600' : 'text-gray-500'}`}>
                No credit card required • Free consultation • Response within 24 hours
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.05); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.6; }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(-15px); opacity: 0.5; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.08); }
        }
        .animate-pulse { animation: pulse 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 5s ease-in-out infinite; }
      `}} />
    </section>
  );
}

export default Service;