import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import api from '../../api/api';
import {
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
  FaHeadset,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaQuoteLeft,
  FaFilter,
} from 'react-icons/fa';

const fallbackTestimonials = [
  {
    id: 1,
    name: 'Samrawit Mulugeta',
    role: 'CEO, Samri Collection',
    content: 'They transformed our entire digital presence — from our e-commerce platform to the ERP system. Sales increased by 340% in just 6 months. Absolutely incredible team.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Nani Bekele',
    role: 'Owner, Nani Cafe',
    content: 'Our online reservations went through the roof after they built our website and ran our digital marketing. Professional, creative, and always on time.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Dawit Tadesse',
    role: 'Director, Elite Academy',
    content: 'The online exam management system they built handles thousands of students seamlessly. Their technical expertise is unmatched in Ethiopia.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Helen Girma',
    role: 'Marketing Manager, FreshRoast',
    content: 'Our social media engagement tripled and website traffic grew by 284% after partnering with them. They truly understand digital growth.',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'Yonas Alemu',
    role: 'Founder, HabeshaTech',
    content: 'From UI/UX design to full-stack development — they delivered a product that exceeded our expectations. Highly recommend for any tech project.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'Meron Teklu',
    role: 'COO, Addis Properties',
    content: 'The website they built for our real estate firm generates consistent leads every month. Their SEO strategy is pure gold.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
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
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${getGradient(id)} flex items-center justify-center border-2 border-white/10 flex-shrink-0`}>
      <span className="text-sm sm:text-base font-bold text-white">{getInitials(name)}</span>
    </div>
  );
}

function StarRating({ rating, size = 'md' }) {
  const sizeClasses = size === 'lg' ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4 sm:w-5 sm:h-5';
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`${sizeClasses} text-amber-400`} fill={star <= rating ? 'currentColor' : 'none'} viewBox="0 0 20 20" stroke={star <= rating ? 'none' : 'currentColor'} strokeWidth={1}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════
// TESTIMONIALS MODAL COMPONENT
// ═══════════════════════════════════════════
function TestimonialsModal({ isOpen, onClose, testimonials, isDark }) {
  const [filterRating, setFilterRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalPage, setModalPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter and search logic
  const filteredTestimonials = testimonials.filter((t) => {
    const matchesRating = filterRating === 'all' || t.rating.toString() === filterRating;
    const matchesSearch = searchQuery === '' || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTestimonials.length / itemsPerPage));
  const paginatedItems = filteredTestimonials.slice(
    modalPage * itemsPerPage,
    modalPage * itemsPerPage + itemsPerPage
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 backdrop-blur-md transition-all duration-500 ${
          isDark ? 'bg-black/80' : 'bg-black/50'
        }`}
        onClick={onClose}
        style={{ animation: 'fadeIn 0.3s ease-out' }}
      />

      {/* Modal Container */}
      <div 
        className={`relative w-full sm:max-w-5xl max-h-[95dvh] sm:max-h-[90vh] backdrop-blur-xl rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden ${
          isDark 
            ? 'bg-[#0a0a0f]/95 border border-white/[0.08]' 
            : 'bg-white/95 border border-gray-200'
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        
        {/* ── Gradient Header Bar ── */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 flex-shrink-0" />

        {/* ── Header Section ── */}
        <div className={`relative px-6 sm:px-8 py-5 sm:py-6 border-b flex-shrink-0 ${
          isDark ? 'border-white/[0.06] bg-[#0d0d15]/80' : 'border-gray-100 bg-gray-50/90'
        }`}>
          
          {/* Glow Effect */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 sm:w-60 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent`} />
          
          {/* Mobile Drag Handle */}
          <div className={`sm:hidden absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full ${isDark ? 'bg-white/25' : 'bg-gray-300'}`} />

          <div className="flex items-start sm:items-center justify-between gap-4">
            
            {/* Title & Stats */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-xl ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-100'}`}>
                  <FaQuoteLeft className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    All Client Reviews
                  </h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>
                    {testimonials.length} verified testimonials • 4.9 avg rating
                  </p>
                </div>
              </div>

              {/* Rating Pills */}
              <div className="hidden sm:flex items-center gap-2 mt-3">
                {['all', '5', '4'].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => { setFilterRating(rating); setModalPage(0); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                      filterRating === rating
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                        : isDark
                          ? 'bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/[0.08]'
                          : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {rating === 'all' ? 'All Stars' : `${rating}★+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 group ${
                isDark
                  ? 'text-neutral-500 hover:text-white hover:bg-white/[0.08] active:bg-white/[0.12]'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200'
              }`}
            >
              <FaTimes className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <FaFilter className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-neutral-600' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search by name, company, or keyword..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setModalPage(0); }}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all duration-300 text-sm ${
                isDark
                  ? 'bg-white/[0.03] border-white/[0.08] text-white placeholder-neutral-600 focus:border-emerald-500/50 focus:bg-white/[0.05]'
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100'
              }`}
            />
          </div>
        </div>

        {/* ── Content Area ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain scrollbar-thin">
          <div className="px-6 sm:px-8 py-6 sm:py-8">
            
            {/* Results Count */}
            <div className="flex items-center justify-between mb-5">
              <p className={`text-xs font-medium ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>
                Showing {filteredTestimonials.length} of {testimonials.length} reviews
              </p>
              
              {/* Mobile Filter */}
              <select
                value={filterRating}
                onChange={(e) => { setFilterRating(e.target.value); setModalPage(0); }}
                className={`sm:hidden px-3 py-1.5 rounded-lg text-xs font-medium border outline-none ${
                  isDark
                    ? 'bg-white/[0.05] border-white/[0.08] text-neutral-300'
                    : 'bg-gray-100 border-gray-200 text-gray-700'
                }`}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4+ Stars</option>
              </select>
            </div>

            {/* Testimonials Grid */}
            {filteredTestimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {paginatedItems.map((testimonial) => (
                  <TestimonialCardModal key={testimonial.id} testimonial={testimonial} isDark={isDark} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className={`flex flex-col items-center justify-center py-16 px-4 rounded-2xl border-2 border-dashed ${
                isDark ? 'border-white/[0.06]' : 'border-gray-200'
              }`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                  isDark ? 'bg-white/[0.04]' : 'bg-gray-100'
                }`}>
                  <FaQuoteLeft className={`w-7 h-7 ${isDark ? 'text-neutral-700' : 'text-gray-300'}`} />
                </div>
                <p className={`text-sm font-medium mb-1 ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                  No reviews found
                </p>
                <p className={`text-xs ${isDark ? 'text-neutral-600' : 'text-gray-400'}`}>
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setFilterRating('all'); }}
                  className={`mt-4 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    isDark
                      ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  }`}
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8 pt-6 border-t border-dashed"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
              >
                <button
                  onClick={() => setModalPage((prev) => Math.max(0, prev - 1))}
                  disabled={modalPage === 0}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 disabled:opacity-30 ${
                    isDark
                      ? 'border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/15 disabled:hover:border-white/[0.08]'
                      : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 disabled:hover:border-gray-200'
                  }`}
                >
                  <FaChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setModalPage(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        modalPage === i
                          ? 'bg-emerald-500 w-6'
                          : isDark
                            ? 'bg-white/15 hover:bg-white/25'
                            : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <span className={`text-xs tabular-nums min-w-[3rem] text-center ${isDark ? 'text-neutral-600' : 'text-gray-400'}`}>
                  {modalPage + 1}/{totalPages}
                </span>

                <button
                  onClick={() => setModalPage((prev) => Math.min(totalPages - 1, prev + 1))}
                  disabled={modalPage === totalPages - 1}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 disabled:opacity-30 ${
                    isDark
                      ? 'border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/15 disabled:hover:border-white/[0.08]'
                      : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 disabled:hover:border-gray-200'
                  }`}
                >
                  <FaChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer / CTA Bar ── */}
        <div className={`px-6 sm:px-8 py-4 sm:py-5 border-t flex-shrink-0 ${
          isDark ? 'border-white/[0.06] bg-[#0d0d15]/60' : 'border-gray-100 bg-gray-50/80'
        }`}>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <p className={`text-xs text-center sm:text-left flex-1 ${isDark ? 'text-neutral-600' : 'text-gray-400'}`}>
              Ready to join our success stories? Let's build something amazing together.
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="group relative w-full sm:w-auto px-6 py-3 text-sm font-bold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaRocket className="w-4 h-4" />
                Start Your Project
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Custom Animations for Modal */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════
// MODAL TESTIMONIAL CARD COMPONENT
// ═══════════════════════════════════════════
function TestimonialCardModal({ testimonial, isDark }) {
  const hasAvatar = testimonial.avatar && testimonial.avatar.trim() !== '';

  return (
    <div className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-500 hover:shadow-xl h-full flex flex-col ${
      isDark
        ? 'bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/[0.06] hover:border-emerald-500/20 hover:shadow-emerald-500/10'
        : 'bg-white backdrop-blur-sm border border-gray-200 hover:border-emerald-300 hover:shadow-emerald-500/10'
    }`}>
      
      {/* Quote Icon & Rating Row */}
      <div className="flex items-start justify-between mb-4">
        <svg className={`w-8 h-8 ${isDark ? 'text-emerald-500/15' : 'text-emerald-500/20'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <StarRating rating={testimonial.rating} size="sm" />
      </div>

      {/* Content */}
      <p className={`text-sm leading-relaxed mb-5 flex-1 line-clamp-4 group-hover:line-clamp-none transition-all duration-300 ${
        isDark ? 'text-neutral-300' : 'text-gray-600'
      }`}>
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Divider */}
      <div className={`pt-4 border-t ${isDark ? 'border-white/[0.06]' : 'border-gray-100'}`}>
        <div className="flex items-center gap-3">
          
          {/* Avatar */}
          {hasAvatar ? (
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${getGradient(testimonial.id)} items-center justify-center hidden`}>
                  <span className="text-sm font-bold text-white">{getInitials(testimonial.name)}</span>
                </div>
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 ${isDark ? 'border-[#0a0a0a]' : 'border-white'}`} />
            </div>
          ) : (
            <div className="relative">
              <DefaultAvatar name={testimonial.name} id={testimonial.id} />
              <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 ${isDark ? 'border-[#0a0a0a]' : 'border-white'}`} />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
            <p className={`text-xs truncate ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>{testimonial.role}</p>
          </div>

          {/* Verified Badge */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            testimonial.rating === 5 
              ? (isDark ? 'bg-amber-500/10' : 'bg-amber-50')
              : (isDark ? 'bg-emerald-500/10' : 'bg-emerald-50')
          }`}>
            <FaCheckCircle className={`w-4 h-4 ${
              testimonial.rating === 5 
                ? (isDark ? 'text-amber-400' : 'text-amber-500')
                : (isDark ? 'text-emerald-400' : 'text-emerald-500')
            }`} />
          </div>
        </div>
      </div>

      {/* Hover Accent */}
      <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
        isDark
          ? 'bg-gradient-to-bl from-emerald-500/10 to-transparent'
          : 'bg-gradient-to-bl from-emerald-500/5 to-transparent'
      }`} />
    </div>
  );
}

// ═══════════════════════════════════════════
// CAROUSEL TESTIMONIAL CARD (Original)
// ═══════════════════════════════════════════
function TestimonialCard({ testimonial, isDark }) {
  const hasAvatar = testimonial.avatar && testimonial.avatar.trim() !== '';

  return (
    <div className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-500 hover:shadow-xl h-full flex flex-col ${
      isDark
        ? 'bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/[0.06] hover:border-emerald-500/20 hover:shadow-emerald-500/5'
        : 'bg-white backdrop-blur-sm border border-gray-200 hover:border-emerald-300 hover:shadow-emerald-500/10'
    }`}>
      
      {/* Quote Icon */}
      <div className="mb-3 sm:mb-4">
        <svg className={`w-6 h-6 sm:w-8 sm:h-8 ${isDark ? 'text-emerald-500/20' : 'text-emerald-500/30'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Stars */}
      <StarRating rating={testimonial.rating} />

      {/* Content */}
      <p className={`mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300 flex-1 ${
        isDark ? 'text-neutral-400' : 'text-gray-600'
      }`}>
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Divider */}
      <div className={`mt-4 sm:mt-6 pt-4 sm:pt-5 border-t ${isDark ? 'border-white/[0.06]' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2.5 sm:gap-3">
          {hasAvatar ? (
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-white/10">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${getGradient(testimonial.id)} items-center justify-center border-2 border-white/10 hidden`}>
                  <span className="text-xs sm:text-sm font-bold text-white">{getInitials(testimonial.name)}</span>
                </div>
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 rounded-full border-2 ${isDark ? 'border-[#0a0a0a]' : 'border-white'}`} />
            </div>
          ) : (
            <div className="relative">
              <DefaultAvatar name={testimonial.name} id={testimonial.id} />
              <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 rounded-full border-2 ${isDark ? 'border-[#0a0a0a]' : 'border-white'}`} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className={`text-xs sm:text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonial.name}</h4>
            <p className={`text-[10px] sm:text-xs truncate ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>{testimonial.role}</p>
          </div>

          <div className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
            <svg className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      <div className={`absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 rounded-bl-xl sm:rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
        isDark
          ? 'bg-gradient-to-bl from-emerald-500/10 to-transparent'
          : 'bg-gradient-to-bl from-emerald-500/5 to-transparent'
      }`} />
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN TESTIMONIALS SECTION
// ═══════════════════════════════════════════
function Testimonials() {
  const { isDark } = useTheme();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const [perPage, setPerPage] = useState(1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartTime = useRef(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth < 640) setPerPage(1);
      else if (window.innerWidth < 1024) setPerPage(2);
      else setPerPage(3);
    };
    updatePerPage();
    window.addEventListener('resize', updatePerPage);
    return () => window.removeEventListener('resize', updatePerPage);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimony/');
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
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
  const currentItems = testimonials.slice(currentPage * perPage, currentPage * perPage + perPage);
  const count = currentItems.length;

  useEffect(() => {
    if (!loading && currentPage >= totalPages) setCurrentPage(0);
  }, [loading, totalPages, currentPage]);

  const goToPage = useCallback((page) => {
    if (isSliding || page === currentPage || page < 0 || page >= totalPages) return;
    setSlideDirection(page > currentPage ? 'right' : 'left');
    setIsSliding(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsSliding(false);
    }, 250);
  }, [isSliding, currentPage, totalPages]);

  const nextPage = () => goToPage((currentPage + 1) % totalPages);
  const prevPage = () => goToPage((currentPage - 1 + totalPages) % totalPages);

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

    if ((Math.abs(distance) > 50 || velocity > 0.3) && totalPages > 1) {
      if (distance > 0) nextPage();
      else prevPage();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (totalPages <= 1) return;
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'ArrowRight') nextPage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, nextPage, prevPage]);

  useEffect(() => {
    if (loading || totalPages <= 1) return;

    const interval = setInterval(() => {
      nextPage();
    }, 6000);

    return () => clearInterval(interval);
  }, [loading, totalPages, currentPage, nextPage]);

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
    <>
      <section id="testimonials" className={`relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 lg:pt-28 transition-colors duration-500 pb-10 ${
        isDark ? 'bg-[#030712]' : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50/30'
      }`}>
        
        {/* ══════════ BACKGROUND EFFECTS ══════════ */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          
          {/* Gradient Orbs */}
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
            
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm shadow-sm transition-all hover:scale-105 ${
              isDark 
                ? 'border-emerald-500/20 bg-emerald-500/[0.08] shadow-emerald-500/5' 
                : 'border-emerald-200 bg-white shadow-md shadow-emerald-100/50'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500" />
              </span>
              <FaStar className="w-4 h-4 text-amber-500" />
              <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                Client Reviews
              </span>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm animate-pulse-slow ${
              isDark 
                ? 'border-amber-500/20 bg-amber-500/[0.08] shadow-amber-500/5' 
                : 'border-orange-200 bg-orange-50 shadow-md shadow-orange-100/50'
            }`}>
              <FaFire className="w-3.5 h-3.5 text-orange-500" />
              <span className={`text-xs font-bold ${isDark ? 'text-amber-300' : 'text-orange-600'}`}>
                4.9 Average Rating
              </span>
            </div>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:scale-105 ${
              isDark ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <FaClock className="w-3.5 h-3.5 text-blue-500" />
              <span className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                24hr Response Time
              </span>
            </div>
          </div>

          {/* ── Two Column Layout ── */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* ═══ LEFT COLUMN: Content ═══ */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              
              <p className={`text-sm font-bold uppercase tracking-[0.25em] mb-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}
                style={{ transitionDelay: '100ms' }}
              >
                Trusted by Ethiopian Businesses
              </p>

              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              } ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ transitionDelay: '200ms' }}
              >
                What Our Clients{' '}
                <br className="hidden sm:block" />
                <span className="relative inline-block mt-1">
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Have to Say
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full opacity-40 blur-sm" />
                </span>
              </h1>

              <p className={`text-base sm:text-lg lg:text-xl max-w-lg leading-relaxed mb-8 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}
                style={{ transitionDelay: '300ms' }}
              >
                Don&apos;t just take our word for it — hear from the businesses we&apos;ve helped grow with{' '}
                <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>proven results</span>.
              </p>

              <div className={`flex flex-col sm:flex-row items-center gap-4 mb-10 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
                style={{ transitionDelay: '400ms' }}
              >
                
                {/* PRIMARY CTA - Opens Modal */}
                <button
                  onClick={() => setShowModal(true)}
                  className="group relative w-full sm:w-auto px-8 py-4 text-base font-bold text-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    <FaRocket className="w-5 h-5 group-hover:animate-bounce" />
                    View All {testimonials.length}+ Reviews
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <a href="#contact"
                  className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] ${
                    isDark 
                      ? 'text-white border-white/20 hover:border-white/40 hover:bg-white/[0.04] shadow-lg shadow-black/20' 
                      : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  Become a Client
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
                style={{ transitionDelay: '500ms' }}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                    <FaShieldAlt className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>Verified</span>
                </div>
                
                <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />
                
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}>
                    <FaGift className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  </div>
                  <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>Results Driven</span>
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
                
                <div className={`absolute -inset-4 rounded-3xl blur-2xl transition-colors duration-500 ${
                  isDark 
                    ? 'bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 opacity-60' 
                    : 'bg-gradient-to-r from-emerald-300/40 via-cyan-300/40 to-blue-300/40 opacity-80'
                }`} />

                <div className={`relative rounded-3xl overflow-hidden border-2 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] ${
                  isDark 
                    ? 'bg-gradient-to-b from-[#0f172a] to-[#020617] border-white/10 shadow-black/30' 
                    : 'bg-white border-gray-100 shadow-gray-200/50'
                }`}>
                  
                  <div className="h-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />

                  <div className="p-6 sm:p-8">
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-500/25">
                        <FaFire className="w-3.5 h-3.5 text-white animate-pulse" />
                        <span className="text-xs font-bold text-white tracking-wide">TOP RATED</span>
                      </div>
                      
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
                        ))}
                      </div>
                    </div>

                    <div className="text-center mb-6 pb-6 border-b-2 border-dashed"
                      style={{
                        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
                      }}
                    >
                      <div className="text-7xl sm:text-8xl font-black mb-2 bg-gradient-to-br from-emerald-300 via-green-400 to-teal-400 bg-clip-text text-transparent">
                        4.9
                      </div>
                      <p className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Out of 5 Stars
                      </p>
                      <p className={`text-sm ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>
                        Based on {testimonials.length}+ client reviews
                      </p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {[
                        { icon: FaCheckCircle, text: "Professional service delivery", color: "emerald" },
                        { icon: FaCheckCircle, text: "Results-driven approach", color: "blue" },
                        { icon: FaCheckCircle, text: "Expert technical team", color: "purple" },
                        { icon: FaCheckCircle, text: "Timely project completion", color: "pink" },
                        { icon: FaCheckCircle, text: "Excellent communication", color: "orange" },
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

                    {/* Card CTA - Opens Modal */}
                    <button
                      onClick={() => setShowModal(true)}
                      className="group relative w-full py-4 text-base font-bold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg block text-center"
                      style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                      
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <FaEnvelope className="w-5 h-5" />
                        View All Testimonials
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>

                    <p className={`text-center text-xs mt-4 font-medium ${isDark ? 'text-neutral-500' : 'text-gray-400'}`}>
                      ⚡ Join 15+ successful Ethiopian businesses
                    </p>
                  </div>
                </div>

                <div className={`absolute -top-3 -right-3 sm:top-2 sm:-right-6 px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm animate-bounce-slow transition-colors ${
                  isDark 
                    ? 'bg-[#0f172a]/90 border border-emerald-500/30' 
                    : 'bg-white/90 border border-emerald-200 shadow-emerald-100/50'
                }`}>
                  <div className="text-2xl font-black text-emerald-500">340%</div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>Sales Growth</div>
                </div>

                <div className={`absolute -bottom-3 -left-3 sm:bottom-2 sm:-left-6 px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm animate-bounce-slow-delayed transition-colors ${
                  isDark 
                    ? 'bg-[#0f172a]/90 border border-blue-500/30' 
                    : 'bg-white/90 border border-blue-200 shadow-blue-100/50'
                }`}
                  style={{ animationDelay: '1s' }}
                >
                  <div className="text-2xl font-black text-blue-500">15+</div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Happy Clients</div>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════ TESTIMONIALS CAROUSEL ══════════ */}
          {!loading && testimonials.length > 0 && (
            <div className="relative mt-16 sm:mt-24" ref={carouselRef}>
              <div className="overflow-hidden rounded-2xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className={`grid ${gridClass} gap-4 sm:gap-6 transition-all duration-250 ease-out ${
                  isSliding
                    ? slideDirection === 'right'
                      ? 'opacity-0 translate-x-6 sm:translate-x-8'
                      : 'opacity-0 -translate-x-6 sm:-translate-x-8'
                    : 'opacity-100 translate-x-0'
                }`}>
                  {currentItems.map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} isDark={isDark} />
                  ))}
                </div>
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
                  
                  <div className="flex items-center gap-2 order-2 sm:order-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToPage(i)}
                        disabled={isSliding}
                        aria-label={`Go to page ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                          i === currentPage
                            ? 'w-5 h-2 sm:w-6 sm:h-2 bg-emerald-500'
                            : `w-2 h-2 active:scale-125 ${
                                isDark
                                  ? 'bg-white/15 hover:bg-white/30 active:bg-white/40'
                                  : 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500'
                              }`
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 order-1 sm:order-2">
                    <button
                      onClick={prevPage}
                      disabled={isSliding}
                      aria-label="Previous testimonials"
                      className={`group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ${
                        isDark
                          ? 'border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06]'
                          : 'border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 shadow-sm'
                      }`}
                    >
                      <FaChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    </button>

                    <span className={`hidden sm:inline-flex items-center text-xs tabular-nums min-w-[3rem] justify-center ${isDark ? 'text-neutral-600' : 'text-gray-400'}`}>
                      {currentPage + 1}
                      <span className="mx-1">/</span>
                      {totalPages}
                    </span>

                    <button
                      onClick={nextPage}
                      disabled={isSliding}
                      aria-label="Next testimonials"
                      className={`group flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ${
                        isDark
                          ? 'border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06]'
                          : 'border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 shadow-sm'
                      }`}
                    >
                      <FaChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  </div>

                  <span className={`sm:hidden order-3 text-[10px] tabular-nums ${isDark ? 'text-neutral-700' : 'text-gray-400'}`}>
                    {currentPage + 1} / {totalPages}
                  </span>
                </div>
              )}

              {totalPages > 1 && (
                <p className={`sm:hidden flex items-center justify-center gap-1.5 mt-3 text-[10px] ${isDark ? 'text-neutral-700' : 'text-gray-400'}`}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                  Swipe to navigate
                </p>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`rounded-2xl p-5 sm:p-6 animate-pulse ${
                  isDark ? 'bg-[#0a0a0a]/60 border border-white/[0.06]' : 'bg-gray-100 border border-gray-200'
                }`}>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg mb-3 sm:mb-4 ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <div className="space-y-2 mb-5 sm:mb-6">
                    <div className={`h-3 rounded-full w-full ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />
                    <div className={`h-3 rounded-full w-5/6 ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />
                    <div className={`h-3 rounded-full w-4/6 ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />
                  </div>
                  <div className={`border-t pt-4 sm:pt-5 flex items-center gap-3 ${isDark ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                    <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />
                    <div className="flex-1">
                      <div className={`h-3 rounded-full w-20 sm:w-24 mb-2 ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />
                      <div className={`h-2.5 rounded-full w-28 sm:w-32 ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
          .animate-blob { animation: blob 8s ease-in-out infinite; }
          .animate-blob-delayed { animation: blob-delayed 10s ease-in-out infinite; }
          .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
          .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
          .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
          .animate-bounce-slow-delayed { animation: bounce-slow-delayed 3.5s ease-in-out infinite; }
        `}} />
      </section>

      {/* ══════════ TESTIMONIALS MODAL ══════════ */}
      <TestimonialsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        testimonials={testimonials}
        isDark={isDark}
      />
    </>
  );
}

export default Testimonials;