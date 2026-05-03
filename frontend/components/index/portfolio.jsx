import { useState } from 'react';
import samri from "../../src/assets/samri collection.png";
import erp from "../../src/assets/erp system.png";
import ecommerce from "../../src/assets/e-commerce.png";
import nani from "../../src/assets/nani.png";
import onlineExam from "../../src/assets/online exam.png";

const projects = [
  {
    id: 'samri',
    title: 'Samri Collection',
    category: 'Fashion Brand · ERP · E-Commerce',
    service: 'Full Package Development',
    description: 'Website, ERP system, e-commerce platform and digital marketing package',
    images: [
      { src: samri, label: "Website" },
  { src: erp, label: "ERP System" },
  { src: ecommerce, label: "E-Commerce" }
    ],
    stats: { label: 'Online Sales', value: '+340%' },
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-400',
    borderHover: 'hover:border-pink-500/30',
    shadowHover: 'hover:shadow-pink-500/10',
    accentGradient: 'from-pink-500/20 to-rose-500/20',
    slider: true,
  },
  {
    id: 'nani',
    title: 'Nani Cafe & Restaurant',
    category: 'Food & Hospitality',
    service: 'Full Package Development',
    description: 'Website, branding and digital marketing package',
    image: nani,
    stats: { label: 'Reservations', value: '+215%' },
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    borderHover: 'hover:border-amber-500/30',
    shadowHover: 'hover:shadow-amber-500/10',
    accentGradient: 'from-amber-500/20 to-orange-500/20',
    slider: false,
  },
  {
    id: 'school',
    title: 'Online Exam Management',
    category: 'Education Technology',
    service: 'Full Package Development',
    description: 'Custom web app, UI/UX design and deployment',
    image: onlineExam,
    stats: { label: 'Student Usage', value: '+520%' },
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    borderHover: 'hover:border-emerald-500/30',
    shadowHover: 'hover:shadow-emerald-500/10',
    accentGradient: 'from-emerald-500/20 to-teal-500/20',
    slider: false,
  },
];

function Portfolio() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [sliderIndexes, setSliderIndexes] = useState({ samri: 0 });

  const nextSlide = (id) => {
    const project = projects.find((p) => p.id === id);
    setSliderIndexes((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % project.images.length,
    }));
  };

  const prevSlide = (id) => {
    const project = projects.find((p) => p.id === id);
    setSliderIndexes((prev) => ({
      ...prev,
      [id]: (prev[id] - 1 + project.images.length) % project.images.length,
    }));
  };

  return (
    <section id="portfolio" className="relative min-h-screen flex items-center overflow-hidden bg-[#050505] pt-24 pb-20">

      {/* ─── Background Effects ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ─── Main Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-xs font-medium text-neutral-400">Our Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
            <span className="text-white">Featured </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-neutral-500 text-base md:text-lg max-w-xl leading-relaxed">
            Real results for real businesses — explore how we've helped brands grow through digital transformation.
          </p>
        </div>

        {/* ── Project Cards Grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-500 ${project.borderHover} ${project.shadowHover} hover:shadow-xl ${
                hoveredCard === project.id ? '-translate-y-2' : ''
              }`}
            >
              {/* ════════════════════════════════════════════
                  IMAGE SECTION — Slider for Samri
                  ════════════════════════════════════════════ */}
              {project.slider ? (
                <div className="relative h-56 overflow-hidden">
                  {/* Glow */}
                  <div
                    className={`absolute -inset-2 bg-gradient-to-br ${project.accentGradient} rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700`}
                  />

                  {/* Sliding Images */}
                  <div
                    className="flex h-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${(sliderIndexes[project.id] || 0) * 100}%)` }}
                  >
                    {project.images.map((img, i) => (
                      <div key={i} className="relative w-full h-full flex-shrink-0">
                        <img
                          src={img.src}
                          alt={img.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                      </div>
                    ))}
                  </div>

                  {/* Image Label Badge */}
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                    <span className="text-[11px] font-medium text-neutral-300">
                      {project.images[sliderIndexes[project.id] || 0].label}
                    </span>
                  </div>

                  {/* ── Prev Button ── */}
                  <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(project.id); }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/25 hover:bg-black/70 transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* ── Next Button ── */}
                  <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(project.id); }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/25 hover:bg-black/70 transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* ── Dot Indicators ── */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setSliderIndexes((prev) => ({ ...prev, [project.id]: i })); }}
                        className={`rounded-full transition-all duration-300 ${
                          (sliderIndexes[project.id] || 0) === i
                            ? 'w-5 h-1.5 bg-white'
                            : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* ── Floating Stat Card ── */}
                  <div
                    className={`absolute bottom-3 right-3 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-lg transition-all duration-500 z-10 ${
                      hoveredCard === project.id ? 'border-white/20 -translate-y-1' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-lg ${project.iconBg} flex items-center justify-center`}>
                        <svg className={`w-4 h-4 ${project.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-500 leading-none">{project.stats.label}</p>
                        <p className="text-sm font-bold text-white">{project.stats.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ════════════════════════════════════════════
                    IMAGE SECTION — Single image
                    ════════════════════════════════════════════ */
                <div className="relative h-56 overflow-hidden">
                  <div
                    className={`absolute -inset-2 bg-gradient-to-br ${project.accentGradient} rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700`}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                  {/* ── Floating Stat Card ── */}
                  <div
                    className={`absolute bottom-4 right-4 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-lg transition-all duration-500 ${
                      hoveredCard === project.id ? 'border-white/20 -translate-y-1' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-lg ${project.iconBg} flex items-center justify-center`}>
                        <svg className={`w-4 h-4 ${project.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-neutral-500 leading-none">{project.stats.label}</p>
                        <p className="text-sm font-bold text-white">{project.stats.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Content Section ── */}
              <div className="p-6 flex flex-col gap-4">
                {/* Category tag */}
                <div className="inline-flex items-center gap-1.5 w-fit">
                  <span className={`w-1.5 h-1.5 rounded-full ${project.iconColor.replace('text-', 'bg-')}`} />
                  <span className="text-xs font-medium text-neutral-500">{project.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white tracking-tight leading-snug">
                  {project.title}
                </h3>

                {/* Service tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <span className="iconify w-3.5 h-3.5 text-blue-400" data-icon="solar:code-bold-duotone" />
                    <span className="text-xs font-medium text-neutral-400">{project.service}</span>
                  </div>
                  {project.slider && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <span className="iconify w-3.5 h-3.5 text-purple-400" data-icon="solar:server-bold-duotone" />
                      <span className="text-xs font-medium text-neutral-400">3 Products</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {project.description}
                </p>

                {/* CTA Link — only for non-slider cards */}
                {!project.slider && (
                  <div className="pt-2">
                    
                  </div>
                )}
              </div>

              {/* ── Top-right corner accent ── */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${project.accentGradient} rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
              />
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="flex justify-center mt-16">
          <a
            href="#contact"
            className="group relative px-8 py-3.5 text-sm font-medium text-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 skew-x-12" />
            <span className="relative z-10 flex items-center gap-2">
              Start Your Project
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
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

export default Portfolio;