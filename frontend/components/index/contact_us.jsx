import { useState } from 'react';
import api from '../../api/api';

const contactInfo = [
  {
    id: 'phone',
    label: 'Phone',
    value: '+251 912 345 678',
    href: 'tel:+251912345678',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    borderHover: 'hover:border-emerald-500/20',
    shadowHover: 'hover:shadow-emerald-500/5',
  },
  {
    id: 'email',
    label: 'Email',
    value: 'info@agency.com',
    href: 'mailto:info@agency.com',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    borderHover: 'hover:border-blue-500/20',
    shadowHover: 'hover:shadow-blue-500/5',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: '@agency_support',
    href: 'https://t.me/agency_support',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    borderHover: 'hover:border-sky-500/20',
    shadowHover: 'hover:shadow-sky-500/5',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@agency.eth',
    href: 'https://instagram.com/agency.eth',
    icon: (
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    borderHover: 'hover:border-pink-500/20',
    shadowHover: 'hover:shadow-pink-500/5',
  },
];

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

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
      setServerError(
        'Something went wrong. Please try again or contact us directly.'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050505] pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20"
    >
      {/* ─── Background Effects ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-blue-600/[0.06] sm:bg-blue-600/8 rounded-full blur-[80px] sm:blur-[120px] lg:blur-[150px]" />
        <div className="absolute bottom-10 right-5 w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] lg:w-[400px] lg:h-[400px] bg-purple-600/[0.06] sm:bg-purple-600/8 rounded-full blur-[70px] sm:blur-[100px] lg:blur-[120px]" />
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
        <div className="grid lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-16">
          {/* ═══════════════════════════════════════
              LEFT COLUMN — Info & Contact Details
              ═══════════════════════════════════════ */}
          <div className="lg:col-span-2 flex flex-col gap-6 sm:gap-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm w-fit">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500" />
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-neutral-400">
                Available 24/7
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.1]">
              <span className="text-white">Let&apos;s </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Talk
              </span>
            </h2>

            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              Have a project in mind or just want to say hello? Reach out through
              any channel — we typically respond within 2 hours.
            </p>

            {/* Contact Info Cards */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {contactInfo.map((info) => (
                <a
                  key={info.id}
                  href={info.href}
                  target={
                    info.href.startsWith('http') ? '_blank' : undefined
                  }
                  rel={
                    info.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-[#0a0a0a]/40 border border-white/[0.06] ${info.borderHover} ${info.shadowHover} hover:shadow-lg transition-all duration-300`}
                >
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl ${info.bg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <span className={info.color}>{info.icon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-medium text-neutral-600 uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p
                      className={`text-xs sm:text-sm font-medium ${info.color} truncate transition-colors duration-300 group-hover:text-white`}
                    >
                      {info.value}
                    </p>
                  </div>
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-700 flex-shrink-0 transition-all duration-300 group-hover:text-neutral-400 group-hover:translate-x-0.5"
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
                </a>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════
              RIGHT COLUMN — Contact Form
              ═══════════════════════════════════════ */}
          <div className="lg:col-span-3">
            <div className="relative bg-[#0a0a0a]/50 backdrop-blur-sm border border-white/[0.06] rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10">
              {/* Form glow */}
              <div className="absolute -top-16 sm:-top-20 -right-16 sm:-right-20 w-40 h-40 sm:w-60 sm:h-60 bg-blue-500/5 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-16 sm:-bottom-20 -left-16 sm:-left-20 w-40 h-40 sm:w-60 sm:h-60 bg-purple-500/5 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none" />

              <form
                onSubmit={handleSubmit}
                className="relative z-10 flex flex-col gap-5 sm:gap-6"
                noValidate
              >
                {/* Form Header */}
                <div className="mb-1 sm:mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-0.5 sm:mb-1">
                    Send us a message
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    Fill out the form and we&apos;ll get back to you shortly.
                  </p>
                </div>

                {/* ── Name & Email Row ── */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Name Field */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="name"
                      className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-wider"
                    >
                      Name
                    </label>
                    <div
                      className={`relative rounded-lg sm:rounded-xl border transition-all duration-300 ${
                        errors.name
                          ? 'border-red-500/40 bg-red-500/[0.03]'
                          : focusedField === 'name'
                            ? 'border-blue-500/30 bg-blue-500/[0.03]'
                            : 'border-white/[0.08] bg-white/[0.02]'
                      }`}
                    >
                      <div className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2">
                        <svg
                          className={`w-4 h-4 ${errors.name ? 'text-red-400' : focusedField === 'name' ? 'text-blue-400' : 'text-neutral-600'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0"
                          />
                        </svg>
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent text-sm text-white placeholder-neutral-600 py-3 pl-9 sm:pl-10 pr-3 sm:pr-4 outline-none rounded-lg sm:rounded-xl"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-[10px] sm:text-xs text-red-400 flex items-center gap-1">
                        <svg
                          className="w-3 h-3 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-wider"
                    >
                      Email
                    </label>
                    <div
                      className={`relative rounded-lg sm:rounded-xl border transition-all duration-300 ${
                        errors.email
                          ? 'border-red-500/40 bg-red-500/[0.03]'
                          : focusedField === 'email'
                            ? 'border-blue-500/30 bg-blue-500/[0.03]'
                            : 'border-white/[0.08] bg-white/[0.02]'
                      }`}
                    >
                      <div className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2">
                        <svg
                          className={`w-4 h-4 ${errors.email ? 'text-red-400' : focusedField === 'email' ? 'text-blue-400' : 'text-neutral-600'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent text-sm text-white placeholder-neutral-600 py-3 pl-9 sm:pl-10 pr-3 sm:pr-4 outline-none rounded-lg sm:rounded-xl"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[10px] sm:text-xs text-red-400 flex items-center gap-1">
                        <svg
                          className="w-3 h-3 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Message Field ── */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-[10px] sm:text-xs font-medium text-neutral-500 uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <div
                    className={`relative rounded-lg sm:rounded-xl border transition-all duration-300 ${
                      errors.message
                        ? 'border-red-500/40 bg-red-500/[0.03]'
                        : focusedField === 'message'
                          ? 'border-blue-500/30 bg-blue-500/[0.03]'
                          : 'border-white/[0.08] bg-white/[0.02]'
                    }`}
                  >
                    <div className="absolute left-3 sm:left-3.5 top-3 sm:top-3.5">
                      <svg
                        className={`w-4 h-4 ${errors.message ? 'text-red-400' : focusedField === 'message' ? 'text-blue-400' : 'text-neutral-600'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project, goals, or any questions..."
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent text-sm text-white placeholder-neutral-600 py-3 pl-9 sm:pl-10 pr-3 sm:pr-4 outline-none rounded-lg sm:rounded-xl resize-none"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    {errors.message ? (
                      <p className="text-[10px] sm:text-xs text-red-400 flex items-center gap-1 min-w-0">
                        <svg
                          className="w-3 h-3 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                          />
                        </svg>
                        <span className="truncate">{errors.message}</span>
                      </p>
                    ) : (
                      <p className="text-[10px] sm:text-xs text-neutral-700">
                        Min 10 characters
                      </p>
                    )}
                    <p
                      className={`text-[10px] sm:text-xs flex-shrink-0 ${
                        form.message.length >= 10
                          ? 'text-emerald-500/50'
                          : 'text-neutral-700'
                      }`}
                    >
                      {form.message.length}
                    </p>
                  </div>
                </div>

                {/* ── Server Error ── */}
                {serverError && (
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-red-500/[0.05] border border-red-500/20">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 mt-0.5 sm:mt-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    <p className="text-xs sm:text-sm text-red-400">
                      {serverError}
                    </p>
                  </div>
                )}

                {/* ── Success Message ── */}
                {success && (
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 animate-[fadeSlideIn_0.5s_ease-out]">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400"
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
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-emerald-400">
                        Message sent successfully!
                      </p>
                      <p className="text-[10px] sm:text-xs text-neutral-500">
                        We&apos;ll get back to you within 2 hours.
                      </p>
                    </div>
                  </div>
                )}

                {/* ── Submit Button ── */}
                <button
                  type="submit"
                  disabled={sending}
                  className="group relative w-full py-3 sm:py-3.5 text-sm font-medium text-white rounded-lg sm:rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-1 sm:mt-2 active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 skew-x-12" />
                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    {sending ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
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
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                          />
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                {/* Privacy note */}
                <p className="text-center text-[10px] sm:text-[11px] text-neutral-700 px-2">
                  By submitting, you agree to our privacy policy. We never share
                  your data.
                </p>
              </form>
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

export default Contact;