import { useState, useEffect } from 'react';
import {
  FaArrowRight, FaRocket, FaBolt, FaCheckCircle,
  FaShieldAlt, FaGift, FaCalendarAlt, FaPhone, FaComments, FaStar, FaUsers, FaChartLine, FaTimesCircle
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
    <section id="services"
      className={`relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 transition-colors duration-500 ${
        isDark ? 'bg-[#0a0a1a]' : 'bg-gradient-to-br from-slate-50 via-white to-violet-50/50'
      }`}
      style={{ fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif" }}
    >
      {/* ══════════ BACKGROUND EFFECTS ══════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-blue-500/15 to-fuchsia-500/15 blur-3xl animate-blob-delayed" />
        <div className="absolute top-1/3 left-2/3 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 blur-3xl" />

        <div className={`absolute inset-0 ${
          isDark
            ? 'opacity-[0.025] bg-[linear-gradient(rgba(255,255,255,0.1)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px_1px,transparent_1px)] bg-[size:50px_50px]'
            : 'opacity-[0.035] bg-[linear-gradient(rgba(139,92,246,0.15)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.15)_1px_1px,transparent_1px)] bg-[size:50px_50px]'
        }`} />

        {/* Diagonal accent line */}
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-violet-500/10 to-transparent rotate-12" />
      </div>

      {/* ══════════ SPLIT LAYOUT ══════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ─── LEFT: Content (7/12) ─── */}
          <div className="lg:col-span-7 text-left">

            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md shadow-sm mb-8 ${
              isDark
                ? 'border-violet-500/30 bg-violet-500/10'
                : 'border-violet-200 bg-white shadow-violet-100/50'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-full w-full bg-violet-500" />
              </span>
              <span className={`text-xs sm:text-sm font-semibold tracking-wide ${
                isDark ? 'text-violet-200' : 'text-violet-700'
              }`}>
                Complete Facebook Management — 5 Spots Left
              </span>
            </div>

            {/* Headline */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Complete Facebook
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                  Management
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full opacity-50 blur-[2px]" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className={`text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Professional social media management tailored for Ethiopian businesses.
              {' '}<span className={`font-semibold ${isDark ? 'text-violet-300' : 'text-violet-600'}`}>Month 1 FREE</span>{' '}
              — you only pay ad spend.
            </p>

            {/* Compact Feature List — inline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9 max-w-xl">
              {[
                { icon: FaRocket, text: "16 posts / month with pro graphics" },
                { icon: FaComments, text: "Community replies within 24 hrs" },
                { icon: FaCheckCircle, text: "Weekly performance reports" },
                { icon: FaShieldAlt, text: "Dedicated account manager" },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  isDark
                    ? 'border-white/5 bg-white/[0.03]'
                    : 'border-violet-100 bg-white'
                }`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.15))' }}
                  >
                    <item.icon className="w-4 h-4 text-violet-500" />
                  </div>
                  <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-8">
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

              <a href="#contact"
                className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl border transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${
                  isDark
                    ? 'text-white border-white/15 hover:border-violet-400/50 hover:bg-violet-500/10'
                    : 'text-slate-700 border-slate-200 hover:border-violet-300 hover:bg-violet-50 shadow-sm'
                }`}
              >
                <FaPhone className="w-3.5 h-3.5" />
                Contact Us
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3">
              {[
                { icon: FaShieldAlt, label: '30-Day Guarantee' },
                { icon: FaCheckCircle, label: 'No Contract' },
                { icon: FaTimesCircle, label: 'Cancel Anytime' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className={`w-3.5 h-3.5 ${isDark ? 'text-violet-400' : 'text-violet-500'}`} />
                  <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT: Pricing Card (5/12) ─── */}
          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto lg:ml-auto lg:mr-0">

              {/* Glow behind card */}
              <div className={`absolute -inset-4 rounded-3xl blur-2xl transition-colors duration-500 ${
                isDark
                  ? 'bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 opacity-60'
                  : 'bg-gradient-to-r from-violet-300/40 via-purple-300/40 to-fuchsia-300/40 opacity-80'
              }`} />

              {/* Glassmorphism Card */}
              <div className={`relative rounded-3xl border backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.01] ${
                isDark
                  ? 'bg-white/[0.04] border-white/10 shadow-black/30'
                  : 'bg-white/80 border-violet-100 shadow-violet-200/40'
              }`}>

                {/* Top gradient bar */}
                <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500" />

                <div className="p-6 sm:p-7">

                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-bold tracking-wide"
                      style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}
                    >
                      <FaBolt className="w-3 h-3" />
                      LAUNCH OFFER
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-3 h-3 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Full Management Plan
                  </h3>
                  <p className={`text-xs mb-5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    Cancel anytime · No long-term contract
                  </p>

                  {/* Price Block */}
                  <div className="mb-5 pb-5 border-b border-dashed"
                    style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(139,92,246,0.15)' }}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`text-sm font-medium line-through ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        ETB 25,000
                      </span>
                      <span className="px-2 py-0.5 rounded bg-fuchsia-500/15 text-fuchsia-500 text-[10px] font-bold">
                        SAVE 42%
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ETB</span>
                      <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-fuchsia-400">
                        14,400
                      </span>
                      <span className={`text-sm font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>/mo</span>
                    </div>
                    <div className="flex items-center gap-2 text-violet-500 font-semibold text-xs mt-2">
                      <FaGift className="w-3.5 h-3.5" />
                      <span>Month 1 = FREE · Pay only ad spend (9K or 18K)</span>
                    </div>
                  </div>

                  {/* What's Included */}
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    What's Included
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {[
                      "16 posts / month (4 per week)",
                      "Custom graphics & brand assets",
                      "Ad optimization (9K or 18K budget)",
                      "24-hour community response",
                      "Weekly performance reports",
                      "Bilingual content (Amharic / English)",
                    ].map((text, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <FaCheckCircle className="w-4 h-4 flex-shrink-0 text-violet-500" />
                        <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Card CTA */}
                  <a href="#contact"
                    className="group relative w-full py-3 text-sm font-bold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg block text-center"
                    style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Reserve Your Spot
                      <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>

                  {/* Deadline note */}
                  <p className={`text-center text-[10px] mt-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    After May 31, 2026: regular price ETB 25,000/mo
                  </p>
                </div>
              </div>

              {/* Floating Mini Stat — top right */}
              <div className={`absolute -top-3 -right-3 px-3 py-2 rounded-xl shadow-xl backdrop-blur-md transition-colors ${
                isDark
                  ? 'bg-[#0a0a1a]/90 border border-violet-500/30'
                  : 'bg-white/90 border border-violet-200 shadow-violet-100/50'
              }`}>
                <div className="flex items-center gap-1.5">
                  <FaUsers className="w-3 h-3 text-violet-500" />
                  <span className="text-lg font-bold text-violet-500">15+</span>
                </div>
                <div className={`text-[9px] font-bold uppercase tracking-wider ${
                  isDark ? 'text-violet-300' : 'text-violet-700'
                }`}>Businesses</div>
              </div>

              {/* Floating Mini Stat — bottom left */}
              <div className={`absolute -bottom-3 -left-3 px-3 py-2 rounded-xl shadow-xl backdrop-blur-md transition-colors ${
                isDark
                  ? 'bg-[#0a0a1a]/90 border border-fuchsia-500/30'
                  : 'bg-white/90 border border-fuchsia-200 shadow-fuchsia-100/50'
              }`}>
                <div className="flex items-center gap-1.5">
                  <FaChartLine className="w-3 h-3 text-fuchsia-500" />
                  <span className="text-lg font-bold text-fuchsia-500">5x</span>
                </div>
                <div className={`text-[9px] font-bold uppercase tracking-wider ${
                  isDark ? 'text-fuchsia-300' : 'text-fuchsia-700'
                }`}>Engagement</div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── How It Works — 3 compact steps, full width ─── */}
        <div className={`mt-16 sm:mt-20 pt-10 border-t ${isDark ? 'border-white/5' : 'border-violet-100'}`}>
          <div className="text-center mb-8">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              How It Works
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { step: "01", icon: FaPhone, title: "Contact Us", desc: "Reserve your spot before deadline" },
              { step: "02", icon: FaComments, title: "Strategy Call", desc: "15-min call to align goals" },
              { step: "03", icon: FaRocket, title: "Launch", desc: "We set up & drive results" }
            ].map((item, i) => (
              <div key={i} className={`relative p-5 rounded-xl border text-center transition-all hover:-translate-y-1 ${
                isDark
                  ? 'border-white/5 bg-white/[0.03] hover:bg-white/[0.05]'
                  : 'border-violet-100 bg-white hover:shadow-md'
              }`}>
                <div className="inline-flex items-center justify-center w-8 h-8 mb-3 rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}
                >
                  {item.step}
                </div>
                <item.icon className={`w-5 h-5 mx-auto mb-2 ${isDark ? 'text-violet-400' : 'text-violet-500'}`} />
                <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h4>
                <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations + Font */}
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

export default Service;
