import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../../api/api';

const fallbackTestimonials = [
  {
    id: 1,
    name: 'Samrawit Mulugeta',
    role: 'CEO, Samri Collection',
    content:
      'They transformed our entire digital presence — from our e-commerce platform to the ERP system. Sales increased by 340% in just 6 months. Absolutely incredible team.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Nani Bekele',
    role: 'Owner, Nani Cafe',
    content:
      'Our online reservations went through the roof after they built our website and ran our digital marketing. Professional, creative, and always on time.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Dawit Tadesse',
    role: 'Director, Elite Academy',
    content:
      'The online exam management system they built handles thousands of students seamlessly. Their technical expertise is unmatched in Ethiopia.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Helen Girma',
    role: 'Marketing Manager, FreshRoast',
    content:
      'Our social media engagement tripled and website traffic grew by 284% after partnering with them. They truly understand digital growth.',
    rating: 4,
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Yonas Alemu',
    role: 'Founder, HabeshaTech',
    content:
      'From UI/UX design to full-stack development — they delivered a product that exceeded our expectations. Highly recommend for any tech project.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Meron Teklu',
    role: 'COO, Addis Properties',
    content:
      'The website they built for our real estate firm generates consistent leads every month. Their SEO strategy is pure gold.',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  },
];

const gradients = [
  'from-blue-600 to-purple-600',
  'from-purple-600 to-pink-600',
  'from-emerald-600 to-blue-600',
  'from-amber-600 to-orange-600',
  'from-pink-600 to-red-600',
  'from-cyan-600 to-blue-600',
];

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getGradient(id) {
  return gradients[(id || 0) % gradients.length];
}

