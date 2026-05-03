import { useState, useRef, useEffect } from 'react';
import samri from "../../src/assets/samri collection.png";
import erp from "../../src/assets/erp system.png";
import ecommerce from "../../src/assets/e-commerce.png";
import nani from "../../src/assets/nani Cafe.png";
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

function ImageSlider({ project, sliderIndex, setSliderIndex }) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setSliderIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevSlide = () => {
    setSliderIndex((prev) =>
      (prev - 1 + project.images.length) % project.images.length
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 40) {
      if (distance > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      className="relative h-48 sm:h-56 lg:h-60 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Glow */}
      <div
        className={`absolute -inset-2 bg-gradient-to-br ${project.accentGradient} rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700`}
      />

      {/* Sliding Images */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
      >
        {project.images.map((img, i) => (
          <div key={i} className="relative w-full h-full flex-shrink-0">
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Image Label Badge */}
      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
        <span className="text-[10px] sm:text-[11px] font-medium text-neutral-300">
          {project.images[sliderIndex].label}
        </span>
      </div>

      {/* Prev Button */}
      <button
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        aria-label="Previous image"
        className="absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/25 hover:bg-black/70 active:scale-90 transition-all duration-300"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        aria-label="Next image"
        className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/25 hover:bg-black/70 active:scale-90 transition-all duration-300"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 sm:gap-1.5">
        {project.images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setSliderIndex(i); }}
            aria-label={`Go to image ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              sliderIndex === i
                ? 'w-4 h-1.5 sm:w-5 bg-white'
                : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ project, isHovered }) {
  return (
    <div
      className={`absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg transition-all duration-500 z-10 ${
        isHovered ? 'border-white/20 -translate-y-1' : ''
      }`}
    >
      <div className="flex items-center gap-2 sm:gap-2.5">
        <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-md sm:rounded-lg ${project.iconBg} flex items-center justify-center flex-shrink-0`}>
          <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${project.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-[9px] sm:text-[10px] text-neutral-500 leading-none">{project.stats.label}</p>
          <p className="text-xs sm:text-sm font-bold text-white">{project.stats.value}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, isHovered, setHoveredCard, sliderIndex, setSliderIndex }) {
  return (
    <div
      onMouseEnter={() => setHoveredCard(project.id)}
      onMouseLeave={() => setHoveredCard(null)}
      className={`group relative bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/[0.06] rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ${project.borderHover} ${project.shadowHover} hover:shadow-xl ${
        isHovered ? '-translate-y-1 sm:-translate-y-2' : ''
      }`}
    >
      {/* ── Image Section ── */}
      {project.slider ? (
        <ImageSlider
          project={project}
          sliderIndex={sliderIndex}
          setSliderIndex={setSliderIndex}
        />
      ) : (
        <div className="relative h-48 sm:h-56 lg:h-60 overflow-hidden">
          <div
            className={`absolute -inset-2 bg-gradient-to-br ${project.accentGradient} rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700`}
          />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <StatCard project={project} isHovered={isHovered} />
        </div>
      )}

      {/* Stat card for slider (placed after image section so it's inside the relative container) */}
      {project.slider && <StatCard project={project} isHovered={isHovered} />}

      {/* ── Content Section ── */}
      <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-3 sm:gap-4">
        {/* Category tag */}
        <div className="inline-flex items-center gap-1.5 w-fit">
          <span
            className={`w-1.5 h-1.5 rounded-full ${project.iconColor.replace('text-', 'bg-')}`}
          />
          <span className="text-[10px] sm:text-xs font-medium text-neutral-500">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug">
          {project.title}
        </h3>

        {/* Service tags */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="iconify w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" data-icon="solar:code-bold-duotone" />
            <span className="text-[10px] sm:text-xs font-medium text-neutral-400">
              {project.service}
            </span>
          </div>
          {project.slider && (
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <span className="iconify w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" data-icon="solar:server-bold-duotone" />
              <span className="text-[10px] sm:text-xs font-medium text-neutral-400">
                3 Products
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* ── Top-right corner accent ── */}
      <div
        className={`absolute top-0 right-0 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-bl ${project.accentGradient} rounded-bl-2xl sm:rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
      />
    </div>
  );
}

function Portfolio() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [sliderIndexes, setSliderIndexes] = useState({ samri: 0 });
  const [isHoverCapable, setIsHoverCapable] = useState(false);

  // Detect hover capability (filters out touch-only devices)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsHoverCapable(mediaQuery.matches);

    const handler = (e) => setIsHoverCapable(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const setSliderIndex = (id, index) => {
    if (typeof index === 'function') {
      setSliderIndexes((prev) => ({ ...prev, [id]: index(prev[id] || 0) }));
    } else {
      setSliderIndexes((prev) => ({ ...prev, [id]: index }));
    }
  };

  return (
    <section
      id="portfolio"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050505] pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20"
    >
      {/* ─── Background Effects ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 sm:top-40 left-5 sm:left-10 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-blue-600/[0.07] sm:bg-blue-600/10 rounded-full blur-[80px] sm:blur-[120px] lg:blur-[150px]" />
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] bg-purple-600/[0.07] sm:bg-purple-600/10 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px]" />
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 lg:mb-16 gap-3 sm:gap-4">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-blue-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-neutral-400">
              Our Work
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
            <span className="text-white">Featured </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-neutral-500 text-sm sm:text-base md:text-lg max-w-lg sm:max-w-xl leading-relaxed px-2">
            Real results for real businesses — explore how we've helped brands
            grow through digital transformation.
          </p>
        </div>

        {/* ── Project Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isHovered={isHoverCapable && hoveredCard === project.id}
              setHoveredCard={setHoveredCard}
              sliderIndex={sliderIndexes[project.id] || 0}
              setSliderIndex={(val) => {
                if (typeof val === 'function') {
                  setSliderIndexes((prev) => ({
                    ...prev,
                    [project.id]: val(prev[project.id] || 0),
                  }));
                } else {
                  setSliderIndexes((prev) => ({ ...prev, [project.id]: val }));
                }
              }}
            />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="flex justify-center mt-10 sm:mt-14 lg:mt-16">
          <a
            href="#contact"
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 text-center"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 skew-x-12" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Your Project
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
            </span>
          </a>
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

export default Portfolio;