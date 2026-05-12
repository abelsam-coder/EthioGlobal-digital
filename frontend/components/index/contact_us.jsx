
import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import api from '../../api/api';
import {
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaTelegram,
  FaInstagram,
  FaArrowRight,
  FaClock,
  FaFire,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle,
  FaUsers,
  FaStar,
  FaRocket,
  FaHeart,
  FaThumbsUp,
  FaChartLine,
} from 'react-icons/fa';

const contactInfo = [
  {
    id: 'phone',
    label: 'Phone',
    value: '+251 912 345 678',
    href: 'tel:+251912345678',
    icon: <FaPhone className="w-4 h-4 sm:w-5 sm:h-5" />,
    color: 'emerald',
  },
  {
    id: 'email',
    label: 'Email',
    value: 'info@agency.com',
    href: 'mailto:info@agency.com',
    icon: <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5" />,
    color: 'blue',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: '@agency_support',
    href: 'https://t.me/agency_support',
    icon: <FaTelegram className="w-4 h-4 sm:w-5 sm:h-5" />,
    color: 'sky',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@agency.eth',
    href: 'https://instagram.com/agency.eth',
    icon: <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />,
    color: 'pink',
  },
];

function Contact() {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSending(true);
    setServerError('');
    setSuccess(false);

    try {
      await api.post('/feedback/', {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      console.log('Feedback API failed:', err.message);
      setServerError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact"
      className={`relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 lg:pt-28 transition-colors duration-500 pb-10 ${
        isDark ? 'bg-[#030712]' : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50/30'
      }`}
    >
      
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
            <FaHeadset className="w-4 h-4 text-blue-500" />
            <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
              Available 24/7
            </span>
          </div>

          {/* Fast Response Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm animate-pulse-slow ${
            isDark 
              ? 'border-red-500/20 bg-red-500/[0.08] shadow-red-500/5' 
              : 'border-orange-200 bg-orange-50 shadow-md shadow-orange-100/50'
          }`}>
            <FaFire className="w-3.5 h-3.5 text-orange-500" />
            <span className={`text-xs font-bold ${isDark ? 'text-red-300' : 'text-orange-600'}`}>
              2hr Response Time
            </span>
          </div>

          {/* Free Consultation Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:scale-105 ${
            isDark ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-white shadow-sm'
          }`}>
            <FaClock className="w-3.5 h-3.5 text-blue-500" />
            <span className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
              Free Consultation
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
              Get In Touch
            </p>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } ${isDark ? 'text-white' : 'text-gray-900'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Let&apos;s Start Your{' '}
              <br className="hidden sm:block" />
              <span className="relative inline-block mt-1">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Project
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
              Have a project in mind? Reach out through any channel — we typically respond within{' '}
              <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>2 hours</span>.
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
                  Send a Message
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              {/* Secondary CTA */}
              <a href="tel:+251957576652"
                className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] ${
                  isDark 
                    ? 'text-white border-white/20 hover:border-white/40 hover:bg-white/[0.04] shadow-lg shadow-black/20' 
                    : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-md'
                }`}
              >
                <FaPhone className="w-4 h-4" />
                Call Us Now
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
                <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>Secure</span>
              </div>
              
              <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />
              
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}>
                  <FaStar className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                </div>
                <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>Free Quote</span>
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
          <div id="contact-form" className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="relative max-w-lg mx-auto">
              
              {/* Background Glow */}
              <div className={`absolute -inset-4 rounded-3xl blur-2xl transition-colors duration-500 ${
                isDark 
                  ? 'bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 opacity-60' 
                  : 'bg-gradient-to-r from-emerald-300/40 via-cyan-300/40 to-blue-300/40 opacity-80'
              }`} />

              {/* Main Card */}
              <div className={`relative rounded-3xl overflow-hidden border-2 shadow-2xl transition-all duration-500 hover:shadow-3xl ${
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
                      <span className="text-xs font-bold text-white tracking-wide">FAST RESPONSE</span>
                    </div>
                    
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
                      ))}
                    </div>
                  </div>

                  {/* Form Header */}
                  <div className="text-center mb-6 pb-6 border-b-2 border-dashed"
                    style={{
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
                    }}
                  >
                    <div className="text-5xl sm:text-6xl font-black mb-2 bg-gradient-to-br from-emerald-300 via-green-400 to-teal-400 bg-clip-text text-transparent">
                      2hr
                    </div>
                    <p className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Average Response Time
                    </p>
                    <p className={`text-sm ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>
                      We reply faster than anyone in Ethiopia
                    </p>
                  </div>

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Name Field */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>
                          Name
                        </label>
                        <div className={`relative rounded-xl border transition-all duration-300 ${
                          errors.name
                            ? 'border-red-500/40 bg-red-500/[0.03]'
                            : focusedField === 'name'
                              ? isDark
                                ? 'border-emerald-500/30 bg-emerald-500/[0.03]'
                                : 'border-emerald-400 bg-emerald-50/50'
                              : isDark
                                ? 'border-white/[0.08] bg-white/[0.02]'
                                : 'border-gray-200 bg-gray-50/50'
                        }`}>
                          <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <svg className={`w-4 h-4 ${errors.name ? 'text-red-400' : focusedField === 'name' ? 'text-emerald-500' : isDark ? 'text-neutral-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                            </svg>
                          </div>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full bg-transparent text-sm py-3 pl-9 pr-3 outline-none rounded-xl placeholder-${isDark ? 'neutral-600' : 'gray-400'} ${isDark ? 'text-white' : 'text-gray-900'}`}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-[10px] text-red-400 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>
                          Email
                        </label>
                        <div className={`relative rounded-xl border transition-all duration-300 ${
                          errors.email
                            ? 'border-red-500/40 bg-red-500/[0.03]'
                            : focusedField === 'email'
                              ? isDark
                                ? 'border-emerald-500/30 bg-emerald-500/[0.03]'
                                : 'border-emerald-400 bg-emerald-50/50'
                              : isDark
                                ? 'border-white/[0.08] bg-white/[0.02]'
                                : 'border-gray-200 bg-gray-50/50'
                        }`}>
                          <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <svg className={`w-4 h-4 ${errors.email ? 'text-red-400' : focusedField === 'email' ? 'text-emerald-500' : isDark ? 'text-neutral-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@email.com"
                            value={form.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full bg-transparent text-sm py-3 pl-9 pr-3 outline-none rounded-xl placeholder-${isDark ? 'neutral-600' : 'gray-400'} ${isDark ? 'text-white' : 'text-gray-900'}`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-[10px] text-red-400 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>
                        Message
                      </label>
                      <div className={`relative rounded-xl border transition-all duration-300 ${
                        errors.message
                          ? 'border-red-500/40 bg-red-500/[0.03]'
                          : focusedField === 'message'
                            ? isDark
                              ? 'border-emerald-500/30 bg-emerald-500/[0.03]'
                              : 'border-emerald-400 bg-emerald-50/50'
                            : isDark
                              ? 'border-white/[0.08] bg-white/[0.02]'
                              : 'border-gray-200 bg-gray-50/50'
                      }`}>
                        <div className="absolute left-3 top-3">
                          <svg className={`w-4 h-4 ${errors.message ? 'text-red-400' : focusedField === 'message' ? 'text-emerald-500' : isDark ? 'text-neutral-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                          </svg>
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          placeholder="Tell us about your project..."
                          value={form.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-transparent text-sm py-3 pl-9 pr-3 outline-none rounded-xl resize-none placeholder-${isDark ? 'neutral-600' : 'gray-400'} ${isDark ? 'text-white' : 'text-gray-900'}`}
                        />
                      </div>
                      {errors.message && (
                        <p className="text-[10px] text-red-400 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                          </svg>
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Server Error */}
                    {serverError && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/[0.05] border border-red-500/20">
                        <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <p className="text-xs text-red-400">{serverError}</p>
                      </div>
                    )}

                    {/* Success Message */}
                    {success && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                          <FaCheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-emerald-400">Message sent successfully!</p>
                          <p className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>We'll get back to you within 2 hours.</p>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={sending}
                      className="group relative w-full py-4 text-base font-bold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                      
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {sending ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="w-5 h-5" />
                            Send Message
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>

                    {/* Privacy Note */}
                    <p className={`text-center text-[10px] ${isDark ? 'text-neutral-700' : 'text-gray-400'}`}>
                      🔒 We never share your data. Secure & private.
                    </p>
                  </form>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className={`absolute -top-3 -right-3 sm:top-2 sm:-right-6 px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm animate-bounce-slow transition-colors ${
                isDark 
                  ? 'bg-[#0f172a]/90 border border-emerald-500/30' 
                  : 'bg-white/90 border border-emerald-200 shadow-emerald-100/50'
              }`}>
                <div className="text-2xl font-black text-emerald-500">2hr</div>
                <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>Response</div>
              </div>

              <div className={`absolute -bottom-3 -left-3 sm:bottom-2 sm:-left-6 px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm animate-bounce-slow-delayed transition-colors ${
                isDark 
                  ? 'bg-[#0f172a]/90 border border-blue-500/30' 
                  : 'bg-white/90 border border-blue-200 shadow-blue-100/50'
              }`}
                style={{ animationDelay: '1s' }}
              >
                <div className="text-2xl font-black text-blue-500">100%</div>
                <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Free Quote</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ CONTACT INFO CARDS ══════════ */}
        <div className={`mt-16 sm:mt-24 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info) => (
              <a
                key={info.id}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group flex items-center gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] ${
                  isDark
                    ? `bg-[#0a0a0a]/40 border border-white/[0.06] hover:border-${info.color}-500/20 hover:bg-[#0a0a0a]/60`
                    : `bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm`
                }`}
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                  isDark ? `bg-${info.color}-500/10` : `bg-${info.color}-50`
                }`}>
                  <span className={`text-${info.color}-500`}>{info.icon}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider ${isDark ? 'text-neutral-600' : 'text-gray-500'}`}>
                    {info.label}
                  </p>
                  <p className={`text-sm sm:text-base font-semibold truncate transition-colors ${
                    isDark
                      ? `text-${info.color}-400 group-hover:text-white`
                      : `text-${info.color}-600 group-hover:text-gray-900`
                  }`}>
                    {info.value}
                  </p>
                </div>
                <svg className={`w-4 h-4 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 ${
                  isDark ? 'text-neutral-700 group-hover:text-neutral-400' : 'text-gray-400 group-hover:text-gray-600'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ══════════ BOTTOM STATS BAR ══════════ */}
        <div className={`mt-16 sm:mt-24 pt-8 border-t-2 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
          style={{ 
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
            transitionDelay: '700ms'
          }}
        >
         
        </div>
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
  );
}

export default Contact;