function DefaultAvatar({ name, id }) {
  return (
    <div
      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br ${getGradient(
        id
      )} flex items-center justify-center border-2 border-white/10 flex-shrink-0`}
    >
      <span className="text-xs sm:text-sm font-bold text-white">
        {getInitials(name)}
      </span>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
            star <= rating ? 'text-amber-400' : 'text-neutral-700'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const hasAvatar = testimonial.avatar && testimonial.avatar.trim() !== '';

  return (
    <div className="group relative bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/[0.06] rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-500 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5 h-full flex flex-col">
      {/* Quote Icon */}
      <div className="mb-3 sm:mb-4">
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500/20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Stars */}
      <StarRating rating={testimonial.rating} />

      {/* Content */}
      <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300 flex-1">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Divider */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-white/[0.06]">
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Avatar or Initials */}
          {hasAvatar ? (
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-white/10">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-br ${getGradient(
                    testimonial.id
                  )} items-center justify-center border-2 border-white/10 hidden`}
                >
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {getInitials(testimonial.name)}
                  </span>
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]" />
            </div>
          ) : (
            <div className="relative">
              <DefaultAvatar name={testimonial.name} id={testimonial.id} />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
              {testimonial.name}
            </h4>
            <p className="text-[10px] sm:text-xs text-neutral-500 truncate">
              {testimonial.role}
            </p>
          </div>

          {/* Verified Badge */}
          <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover accent corner */}
      <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-xl sm:rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const [perPage, setPerPage] = useState(1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartTime = useRef(0);
  const carouselRef = useRef(null);

  // Responsive perPage
  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth < 640) {
        setPerPage(1);
      } else if (window.innerWidth < 1024) {
        setPerPage(2);
      } else {
        setPerPage(3);
      }
    };

    updatePerPage();
    window.addEventListener('resize', updatePerPage);
    return () => window.removeEventListener('resize', updatePerPage);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimony/');
        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setTestimonials(response.data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (err) {
        console.log('API failed, using fallback testimonials:', err.message);
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const totalPages = Math.max(1, Math.ceil(testimonials.length / perPage));
  const currentItems = testimonials.slice(
    currentPage * perPage,
    currentPage * perPage + perPage
  );
  const count = currentItems.length;

  // Reset page if it exceeds total after data loads or perPage changes
  useEffect(() => {
    if (!loading && currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [loading, totalPages, currentPage]);

  const goToPage = useCallback(
    (page) => {
      if (isSliding || page === currentPage || page < 0 || page >= totalPages)
        return;
      setSlideDirection(page > currentPage ? 'right' : 'left');
      setIsSliding(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsSliding(false);
      }, 250);
    },
    [isSliding, currentPage, totalPages]
  );

  const nextPage = () => goToPage((currentPage + 1) % totalPages);
  const prevPage = () =>
    goToPage((currentPage - 1 + totalPages) % totalPages);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const duration = Date.now() - touchStartTime.current;
    const velocity = Math.abs(distance) / duration;

    // Only trigger if swipe is fast enough or long enough
    if ((Math.abs(distance) > 50 || velocity > 0.3) && totalPages > 1) {
      if (distance > 0) {
        nextPage(); // swipe left → next
      } else {
        prevPage(); // swipe right → prev
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (totalPages <= 1) return;
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'ArrowRight') nextPage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, nextPage, prevPage]);

  // Auto-play
  useEffect(() => {
    if (loading || totalPages <= 1) return;

    const interval = setInterval(() => {
      nextPage();
    }, 6000);

    return () => clearInterval(interval);
  }, [loading, totalPages, currentPage, nextPage]);

  // Adaptive grid class
  const gridClass =
    count === 1
      ? 'grid-cols-1 max-w-md mx-auto'
      : count === 2
        ? perPage === 1
          ? 'grid-cols-1 max-w-md mx-auto'
          : 'sm:grid-cols-2 max-w-3xl mx-auto grid-cols-1'
        : perPage === 1
          ? 'grid-cols-1 max-w-md mx-auto'
          : perPage === 2
            ? 'sm:grid-cols-2 max-w-3xl mx-auto grid-cols-1'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section
      id="testimonials"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050505] pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20"
    >
      {/* ─── Background Effects ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-purple-600/[0.06] sm:bg-purple-600/8 rounded-full blur-[100px] sm:blur-[150px]" />
        <div className="absolute bottom-20 left-10 sm:bottom-40 sm:left-20 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] bg-blue-600/[0.06] sm:bg-blue-600/8 rounded-full blur-[80px] sm:blur-[120px]" />
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
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-purple-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-neutral-400">
              Client Reviews
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
            <span className="text-white">What Our Clients </span>
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Say
            </span>
          </h2>

          <p className="text-neutral-500 text-sm sm:text-base md:text-lg max-w-lg sm:max-w-xl leading-relaxed px-2">
            Don&apos;t just take our word for it — hear from the businesses
            we&apos;ve helped grow.
          </p>
        </div>

        {/* ── Loading State ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#0a0a0a]/60 border border-white/[0.06] rounded-xl sm:rounded-2xl p-5 sm:p-6 animate-pulse"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/5 rounded-lg mb-3 sm:mb-4" />
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div
                      key={s}
                      className="w-3 h-3 sm:w-4 sm:h-4 bg-white/5 rounded-full"
                    />
                  ))}
                </div>
                <div className="space-y-2 mb-5 sm:mb-6">
                  <div className="h-3 bg-white/5 rounded-full w-full" />
                  <div className="h-3 bg-white/5 rounded-full w-5/6" />
                  <div className="h-3 bg-white/5 rounded-full w-4/6" />
                </div>
                <div className="border-t border-white/[0.06] pt-4 sm:pt-5 flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/5 rounded-full" />
                  <div className="flex-1">
                    <div className="h-3 bg-white/5 rounded-full w-20 sm:w-24 mb-2" />
                    <div className="h-2.5 bg-white/5 rounded-full w-28 sm:w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Testimonials Carousel ── */}
        {!loading && testimonials.length > 0 && (
          <div className="relative" ref={carouselRef}>
            {/* Cards Container */}
            <div
              className="overflow-hidden rounded-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={`grid ${gridClass} gap-4 sm:gap-6 transition-all duration-250 ease-out ${
                  isSliding
                    ? slideDirection === 'right'
                      ? 'opacity-0 translate-x-6 sm:translate-x-8'
                      : 'opacity-0 -translate-x-6 sm:-translate-x-8'
                    : 'opacity-100 translate-x-0'
                }`}
              >
                {currentItems.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>

            {/* ── Navigation (only if more than 1 page) ── */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
                {/* Dot Indicators */}
                <div className="flex items-center gap-2 order-2 sm:order-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      disabled={isSliding}
                      aria-label={`Go to page ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentPage
                          ? 'w-5 h-2 sm:w-6 sm:h-2 bg-blue-500'
                          : 'w-2 h-2 bg-white/15 hover:bg-white/30 active:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Arrow Buttons */}
                <div className="flex items-center gap-3 order-1 sm:order-2">
                  <button
                    onClick={prevPage}
                    disabled={isSliding}
                    aria-label="Previous testimonials"
                    className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* Page counter between arrows (desktop only) */}
                  <span className="hidden sm:inline-flex items-center text-xs text-neutral-600 tabular-nums min-w-[3rem] justify-center">
                    {currentPage + 1}{' '}
                    <span className="mx-1 text-neutral-700">/</span>{' '}
                    {totalPages}
                  </span>

                  <button
                    onClick={nextPage}
                    disabled={isSliding}
                    aria-label="Next testimonials"
                    className="group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Mobile page counter */}
                <span className="sm:hidden order-3 text-[10px] text-neutral-600 tabular-nums">
                  {currentPage + 1} / {totalPages}
                </span>
              </div>
            )}

            {/* Swipe hint (mobile only, shown briefly) */}
            {totalPages > 1 && (
              <p className="sm:hidden flex items-center justify-center gap-1.5 mt-3 text-[10px] text-neutral-700">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
                Swipe to navigate
              </p>
            )}
          </div>
        )}

        {/* ── Stats Bar ── */}
        {!loading && (
          <div className="mt-12 sm:mt-14 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                value: '50+',
                label: 'Happy Clients',
                icon: 'solar:users-group-rounded-bold-duotone',
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
              },
              {
                value: '4.9/5',
                label: 'Avg. Rating',
                icon: 'solar:star-bold-duotone',
                color: 'text-amber-400',
                bg: 'bg-amber-500/10',
              },
              {
                value: '120+',
                label: 'Projects Done',
                icon: 'solar:folder-bold-duotone',
                color: 'text-purple-400',
                bg: 'bg-purple-500/10',
              },
              {
                value: '98%',
                label: 'Satisfaction',
                icon: 'solar:heart-bold-duotone',
                color: 'text-pink-400',
                bg: 'bg-pink-500/10',
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 sm:gap-4 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0a0a0a]/40 border border-white/[0.06] hover:border-white/10 hover:bg-[#0a0a0a]/60 active:scale-[0.98] transition-all duration-300"
              >
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <span
                    className={`iconify w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`}
                    data-icon={stat.icon}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-bold text-white truncate">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-neutral-500 truncate">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Bottom CTA ── */}
        {!loading && (
          <div className="flex flex-col items-center gap-3 sm:gap-4 mt-10 sm:mt-14">
            <p className="text-neutral-500 text-xs sm:text-sm">
              Ready to join our success stories?
            </p>
            <a
              href="#contact"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-white rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 text-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 skew-x-12" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started Today
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
        )}
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

export default Testimonials;