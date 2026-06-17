
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import api from '../../api/api';
import {
  FaStar,
  FaArrowRight,
  FaFire,
  FaGift,
  FaRocket,
  FaCheckCircle,
  FaShieldAlt,
  FaHeadset,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaQuoteLeft,
  FaFilter,
  FaPaperPlane,
} from 'react-icons/fa';

const fallbackTestimonials = [
  { id: 1, name: 'Samrawit Mulugeta', role: 'CEO, Samri Collection', content: 'They transformed our entire digital presence — from our e-commerce platform to the ERP system. Sales increased by 340% in just 6 months.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'Nani Bekele', role: 'Owner, Nani Cafe', content: 'Our online reservations went through the roof after they built our website and ran our digital marketing. Professional, creative, and always on time.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'Dawit Tadesse', role: 'Director, Elite Academy', content: 'The online exam management system they built handles thousands of students seamlessly. Their technical expertise is unmatched in Ethiopia.', rating: 5, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' },
  { id: 4, name: 'Helen Girma', role: 'Marketing Manager, FreshRoast', content: 'Our social media engagement tripled and website traffic grew by 284% after partnering with them. They truly understand digital growth.', rating: 4, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop' },
  { id: 5, name: 'Yonas Alemu', role: 'Founder, HabeshaTech', content: 'From UI/UX design to full-stack development — they delivered a product that exceeded our expectations. Highly recommend for any tech project.', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop' },
  { id: 6, name: 'Meron Teklu', role: 'COO, Addis Properties', content: 'The website they built for our real estate firm generates consistent leads every month. Their SEO strategy is pure gold.', rating: 5, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
];

const gradients = ['from-violet-600 to-purple-600', 'from-purple-600 to-fuchsia-600', 'from-fuchsia-600 to-pink-600', 'from-indigo-600 to-violet-600', 'from-pink-600 to-rose-600', 'from-blue-600 to-indigo-600'];

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return parts.length === 1 ? parts[0][0].toUpperCase() : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
function getGradient(id) { return gradients[(id || 0) % gradients.length]; }

function DefaultAvatar({ name, id }) {
  return (
    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${getGradient(id)} flex items-center justify-center border-2 border-white/10 flex-shrink-0`}>
      <span className="text-sm sm:text-base font-bold text-white">{getInitials(name)}</span>
    </div>
  );
}

function StarRating({ rating, size = 'md' }) {
  const cls = size === 'lg' ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4 sm:w-5 sm:h-5';
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`${cls} text-amber-400`} fill={s <= rating ? 'currentColor' : 'none'} viewBox="0 0 20 20" stroke={s <= rating ? 'none' : 'currentColor'} strokeWidth={1}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function StarRatingInput({ rating, setRating }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((s) => (
        <button type="button" key={s} onClick={() => setRating(s)} className="transition-transform duration-200 hover:scale-125 focus:outline-none">
          <FaStar className={`w-7 h-7 transition-colors duration-200 ${s <= rating ? 'text-amber-400 drop-shadow-sm' : 'text-neutral-600 hover:text-amber-400/50'}`} />
        </button>
      ))}
    </div>
  );
}

// ══════════ SUBMIT REVIEW MODAL ══════════
function SubmitReviewModal({ isOpen, onClose, isDark, onSuccess }) {
  const [form, setForm] = useState({ name: '', role: '', content: '', rating: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => { if (isOpen) document.body.style.overflow = 'hidden'; else document.body.style.overflow = ''; return () => { document.body.style.overflow = ''; }; }, [isOpen]);
  useEffect(() => { if (!isOpen) return; const h = (e) => { if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h); }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating === 0) { setStatus('error'); return; }
    setSubmitting(true); setStatus(null);
    try {
      await api.post('/testimony/', form);
      setStatus('success'); setForm({ name: '', role: '', content: '', rating: 0 });
      if (onSuccess) onSuccess();
      setTimeout(() => onClose(), 1500);
    } catch (err) { console.error(err); setStatus('error'); }
    finally { setSubmitting(false); }
  };

  if (!isOpen) return null;
  const inputCls = `w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 text-sm ${isDark ? 'bg-white/[0.03] border-white/[0.08] text-white placeholder-neutral-600 focus:border-violet-500/50 focus:bg-white/[0.05]' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-100'}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className={`absolute inset-0 backdrop-blur-md ${isDark ? 'bg-black/80' : 'bg-black/50'}`} onClick={onClose} style={{ animation: 'fadeIn 0.3s ease-out' }} />
      <div className={`relative w-full sm:max-w-lg max-h-[95dvh] sm:max-h-[90vh] backdrop-blur-xl rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden ${isDark ? 'bg-[#0a0a1a]/95 border border-white/[0.08]' : 'bg-white/95 border border-gray-200'}`} onClick={(e) => e.stopPropagation()} style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 flex-shrink-0" />
        <div className={`px-6 sm:px-8 py-5 border-b flex-shrink-0 ${isDark ? 'border-white/[0.06]' : 'border-gray-100'}`}>
          <div className="sm:hidden absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${isDark ? 'bg-violet-500/10' : 'bg-violet-100'}`}><FaPaperPlane className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} /></div>
              <div>
                <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Write a Review</h3>
                <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>Share your experience with us</p>
              </div>
            </div>
            <button onClick={onClose} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group ${isDark ? 'text-neutral-500 hover:text-white hover:bg-white/[0.08]' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}><FaTimes className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={`block text-xs font-semibold mb-2 uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>Name *</label><input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputCls} /></div>
              <div><label className={`block text-xs font-semibold mb-2 uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>Role / Company *</label><input type="text" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="CEO, Company" className={inputCls} /></div>
            </div>
            <div><label className={`block text-xs font-semibold mb-2 uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>Your Review *</label><textarea required rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Tell us about your experience..." className={`${inputCls} resize-none`} /></div>
            <div>
              <label className={`block text-xs font-semibold mb-3 uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>Rating *</label>
              <StarRatingInput rating={form.rating} setRating={(r) => setForm({ ...form, rating: r })} />
              {form.rating === 0 && status === 'error' && <p className="text-xs text-red-400 mt-2">Please select a rating.</p>}
            </div>
            <button type="submit" disabled={submitting} className="group relative w-full py-3.5 text-sm font-bold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20 disabled:opacity-70" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
              {submitting ? (<span className="relative z-10 flex items-center justify-center gap-2"><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Submitting...</span>) : (<span className="relative z-10 flex items-center justify-center gap-2"><FaPaperPlane className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />Post Testimonial</span>)}
            </button>
            <div className="h-5 flex items-center justify-center">
              {status === 'success' && <div className="flex items-center gap-2 text-violet-400 text-sm font-medium" style={{ animation: 'fadeIn 0.3s ease-out' }}><FaCheckCircle className="w-4 h-4" /> Thank you! Review submitted.</div>}
              {status === 'error' && form.rating !== 0 && <div className="text-red-400 text-sm font-medium" style={{ animation: 'fadeIn 0.3s ease-out' }}>Something went wrong. Try again.</div>}
            </div>
          </form>
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </div>
  );
}

// ══════════ VIEW ALL MODAL ══════════
function TestimonialsModal({ isOpen, onClose, testimonials, isDark }) {
  const [filterRating, setFilterRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalPage, setModalPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => { if (isOpen) document.body.style.overflow = 'hidden'; else document.body.style.overflow = ''; return () => { document.body.style.overflow = ''; }; }, [isOpen]);
  useEffect(() => { if (!isOpen) return; const h = (e) => { if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h); }, [isOpen, onClose]);

  const filtered = testimonials.filter((t) => {
    const mr = filterRating === 'all' || t.rating.toString() === filterRating;
    const ms = searchQuery === '' || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.role.toLowerCase().includes(searchQuery.toLowerCase()) || t.content.toLowerCase().includes(searchQuery.toLowerCase());
    return mr && ms;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice(modalPage * itemsPerPage, modalPage * itemsPerPage + itemsPerPage);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className={`absolute inset-0 backdrop-blur-md ${isDark ? 'bg-black/80' : 'bg-black/50'}`} onClick={onClose} style={{ animation: 'fadeIn 0.3s ease-out' }} />
      <div className={`relative w-full sm:max-w-5xl max-h-[95dvh] sm:max-h-[90vh] backdrop-blur-xl rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden ${isDark ? 'bg-[#0a0a1a]/95 border border-white/[0.08]' : 'bg-white/95 border border-gray-200'}`} onClick={(e) => e.stopPropagation()} style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 flex-shrink-0" />
        <div className={`px-6 sm:px-8 py-5 sm:py-6 border-b flex-shrink-0 ${isDark ? 'border-white/[0.06]' : 'border-gray-100'}`}>
          <div className="flex items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-xl ${isDark ? 'bg-violet-500/10' : 'bg-violet-100'}`}><FaQuoteLeft className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} /></div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>All Client Reviews</h3>
                  <p className={`text-xs sm:text-sm ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>{testimonials.length} verified testimonials</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 mt-3">
                {['all', '5', '4'].map((r) => (<button key={r} onClick={() => { setFilterRating(r); setModalPage(0); }} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${filterRating === r ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30 scale-105' : isDark ? 'bg-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/[0.08]' : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}>{r === 'all' ? 'All Stars' : `${r}★+`}</button>))}
              </div>
            </div>
            <button onClick={onClose} className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all flex-shrink-0 group ${isDark ? 'text-neutral-500 hover:text-white hover:bg-white/[0.08]' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}><FaTimes className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" /></button>
          </div>
          <div className="mt-4 relative">
            <FaFilter className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-neutral-600' : 'text-gray-400'}`} />
            <input type="text" placeholder="Search reviews..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setModalPage(0); }} className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all duration-300 text-sm ${isDark ? 'bg-white/[0.03] border-white/[0.08] text-white placeholder-neutral-600 focus:border-violet-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100'}`} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <div className="flex items-center justify-between mb-5">
              <p className={`text-xs font-medium ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>Showing {filtered.length} of {testimonials.length}</p>
              <select value={filterRating} onChange={(e) => { setFilterRating(e.target.value); setModalPage(0); }} className={`sm:hidden px-3 py-1.5 rounded-lg text-xs font-medium border outline-none ${isDark ? 'bg-white/[0.05] border-white/[0.08] text-neutral-300' : 'bg-gray-100 border-gray-200 text-gray-700'}`}><option value="all">All Ratings</option><option value="5">5 Stars</option><option value="4">4+ Stars</option></select>
            </div>
            {filtered.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">{paginated.map((t) => (<TestimonialCardModal key={t.id} testimonial={t} isDark={isDark} />))}</div>) : (<div className={`flex flex-col items-center justify-center py-16 px-4 rounded-2xl border-2 border-dashed ${isDark ? 'border-white/[0.06]' : 'border-gray-200'}`}><FaQuoteLeft className={`w-7 h-7 mb-4 ${isDark ? 'text-neutral-700' : 'text-gray-300'}`} /><p className={`text-sm font-medium mb-1 ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>No reviews found</p><button onClick={() => { setSearchQuery(''); setFilterRating('all'); }} className={`mt-4 px-4 py-2 rounded-lg text-xs font-semibold ${isDark ? 'bg-violet-500/10 text-violet-400' : 'bg-violet-50 text-violet-600'}`}>Clear Filters</button></div>)}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8 pt-6 border-t border-dashed" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
                <button onClick={() => setModalPage((p) => Math.max(0, p - 1))} disabled={modalPage === 0} className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all disabled:opacity-30 ${isDark ? 'border-white/[0.08] text-neutral-400' : 'border-gray-200 text-gray-500'}`}><FaChevronLeft className="w-3.5 h-3.5" /></button>
                <div className="flex items-center gap-1.5">{Array.from({ length: totalPages }).map((_, i) => (<button key={i} onClick={() => setModalPage(i)} className={`h-2.5 rounded-full transition-all duration-300 ${modalPage === i ? 'bg-violet-500 w-6' : isDark ? 'bg-white/15 w-2.5' : 'bg-gray-300 w-2.5'}`} />))}</div>
                <span className={`text-xs tabular-nums min-w-[3rem] text-center ${isDark ? 'text-neutral-600' : 'text-gray-400'}`}>{modalPage + 1}/{totalPages}</span>
                <button onClick={() => setModalPage((p) => Math.min(totalPages - 1, p + 1))} disabled={modalPage === totalPages - 1} className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all disabled:opacity-30 ${isDark ? 'border-white/[0.08] text-neutral-400' : 'border-gray-200 text-gray-500'}`}><FaChevronRight className="w-3.5 h-3.5" /></button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </div>
  );
}

function TestimonialCardModal({ testimonial: t, isDark }) {
  const hasAvatar = t.avatar && t.avatar.trim() !== '';
  return (
    <div className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-500 hover:shadow-xl h-full flex flex-col ${isDark ? 'bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/20' : 'bg-white border border-gray-200 hover:border-violet-300'}`}>
      <div className="flex items-start justify-between mb-4">
        <svg className={`w-8 h-8 ${isDark ? 'text-violet-500/15' : 'text-violet-500/20'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
        <StarRating rating={t.rating} size="sm" />
      </div>
      <p className={`text-sm leading-relaxed mb-5 flex-1 line-clamp-4 group-hover:line-clamp-none transition-all duration-300 ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>&ldquo;{t.content}&rdquo;</p>
      <div className={`pt-4 border-t ${isDark ? 'border-white/[0.06]' : 'border-gray-100'}`}>
        <div className="flex items-center gap-3">
          {hasAvatar ? (<div className="relative flex-shrink-0"><div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10"><img src={t.avatar} alt={t.name} className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} /><div className={`w-full h-full rounded-full bg-gradient-to-br ${getGradient(t.id)} items-center justify-center hidden`}><span className="text-sm font-bold text-white">{getInitials(t.name)}</span></div></div><span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-violet-500 rounded-full border-2 ${isDark ? 'border-[#0a0a1a]' : 'border-white'}`} /></div>) : (<div className="relative"><DefaultAvatar name={t.name} id={t.id} /><span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-violet-500 rounded-full border-2 ${isDark ? 'border-[#0a0a1a]' : 'border-white'}`} /></div>)}
          <div className="flex-1 min-w-0"><h4 className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.name}</h4><p className={`text-xs truncate ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>{t.role}</p></div>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-violet-500/10' : 'bg-violet-50'}`}><FaCheckCircle className={`w-4 h-4 ${isDark ? 'text-violet-400' : 'text-violet-500'}`} /></div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial: t, isDark }) {
  const hasAvatar = t.avatar && t.avatar.trim() !== '';
  return (
    <div className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-500 hover:shadow-xl h-full flex flex-col ${isDark ? 'bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/20' : 'bg-white border border-gray-200 hover:border-violet-300'}`}>
      <div className="mb-2 sm:mb-3">
        <svg className={`w-5 h-5 sm:w-7 sm:h-7 ${isDark ? 'text-violet-500/20' : 'text-violet-500/30'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
      </div>
      <StarRating rating={t.rating} size="sm" />
      <p className={`mt-2 sm:mt-3 text-[11px] sm:text-xs leading-relaxed line-clamp-3 sm:line-clamp-4 transition-all duration-300 flex-1 ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>&ldquo;{t.content}&rdquo;</p>
      <div className={`mt-3 sm:mt-4 pt-3 sm:pt-4 border-t ${isDark ? 'border-white/[0.06]' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2 sm:gap-2.5">
          {hasAvatar ? (<div className="relative flex-shrink-0"><div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white/10"><img src={t.avatar} alt={t.name} className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} /><div className={`w-full h-full rounded-full bg-gradient-to-br ${getGradient(t.id)} items-center justify-center border-2 border-white/10 hidden`}><span className="text-[10px] sm:text-xs font-bold text-white">{getInitials(t.name)}</span></div></div><span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-violet-500 rounded-full border-2 ${isDark ? 'border-[#0a0a1a]' : 'border-white'}`} /></div>) : (<div className="relative"><div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${getGradient(t.id)} flex items-center justify-center border-2 border-white/10`}><span className="text-[10px] sm:text-xs font-bold text-white">{getInitials(t.name)}</span></div><span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-violet-500 rounded-full border-2 ${isDark ? 'border-[#0a0a1a]' : 'border-white'}`} /></div>)}
          <div className="flex-1 min-w-0"><h4 className={`text-[11px] sm:text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.name}</h4><p className={`text-[9px] sm:text-[10px] truncate ${isDark ? 'text-neutral-500' : 'text-gray-500'}`}>{t.role}</p></div>
          <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ${isDark ? 'bg-violet-500/10' : 'bg-violet-50'}`}><svg className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isDark ? 'text-violet-400' : 'text-violet-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>
        </div>
      </div>
    </div>
  );
}

// ══════════ MAIN SECTION ══════════
function Testimonials() {
  const { isDark } = useTheme();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => { const t = setTimeout(() => setIsVisible(true), 100); return () => clearTimeout(t); }, []);

  const fetchTestimonials = useCallback(async () => {
    try { const res = await api.get('/testimony/'); if (res.data && Array.isArray(res.data) && res.data.length > 0) setTestimonials(res.data); else setTestimonials(fallbackTestimonials); }
    catch { setTestimonials(fallbackTestimonials); } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  const col1 = testimonials.filter((_, i) => i % 2 === 0);
  const col2 = testimonials.filter((_, i) => i % 2 !== 0);
  
  // Duplicate arrays for seamless infinite loop
  const infiniteCol1 = [...col1, ...col1, ...col1];
  const infiniteCol2 = [...col2, ...col2, ...col2];

  return (
    <>
      <section id="testimonials" className={`relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 transition-colors duration-500 ${isDark ? 'bg-[#0a0a1a]' : 'bg-gradient-to-br from-slate-50 via-white to-violet-50/50'}`} style={{ fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif" }}>
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-500/15 to-purple-500/15 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-fuchsia-500/10 to-blue-500/10 blur-3xl" />
          <div className={`absolute inset-0 ${isDark ? 'opacity-[0.02] bg-[linear-gradient(rgba(139,92,246,0.1)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px_1px,transparent_1px)] bg-[size:50px_50px]' : 'opacity-[0.03] bg-[linear-gradient(rgba(139,92,246,0.12)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.12)_1px_1px,transparent_1px)] bg-[size:50px_50px]'}`} />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-violet-500/10 to-transparent rotate-12" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

          <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm shadow-sm transition-all hover:scale-105 ${isDark ? 'border-violet-500/20 bg-violet-500/[0.08] shadow-violet-500/5' : 'border-violet-200 bg-white shadow-md shadow-violet-100/50'}`}>
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" /><span className="relative inline-flex rounded-full h-full w-full bg-violet-500" /></span>
              <FaStar className="w-4 h-4 text-amber-500" />
              <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-violet-300' : 'text-violet-700'}`}>Client Reviews</span>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm ${isDark ? 'border-amber-500/20 bg-amber-500/[0.08] shadow-amber-500/5' : 'border-orange-200 bg-orange-50 shadow-md shadow-orange-100/50'}`}>
              <FaFire className="w-3.5 h-3.5 text-orange-500" />
              <span className={`text-xs font-bold ${isDark ? 'text-amber-300' : 'text-orange-600'}`}>4.9 Average Rating</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN (TEXT) */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className={`text-sm font-bold uppercase tracking-[0.25em] mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isDark ? 'text-violet-400' : 'text-violet-600'}`} style={{ transitionDelay: '100ms' }}>Trusted by Ethiopian Businesses</p>

              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${isDark ? 'text-white' : 'text-slate-900'}`} style={{ transitionDelay: '200ms' }}>
                What Our Clients<br className="hidden sm:block" />
                <span className="relative inline-block mt-1">
                  <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">Have to Say</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full opacity-40 blur-sm" />
                </span>
              </h1>

              <p className={`text-base sm:text-lg lg:text-xl max-w-lg leading-relaxed mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isDark ? 'text-neutral-400' : 'text-gray-600'}`} style={{ transitionDelay: '300ms' }}>
                Don&apos;t just take our word for it — hear from the businesses we&apos;ve helped grow with{' '}
                <span className={`font-bold ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>proven results</span>.
              </p>

              <div className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
                <button onClick={() => setShowModal(true)} className="group relative w-full sm:w-auto px-8 py-4 text-base font-bold text-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }}>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                  <span className="relative z-10 flex items-center justify-center gap-2.5"><FaRocket className="w-5 h-5" />View All {testimonials.length}+ Reviews<FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                </button>
                <button onClick={() => setShowSubmitModal(true)} className={`group flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-2xl border-2 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] backdrop-blur-sm ${isDark ? 'text-white border-white/15 hover:border-violet-400/50 hover:bg-violet-500/10 shadow-lg shadow-black/20' : 'text-slate-700 border-gray-200 hover:border-violet-300 hover:bg-violet-50 shadow-md'}`}>
                  <FaPaperPlane className="w-4 h-4" />Write a Review
                </button>
              </div>

              <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
                <div className="flex items-center gap-2"><div className={`p-1.5 rounded-lg ${isDark ? 'bg-violet-500/10' : 'bg-violet-50'}`}><FaShieldAlt className={`w-4 h-4 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} /></div><span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>Verified</span></div>
                <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />
                <div className="flex items-center gap-2"><div className={`p-1.5 rounded-lg ${isDark ? 'bg-amber-500/10' : 'bg-amber-50'}`}><FaGift className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} /></div><span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>Results Driven</span></div>
                <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-neutral-700' : 'bg-gray-300'}`} />
                <div className="flex items-center gap-2"><div className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}><FaHeadset className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} /></div><span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>24/7 Support</span></div>
              </div>
            </div>

            {/* RIGHT COLUMN (INFINITE 2-COL SCROLL) */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '400ms' }}>
              {/* Fixed container with specific height limits and overflow hidden for masks */}
              <div className="relative h-[400px] sm:h-[480px] lg:h-[560px] max-h-[75vh] overflow-hidden group/scroll">
                
                {/* CLOUD EFFECT TOP (Increased height and opacity) */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-32 sm:h-40 z-10 pointer-events-none ${
                    isDark 
                      ? 'bg-gradient-to-b from-[#0a0a1a] via-[#0a0a1a]/95 to-transparent' 
                      : 'bg-gradient-to-b from-slate-50 via-slate-50/95 to-transparent'
                  }`} 
                />
                
                {/* CLOUD EFFECT BOTTOM (Increased height and opacity) */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 h-32 sm:h-40 z-10 pointer-events-none ${
                    isDark 
                      ? 'bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/95 to-transparent' 
                      : 'bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent'
                  }`} 
                />

                {loading ? (
                  <div className="grid grid-cols-2 gap-4 h-full">
                    {[1, 2, 3, 4].map((i) => (<div key={i} className={`h-48 rounded-2xl ${isDark ? 'bg-white/[0.02] border border-white/[0.06]' : 'bg-gray-100 border border-gray-200'}`} />))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 h-full group-hover/scroll:[--scroll-play-state:paused]">
                    {/* Column 1: Moves UP */}
                    <div 
                      className="flex flex-col gap-4 animate-scroll-up"
                      style={{ animationPlayState: 'var(--scroll-play-state, running)' }}
                    >
                      {infiniteCol1.map((t, i) => (
                        <div key={`c1-${t.id}-${i}`} className="flex-shrink-0 w-full">
                          <TestimonialCard testimonial={t} isDark={isDark} />
                        </div>
                      ))}
                    </div>

                    {/* Column 2: Moves DOWN */}
                    <div 
                      className="flex flex-col gap-4 animate-scroll-down"
                      style={{ animationPlayState: 'var(--scroll-play-state, running)' }}
                    >
                      {infiniteCol2.map((t, i) => (
                        <div key={`c2-${t.id}-${i}`} className="flex-shrink-0 w-full">
                          <TestimonialCard testimonial={t} isDark={isDark} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsModal isOpen={showModal} onClose={() => setShowModal(false)} testimonials={testimonials} isDark={isDark} />
      <SubmitReviewModal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)} isDark={isDark} onSuccess={fetchTestimonials} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        /* To prevent jump, we use 3x array length so it covers the full height before looping */
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-66.666%); }
        }
        
        @keyframes scrollDown {
          0% { transform: translateY(-66.666%); }
          100% { transform: translateY(0); }
        }
        
        .animate-scroll-up {
          animation: scrollUp 40s linear infinite;
        }
        
        .animate-scroll-down {
          animation: scrollDown 40s linear infinite;
        }
      `}} />
    </>
  );
}

export default Testimonials;
