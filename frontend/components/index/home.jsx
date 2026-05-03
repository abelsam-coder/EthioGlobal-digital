import { useState } from 'react';

function Hook() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section id='home' className="relative min-h-screen flex items-center overflow-hidden bg-[#050505] pt-20">
      
      {/* ─── Background Effects ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ─── Main Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16">
        
        {/* ── Left Column: Text & CTAs ── */}
        <div className="flex flex-col gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-xs font-medium text-neutral-400">Ethiopia's Premier Digital Agency</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            <span className="text-white">Scale Your Business</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              With Digital Power
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-neutral-500 text-base md:text-lg max-w-lg leading-relaxed">
            We blend data-driven SEO, targeted advertising, and creative design to transform your online presence into a revenue-generating machine.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#contact"
              className="group relative px-8 py-3.5 text-sm font-medium text-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 skew-x-12" />
              <span className="relative z-10">Start a Project</span>
            </a>

            <a
              href="#portfolio"
              className="group flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-neutral-400 hover:text-white rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-500"
            >
              View Case Studies
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          
        </div>

        {/* ── Right Column: Image Composition ── */}
        <div className="relative flex items-center justify-center lg:justify-end">
          
          {/* Main Image Container */}
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50" />
            
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop" 
                alt="Digital marketing team analyzing data on multiple screens" 
                className="w-full h-[400px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Image overlay gradient for better text contrast on floating cards */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* ── Floating Glassmorphism Card: Traffic Stats ── */}
            <div 
              onMouseEnter={() => setHoveredCard('traffic')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`absolute -bottom-6 -left-6 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl transition-all duration-500 ${
                hoveredCard === 'traffic' ? 'border-blue-500/30 shadow-blue-500/10 -translate-y-1' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Website Traffic</p>
                  <p className="text-sm font-semibold text-white">+284% Growth</p>
                </div>
              </div>
            </div>

            {/* ── Floating Glassmorphism Card: Conversions ── */}
            <div 
              onMouseEnter={() => setHoveredCard('conversion')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`absolute -top-4 -right-4 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl transition-all duration-500 ${
                hoveredCard === 'conversion' ? 'border-purple-500/30 shadow-purple-500/10 -translate-y-1' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Conversions</p>
                  <p className="text-sm font-semibold text-white">12.5% Uplift</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ─── Scroll Indicator ─── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-neutral-600 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/30 rounded-full animate-bounce" />
        </div>
      </div>

    </section>
  );
}

export default Hook;