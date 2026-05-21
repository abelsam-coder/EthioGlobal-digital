import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import api from '../../api/api';
import {
  FaStar,
  FaArrowRight,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaRocket,
  FaPlus,
  FaTimes,
  FaCheck,
} from 'react-icons/fa';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-4 h-4 text-yellow-400"
          fill={star <= rating ? 'currentColor' : 'none'}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Interactive Star Rating for Form
function InteractiveStarRating({ rating, setRating }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="transition-transform duration-200 hover:scale-125 focus:outline-none"
        >
          <svg
            className={'w-8 h-8 transition-colors duration-200 ' + ((hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300')}
            fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
            viewBox="0 0 20 20"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
      {rating > 0 && (
        <span className={'ml-2 text-sm font-medium ' + (rating >= 4 ? 'text-green-500' : 'text-yellow-600')}>
          {rating}/5
        </span>
      )}
    </div>
  );
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(function(word) { return word[0]; }).join('').toUpperCase().slice(0, 2);
}

// Review Form Modal Component
function ReviewModal({ isOpen, onClose, isDark, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(function(prev) {
      return { ...prev, [name]: value };
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors(function(prev) {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  function validateForm() {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.content.trim()) newErrors.content = 'Review content is required';
    else if (formData.content.trim().length < 10) newErrors.content = 'Content must be at least 10 characters';
    if (formData.rating === 0) newErrors.rating = 'Please select a rating';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('access');
      await api.post('/testimony/', {
        name: formData.name,
        role: formData.role,
        content: formData.content,
        rating: formData.rating,
      }, {
        headers: { Authorization: 'Bearer ' + token },
      });

      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(function() {
        setSubmitSuccess(false);
        setFormData({ name: '', role: '', content: '', rating: 0 });
        onSubmit(); // Refresh testimonials list
        onClose();
      }, 2000);

    } catch (err) {
      console.error('Error submitting review:', err);
      setErrors({ submit: 'Failed to submit review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className={
        'relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl transform transition-all duration-300 scale-100 ' +
        (isDark 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10' 
          : 'bg-white border border-gray-100'
        )
      }>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={
            'absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ' +
            (isDark 
              ? 'text-neutral-400 hover:text-white hover:bg-white/10' 
              : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
            )
          }
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Success State */}
        {submitSuccess ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <FaCheck className="w-10 h-10 text-green-500" />
            </div>
            <h3 className={'text-2xl font-bold mb-2 ' + (isDark ? 'text-white' : 'text-gray-900')}>
              Thank You! 🎉
            </h3>
            <p className={isDark ? 'text-neutral-400' : 'text-gray-500'}>
              Your review has been submitted successfully.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 text-purple-400 border border-purple-500/20">
                <FaQuoteLeft className="w-3 h-3" />
                Write a Review
              </div>
              <h3 className={'text-2xl font-bold ' + (isDark ? 'text-white' : 'text-gray-900')}>
                Share Your Experience
              </h3>
              <p className={'mt-2 text-sm ' + (isDark ? 'text-neutral-400' : 'text-gray-500')}>
                Help others by sharing your story
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name Field */}
              <div>
                <label className={'block text-sm font-medium mb-2 ' + (isDark ? 'text-neutral-300' : 'text-gray-700')}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Sara Tesfaye"
                  className={
                    'w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
                    (errors.name 
                      ? 'border-red-400 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10' 
                      : isDark 
                        ? 'border-white/10 bg-white/[0.04] text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-gray-900'
                        : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
                    )
                  }
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Role Field */}
              <div>
                <label className={'block text-sm font-medium mb-2 ' + (isDark ? 'text-neutral-300' : 'text-gray-700')}>
                  Role / Company *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g., CEO, TechStart"
                  className={
                    'w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
                    (errors.role 
                      ? 'border-red-400 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10' 
                      : isDark 
                        ? 'border-white/10 bg-white/[0.04] text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-gray-900'
                        : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
                    )
                  }
                />
                {errors.role && (
                  <p className="mt-1 text-xs text-red-500">{errors.role}</p>
                )}
              </div>

              {/* Rating Field */}
              <div>
                <label className={'block text-sm font-medium mb-3 ' + (isDark ? 'text-neutral-300' : 'text-gray-700')}>
                  Your Rating *
                </label>
                <InteractiveStarRating 
                  rating={formData.rating} 
                  setRating={function(rating) {
                    setFormData(function(prev) { return { ...prev, rating: rating }; });
                    if (errors.rating) {
                      setErrors(function(prev) {
                        const newErrors = { ...prev };
                        delete newErrors.rating;
                        return newErrors;
                      });
                    }
                  }} 
                />
                {errors.rating && (
                  <p className="mt-1 text-xs text-red-500">{errors.rating}</p>
                )}
              </div>

              {/* Content Field */}
              <div>
                <label className={'block text-sm font-medium mb-2 ' + (isDark ? 'text-neutral-300' : 'text-gray-700')}>
                  Your Review *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Tell us about your experience..."
                  rows="4"
                  maxLength="500"
                  className={
                    'w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
                    (errors.content 
                      ? 'border-red-400 focus:ring-red-500/20 bg-red-50/50 dark:bg-red-900/10' 
                      : isDark 
                        ? 'border-white/10 bg-white/[0.04] text-white placeholder-neutral-500 focus:border-blue-500 focus:ring-blue-500/20 focus:ring-offset-gray-900'
                        : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20'
                    )
                  }
                ></textarea>
                <div className="flex justify-between mt-1">
                  {errors.content && (
                    <p className="text-xs text-red-500">{errors.content}</p>
                  )}
                  <p className={'text-xs ml-auto ' + (isDark ? 'text-neutral-500' : 'text-gray-400')}>
                    {formData.content.length}/500
                  </p>
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-500 text-center">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={
                  'w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 ' +
                  (isSubmitting 
                    ? 'bg-gray-400' 
                    : 'bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-600 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40'
                  )
                }
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaPlus className="w-4 h-4" />
                    Submit Review
                  </span>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial, isDark }) {
  const hasAvatar = testimonial.avatar && testimonial.avatar.trim() !== '';
  
  let cardBg = 'relative group rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ';
  let quoteColor = 'mb-4 ';
  let contentColor = 'text-sm leading-relaxed mb-4 min-h-[60px] ';
  let borderColor = 'flex items-center gap-3 mt-5 pt-4 border-t ';

  if (isDark) {
    cardBg += 'bg-white/[0.04] border border-white/[0.06]';
    quoteColor += 'text-blue-400/30';
    contentColor += 'text-neutral-300';
    borderColor += 'border-t-white/[0.06]';
  } else {
    cardBg += 'bg-white/80 border border-gray-100/50 shadow-xl shadow-gray-200/50';
    quoteColor += 'text-blue-500/40';
    contentColor += 'text-gray-600';
    borderColor += 'border-t-gray-100/80';
  }

  return (
    <div className={cardBg}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className={quoteColor}>
        <FaQuoteLeft className="w-8 h-8" />
      </div>

      <p className={contentColor}>
        "{testimonial.content}"
      </p>

      <StarRating rating={testimonial.rating} />

      <div className={borderColor}>
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 ring-2 ring-offset-2 flex-shrink-0 overflow-hidden">
          {hasAvatar ? (
            <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
              {getInitials(testimonial.name)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0 ml-3">
          <h4 className={'text-sm font-semibold truncate ' + (isDark ? 'text-white' : 'text-gray-900')}>
            {testimonial.name}
          </h4>
          <p className={'text-xs truncate ' + (isDark ? 'text-neutral-500' : 'text-gray-500')}>
            {testimonial.role}
          </p>
        </div>

        <div className="ml-auto px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Verified
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { isDark } = useTheme();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const perPage = 3;

  useEffect(function() {
    var timer = setTimeout(function() { setIsVisible(true); }, 100);
    return function() { clearTimeout(timer); };
  }, []);

  async function fetchTestimonials() {
    try {
      var token = localStorage.getItem('access');
      var response = await api.get('/testimony/', {
        headers: { Authorization: 'Bearer ' + token },
      });

      if (response.data) {
        var data = Array.isArray(response.data) ? response.data : response.data.results;
        setTestimonials(data.length > 0 ? data : fallbackData);
      } else {
        setTestimonials(fallbackData);
      }
    } catch (err) {
      console.error(err);
      setTestimonials(fallbackData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(function() {
    fetchTestimonials();
  }, []);

  // Refresh testimonials after submitting new one
  function handleReviewSubmitted() {
    setLoading(true);
    setCurrentPage(0);
    fetchTestimonials();
  }

  var totalPages = Math.max(1, Math.ceil(testimonials.length / perPage));
  var currentItems = testimonials.slice(currentPage * perPage, currentPage * perPage + perPage);

  function goToPage(page) {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  }

  var fallbackData = [
    { id: 1, name: 'Sara Tesfaye', role: 'CEO, TechStart', content: 'Amazing service! Highly recommended!', rating: 5 },
    { id: 2, name: 'Dawit Haile', role: 'Founder', content: 'Professional team, great results!', rating: 5 },
    { id: 3, name: 'Meron Alemayehu', role: 'Marketing Manager', content: 'Outstanding work!', rating: 4 },
    { id: 4, name: 'Yonas Bekele', role: 'Owner', content: 'Incredible results!', rating: 5 },
    { id: 5, name: 'Hanna Tadesse', role: 'Director', content: 'Highly recommended!', rating: 5 },
  ];

  return (
    <section id="testimonials" className="relative py-20 sm:py-28 bg-transparent overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={'text-center mb-16 transition-all duration-700 ' + (isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          
          <div className={
            'inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6 ' +
            (isDark 
              ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-blue-300 border border-blue-500/20 shadow-lg shadow-blue-500/5' 
              : 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-blue-700 border border-pink-200 shadow-lg'
            )
          }>
            <FaStar className="w-4 h-4" />
            Client Reviews
          </div>

          <h2 className={
            'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 ' +
            (isDark ? 'text-white' : 'text-gray-900')
          }>
            What Our Clients{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Say</span>
          </h2>

          <p className={'text-lg max-w-2xl mx-auto ' + (isDark ? 'text-neutral-400' : 'text-gray-600')}>
            Real stories from Ethiopian businesses
          </p>
        </div>

        {/* Stats */}
        <div className={
          'flex flex-wrap items-center justify-center gap-8 sm:gap-16 mb-16 transition-all duration-700 delay-150 ' +
          (isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')
        }>
          <div className="text-center">
            <div className={'text-3xl sm:text-4xl font-black ' + (isDark ? 'text-white' : 'text-gray-900')}>150+</div>
            <div className={'text-xs font-medium mt-1 uppercase tracking-wider ' + (isDark ? 'text-neutral-500' : 'text-gray-500')}>Happy Clients</div>
          </div>

          <div className="hidden sm:block w-px h-14 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>

          <div className="text-center">
            <FaStar className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <div className={'text-3xl sm:text-4xl font-black ' + (isDark ? 'text-white' : 'text-gray-900')}>4.9</div>
            <div className={'text-xs font-medium mt-1 uppercase tracking-wider ' + (isDark ? 'text-neutral-500' : 'text-gray-500')}>Rating</div>
          </div>

          <div className="hidden sm:block w-px h-14 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>

          <div className="text-center">
            <div className={'text-3xl sm:text-4xl font-black ' + (isDark ? 'text-white' : 'text-gray-900')}>98%</div>
            <div className={'text-xs font-medium mt-1 uppercase tracking-wider ' + (isDark ? 'text-neutral-500' : 'text-gray-500')}>Satisfaction</div>
          </div>
        </div>

        {/* Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map(function(t) {
              return <TestimonialCard key={t.id} testimonial={t} isDark={isDark} />;
            })}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(function(i) {
              return (
                <div key={i} className={'rounded-2xl p-6 animate-pulse ' + (isDark ? 'bg-white/[0.04]' : 'bg-gray-100')}>
                  <div className={'h-6 w-12 rounded mb-4 ' + (isDark ? 'bg-white/[0.06]' : 'bg-gray-200')}></div>
                  <div className={'h-4 w-full rounded mb-2 ' + (isDark ? 'bg-white/[0.04]' : 'bg-gray-200')}></div>
                  <div className={'h-4 w-3/4 rounded mb-4 ' + (isDark ? 'bg-white/[0.04]' : 'bg-gray-200')}></div>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(function(s) {
                      return <div key={s} className={'h-4 w-4 rounded ' + (isDark ? 'bg-white/[0.04]' : 'bg-gray-200')}></div>;
                    })}
                  </div>
                  <div className={'flex items-center gap-3 pt-4 border-t ' + (isDark ? 'border-white/[0.04]' : 'border-gray-200')}>
                    <div className={'w-12 h-12 rounded-full ' + (isDark ? 'bg-white/[0.06]' : 'bg-gray-200')}></div>
                    <div>
                      <div className={'h-4 w-24 rounded mb-1 ' + (isDark ? 'bg-white/[0.04]' : 'bg-gray-200')}></div>
                      <div className={'h-3 w-16 rounded ' + (isDark ? 'bg-white/[0.04]' : 'bg-gray-200')}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Navigation */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className={
                'w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 ' +
                (isDark 
                  ? 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06]' 
                  : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                )
              }
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map(function(_, i) {
                var dotClass = 'rounded-full transition-all duration-300 hover:scale-110 cursor-pointer ';
                if (i === currentPage) {
                  dotClass += 'w-8 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500';
                } else if (isDark) {
                  dotClass += 'w-2 h-2 bg-white/15 hover:bg-white/25';
                } else {
                  dotClass += 'w-2 h-2 bg-gray-300 hover:bg-gray-400';
                }
                return <button key={i} onClick={() => goToPage(i)} className={dotClass}></button>;
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={
                'w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 ' +
                (isDark 
                  ? 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06]' 
                  : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                )
              }
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* CTA Buttons */}
        <div className={
          'text-center mt-16 transition-all duration-700 delay-300 ' +
          (isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')
        }>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"
            >
              <FaRocket className="w-5 h-5" />
              Get Started
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={() => setShowReviewModal(true)}
              className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-violet-500/25 hover:shadow-2xl hover:shadow-violet-500/40 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-600"
            >
              <FaPlus className="w-5 h-5" />
              Write a Review
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

      {/* Review Modal */}
      <ReviewModal 
        isOpen={showReviewModal} 
        onClose={() => setShowReviewModal(false)} 
        isDark={isDark}
        onSubmit={handleReviewSubmitted}
      />

    </section>
  );
}