import { useState, useEffect } from 'react';

function Hook() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isHoverCapable, setIsHoverCapable] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsHoverCapable(mediaQuery.matches);
    const handler = (e) => setIsHoverCapable(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050505] pt-16 sm:pt-20"
    >
      {/* ─── Background Effects ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-blue-600/[0.07] sm:bg-blue-600/10 rounded-full blur-[80px] sm:blur-[120px] lg:blur-[150px]" />
        <div className="absolute bottom-10 right-5 w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] lg:w-[400px] lg:h-[400px] bg-purple-600/[0.07] sm:bg-purple-600/10 rounded-full blur-[70px] sm:blur-[100px] lg:blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ─── Main Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center py-10 sm:py-14 lg:py-16">

        {/* ── Left Column: Text & CTAs ── */}
        <div className="flex flex-col gap-6 sm:gap-8 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm w-fit mx-auto lg:mx-0">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-blue-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-neutral-400">
              Ethiopia&apos;s Premier Digital Agency
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            <span className="text-white">Scale Your Business</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              With Digital Power
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-neutral-500 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed mx-auto lg:mx-0">
            We blend data-driven SEO, targeted advertising, and creative design
            to transform your online presence into a revenue-generating machine.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <a
              href="#contact"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 text-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 skew-x-12" />
              <span className="relative z-10">Start a Project</span>
            </a>

            <a
              href="#portfolio"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-neutral-400 hover:text-white rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-500"
            >
              View Case Studies
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Right Column: Image Composition ── */}
        <div className="relative flex items-center justify-center lg:justify-end order-first lg:order-last">
          {/* Main Image Container */}
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
            {/* Glow behind image */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 sm:opacity-50" />

            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop"
                alt="Digital marketing team analyzing data on multiple screens"
                className="w-full h-[260px] sm:h-[360px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* ── Floating Card: Traffic Stats ── */}
            <div
              onMouseEnter={() => setHoveredCard('traffic')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`absolute -bottom-3 sm:-bottom-6 -left-2 sm:-left-6 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl transition-all duration-500 ${
                isHoverCapable && hoveredCard === 'traffic'
                  ? 'border-blue-500/30 shadow-blue-500/10 -translate-y-1'
                  : ''
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-neutral-500 leading-none">
                    Website Traffic
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 sm:mt-0">
                    +284% Growth
                  </p>
                </div>
              </div>
            </div>

            {/* ── Floating Card: Conversions ── */}
            <div
              onMouseEnter={() => setHoveredCard('conversion')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl transition-all duration-500 ${
                isHoverCapable && hoveredCard === 'conversion'
                  ? 'border-purple-500/30 shadow-purple-500/10 -translate-y-1'
                  : ''
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-neutral-500 leading-none">
                    Conversions
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 sm:mt-0">
                    12.5% Uplift
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Scroll Indicator (desktop only) ─── */}
      <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[10px] text-neutral-600 uppercase tracking-[0.2em]">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/30 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export default Hook;