
import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import logo from '../../src/assets/logo.png';
import {
  FaPhone,
  FaEnvelope,
  FaTelegram,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaGithub,
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
  FaChevronUp,
} from 'react-icons/fa';

const footerLinks = {
  services: [
    'Facebook Page Management',
    'Meta Ads & Campaigns',
    'Content Creation',
    'Social Media Strategy',
    'Community Management',
    'Analytics & Reporting',
  ],
  company: [
    { label: 'About Us', href: '#home' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
  legal: [
    { label: 'Privacy Policy', action: 'privacy' },
    { label: 'Terms of Service', action: 'terms' },
  ],
};

const socials = [
  {
    label: 'Telegram',
    href: 'https://t.me/agency_support',
    icon: <FaTelegram className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/agency.eth',
    icon: <FaInstagram className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: <FaLinkedin className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
  },
  {
    label: 'TikTok',
    href: '#',
    icon: <FaTiktok className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
  },
  {
    label: 'GitHub',
    href: '#',
    icon: <FaGithub className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />,
  },
];

const privacyContent = [
  {
    title: '1. Information We Collect',
    items: [
      'Personal information such as name, email address, phone number, and company name when you fill out our contact form or subscribe to our newsletter.',
      'Project-related information including business requirements, design preferences, and content you provide for your website or application.',
      'Technical data such as IP address, browser type, device information, and browsing behavior on our website collected through cookies and analytics tools.',
      'Communication data from any emails, chat messages, or other correspondence with our team.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    items: [
      'To provide and deliver the services you request, including web development, design, and digital marketing.',
      'To communicate with you about your project, provide updates, and respond to your inquiries.',
      'To send you newsletters, promotional materials, and updates about our services (only with your consent).',
      'To improve our website, services, and user experience through analytics and feedback.',
      'To protect against fraud, ensure security, and enforce our legal rights.',
    ],
  },
  {
    title: '3. Data Sharing & Third Parties',
    items: [
      'We do not sell, trade, or rent your personal information to third parties.',
      'We may share your data with trusted service providers who assist us in operating our website and delivering services.',
      'We may disclose your information if required by law or to protect our legal rights.',
    ],
  },
  {
    title: '4. Data Security',
    items: [
      'We implement industry-standard security measures to protect your personal information from unauthorized access.',
      'However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: '5. Cookies',
    items: [
      'We use essential cookies to ensure the basic functionality of our website.',
      'We use analytics cookies to understand how visitors interact with our website.',
      'You can control cookie preferences through your browser settings at any time.',
    ],
  },
  {
    title: '6. Your Rights',
    items: [
      'You have the right to access, correct, or delete your personal data at any time by contacting us.',
      'You can unsubscribe from marketing communications at any time.',
      'You have the right to request a copy of the data we hold about you.',
    ],
  },
  {
    title: '7. Contact Us',
    items: [
      'If you have questions about this Privacy Policy, please contact us at abelsamuel841@gmail.com or call +251 957576652.',
    ],
  },
];

const termsContent = [
  {
    title: '1. Acceptance of Terms',
    items: [
      'By accessing our website or engaging our services, you agree to be bound by these Terms of Service.',
      'If you do not agree to these terms, please do not use our website or services.',
    ],
  },
  {
    title: '2. Services Description',
    items: [
      'EthioGlobal Digital provides web development, e-commerce solutions, ERP systems, UI/UX design, SEO optimization, and digital marketing services.',
      'The specific scope, deliverables, timeline, and pricing for each project will be outlined in a separate project proposal or contract.',
    ],
  },
  {
    title: '3. Project Process & Payments',
    items: [
      'Projects typically follow our standard process: Discovery, Design, Development, Testing, and Deployment.',
      'Payment terms are outlined in each project agreement. Standard terms are 50% upfront and 50% upon completion.',
    ],
  },
  {
    title: '4. Client Responsibilities',
    items: [
      'Clients are responsible for providing accurate information, content, and feedback in a timely manner.',
      'Clients must ensure they have the rights to any content they provide for their project.',
    ],
  },
  {
    title: '5. Intellectual Property',
    items: [
      'Upon full payment, clients receive full ownership of their custom website, application, and associated source code.',
      'We retain the right to use general knowledge, skills, and experience gained during the project.',
    ],
  },
  {
    title: '6. Revisions & Changes',
    items: [
      'The number of revisions included in a project is specified in the project proposal.',
      'Additional revisions or scope changes beyond the agreed proposal may incur additional costs.',
    ],
  },
  {
    title: '7. Warranty & Support',
    items: [
      'We provide 30 days of free bug fixing and technical support after project delivery.',
      'Extended support and maintenance plans are available upon request.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    items: [
      'Our total liability for any claims arising from our services shall not exceed the total amount paid by the client.',
      'We are not liable for indirect, incidental, or consequential damages.',
    ],
  },
  {
    title: '9. Termination',
    items: [
      'Either party may terminate a project agreement with 7 days written notice.',
      'We will provide all completed work upon termination and receipt of outstanding payments.',
    ],
  },
  {
    title: '10. Governing Law',
    items: [
      'These Terms of Service are governed by the laws of Ethiopia.',
      'Any disputes shall be resolved through amicable negotiation.',
    ],
  },
];

function LegalModal({ isOpen, onClose, title, content, isDark }) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className={`absolute inset-0 backdrop-blur-sm ${isDark ? 'bg-black/70' : 'bg-black/40'}`} onClick={onClose} />
      <div className={`relative w-full sm:max-w-2xl max-h-[90dvh] sm:max-h-[80vh] backdrop-blur-xl border sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden ${
        isDark ? 'bg-[#0a0a0a]/95 border-white/[0.08] shadow-black/60' : 'bg-white border-gray-200 shadow-black/20'
      }`} onClick={(e) => e.stopPropagation()}>
        
        <div className={`relative flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b flex-shrink-0 ${isDark ? 'border-white/[0.06] bg-[#0d0d12]/80' : 'border-gray-100 bg-gray-50/90'}`}>
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent`} />
          <div className={`sm:hidden absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
          <div className="pr-8 sm:pr-0">
            <h3 className={`text-base sm:text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <p className={`text-[10px] sm:text-xs mt-0.5 ${isDark ? 'text-neutral-500' : 'text-gray-400'}`}>Last updated: January 2025</p>
          </div>
          <button onClick={onClose} className={`absolute right-3 sm:relative w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
            isDark ? 'text-neutral-500 hover:text-white hover:bg-white/[0.06]' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
          }`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6 scrollbar-thin overscroll-contain">
          {content.map((section, index) => (
            <div key={index}>
              <h4 className={`text-xs sm:text-sm font-semibold mb-2 sm:mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{section.title}</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 sm:gap-3">
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 sm:mt-2 ${isDark ? 'bg-emerald-500/40' : 'bg-emerald-400'}`} />
                    <span className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`px-4 sm:px-6 py-3 sm:py-4 border-t flex-shrink-0 ${isDark ? 'border-white/[0.06] bg-[#0d0d12]/60' : 'border-gray-100 bg-gray-50/80'}`}>
          <button onClick={onClose} className={`w-full py-3 sm:py-2.5 text-sm font-medium rounded-xl border transition-all duration-300 active:scale-[0.98] ${
            isDark ? 'text-neutral-400 hover:text-white border-white/[0.08] hover:border-white/15 hover:bg-white/[0.03]' : 'text-gray-600 hover:text-gray-900 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const { isDark } = useTheme();
  const [openModal, setOpenModal] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <footer id="footer" className={`relative overflow-hidden transition-colors duration-500 ${
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12">
          
          {/* ── Top Badge Bar ── */}
          <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 transition-all duration-700 ${
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

            {/* Trusted Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all hover:scale-105 ${
              isDark ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <FaShieldAlt className="w-3.5 h-3.5 text-blue-500" />
              <span className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                Trusted by 15+ Businesses
              </span>
            </div>
          </div>

          {/* ── Two Column Layout ── */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16 sm:mb-20">
            
            {/* ═══ LEFT COLUMN: Brand & Links ═══ */}
            <div className={`flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '100ms' }}>
              
              {/* Eyebrow Text */}
              <p className={`text-sm font-bold uppercase tracking-[0.25em] mb-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                Ethiopia's Premier Agency
              </p>

              {/* Logo & Brand Name */}
              <a href="#home" className="group flex items-center gap-3 sm:gap-4 w-fit mb-6">
                <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 ${
                  isDark
                    ? 'bg-white/[0.04] border-white/[0.08] group-hover:border-emerald-500/30 group-hover:bg-emerald-500/[0.05]'
                    : 'bg-white border-gray-200 group-hover:border-emerald-300 group-hover:bg-emerald-50 shadow-lg'
                }`}>
                  <img src={logo} alt="EthioGlobal Digital Logo" className="w-full h-full object-contain p-2" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl sm:text-2xl font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    EthioGlobal Digital
                  </span>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    Digital Agency
                  </span>
                </div>
              </a>

              {/* Description */}
              <p className={`text-sm sm:text-base leading-relaxed max-w-md mb-8 ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                We build websites, ERP systems, e-commerce platforms, and run digital marketing that drives{' '}
                <span className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>real growth</span> for Ethiopian businesses.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                <a href="#contact"
                  className="group relative w-full sm:w-auto px-8 py-4 text-base font-bold text-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2.5">
                    <FaRocket className="w-5 h-5 group-hover:animate-bounce" />
                    Start Your Project
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>

                <a href="tel:+251912345678"
                  className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] ${
                    isDark 
                      ? 'text-white border-white/20 hover:border-white/40 hover:bg-white/[0.04] shadow-lg shadow-black/20' 
                      : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <FaPhone className="w-4 h-4" />
                  Call Now
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
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
                  <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-gray-600'}`}>4.9 Rating</span>
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

            {/* ═══ RIGHT COLUMN: Contact Card ═══ */}
            <div className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`} style={{ transitionDelay: '300ms' }}>
              <div className="relative max-w-lg mx-auto">
                
                {/* Background Glow */}
                <div className={`absolute -inset-4 rounded-3xl blur-2xl transition-colors duration-500 ${
                  isDark 
                    ? 'bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 opacity-60' 
                    : 'bg-gradient-to-r from-emerald-300/40 via-cyan-300/40 to-blue-300/40 opacity-80'
                }`} />

                {/* Main Card */}
                <div className={`relative rounded-3xl overflow-hidden border-2 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] ${
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
                        <span className="text-xs font-bold text-white tracking-wide">GET IN TOUCH</span>
                      </div>
                      
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
                        ))}
                      </div>
                    </div>

                    {/* Contact Info List */}
                    <div className="space-y-4 mb-6">
                      
                      {/* Phone */}
                      <a href="tel:+251912345678" className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02] ${
                        isDark ? 'bg-white/[0.02] hover:bg-emerald-500/[0.05]' : 'bg-gray-50 hover:bg-emerald-50'
                      }`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 group-hover:rotate-3 ${
                          isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'
                        }`}>
                          <FaPhone className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[10px] font-semibold uppercase tracking-wider mb-0.5 ${isDark ? 'text-neutral-600' : 'text-gray-500'}`}>Phone</p>
                          <p className={`text-sm font-bold truncate ${isDark ? 'text-white group-hover:text-emerald-400' : 'text-gray-900 group-hover:text-emerald-600'}`}>+251 912 345 678</p>
                        </div>
                        <svg className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1 ${isDark ? 'text-neutral-700' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>

                      {/* Email */}
                      <a href="mailto:info@ethioglobal.com" className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02] ${
                        isDark ? 'bg-white/[0.02] hover:bg-blue-500/[0.05]' : 'bg-gray-50 hover:bg-blue-50'
                      }`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110 group-hover:rotate-3 ${
                          isDark ? 'bg-blue-500/10' : 'bg-blue-50'
                        }`}>
                          <FaEnvelope className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[10px] font-semibold uppercase tracking-wider mb-0.5 ${isDark ? 'text-neutral-600' : 'text-gray-500'}`}>Email</p>
                          <p className={`text-sm font-bold truncate ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>info@ethioglobal.com</p>
                        </div>
                        <svg className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1 ${isDark ? 'text-neutral-700' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>

                      {/* Working Hours */}
                      <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                        isDark ? 'bg-white/[0.02]' : 'bg-gray-50'
                      }`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isDark ? 'bg-purple-500/10' : 'bg-purple-50'
                        }`}>
                          <FaClock className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-[10px] font-semibold uppercase tracking-wider mb-0.5 ${isDark ? 'text-neutral-600' : 'text-gray-500'}`}>Working Hours</p>
                          <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Mon-Fri: 9AM - 6PM</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-[10px] font-bold ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                          OPEN
                        </div>
                      </div>
                    </div>

                    {/* CTA in Card */}
                    <a href="#contact"
                      className="group relative w-full py-4 text-base font-bold text-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg block text-center"
                      style={{ background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                      
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <FaEnvelope className="w-5 h-5" />
                        Send Us a Message
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>

                    {/* Urgency Note */}
                    <p className={`text-center text-xs mt-4 font-medium ${isDark ? 'text-neutral-500' : 'text-gray-400'}`}>
                      ⚡ Average response time: 2 hours
                    </p>
                  </div>
                </div>

                {/* Floating Stats Cards */}
                <div className={`absolute -top-3 -right-3 sm:top-2 sm:-right-6 px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm animate-bounce-slow transition-colors ${
                  isDark 
                    ? 'bg-[#0f172a]/90 border border-emerald-500/30' 
                    : 'bg-white/90 border border-emerald-200 shadow-emerald-100/50'
                }`}>
                  <div className="text-2xl font-black text-emerald-500">15+</div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>Clients</div>
                </div>

                <div className={`absolute -bottom-3 -left-3 sm:bottom-2 sm:-left-6 px-4 py-3 rounded-xl shadow-xl backdrop-blur-sm animate-bounce-slow-delayed transition-colors ${
                  isDark 
                    ? 'bg-[#0f172a]/90 border border-blue-500/30' 
                    : 'bg-white/90 border border-blue-200 shadow-blue-100/50'
                }`}
                  style={{ animationDelay: '1s' }}
                >
                  <div className="text-2xl font-black text-blue-500">24/7</div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════ LINKS SECTION ══════════ */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 pb-12 sm:pb-16 border-t-2 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
            style={{ 
              borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              transitionDelay: '500ms'
            }}
          >
            
            {/* Services */}
            <div>
              <h5 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span className={`w-5 h-px ${isDark ? 'bg-emerald-500' : 'bg-emerald-400'}`} />
                Services
              </h5>
              <ul className="space-y-2.5">
                {footerLinks.services.slice(0, 6).map((service) => (
                  <li key={service} className="flex items-center gap-2">
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isDark ? 'bg-emerald-500/40' : 'bg-emerald-400'}`} />
                    <a href="#" className={`text-sm transition-colors duration-300 ${isDark ? 'text-neutral-500 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span className={`w-5 h-px ${isDark ? 'bg-blue-500' : 'bg-blue-400'}`} />
                Company
              </h5>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={`text-sm transition-colors duration-300 ${isDark ? 'text-neutral-500 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5 className={`text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span className={`w-5 h-px ${isDark ? 'bg-purple-500' : 'bg-purple-400'}`} />
                Legal
              </h5>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <button onClick={() => setOpenModal(link.action)} className={`text-sm transition-colors duration-300 ${isDark ? 'text-neutral-500 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            
          </div>

          {/* ══════════ BOTTOM STATS BAR ══════════ */}
          <div className={`pb-8 border-t-2 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
            style={{ 
              borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              transitionDelay: '600ms'
            }}
          >
           
          </div>

          {/* ══════════ COPYRIGHT BAR ══════════ */}
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t transition-colors duration-500 ${
            isDark ? 'border-white/[0.04]' : 'border-gray-200'
          }`}>
            <p className={`text-xs text-center sm:text-left ${isDark ? 'text-neutral-600' : 'text-gray-400'}`}>
              © {currentYear} EthioGlobal Digital. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <span className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-neutral-700' : 'text-gray-400'}`}>Powered by</span>
              <span className={`text-xs font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                isDark ? 'from-emerald-400 to-cyan-400' : 'from-emerald-500 to-cyan-500'
              }`}>
                EthioGlobal Tech
              </span>
            </div>

            
          </div>

          {/* Developer Credit */}
          <div className={`text-center mt-6 pt-4 border-t transition-colors duration-500 ${
            isDark ? 'border-white/[0.03]' : 'border-gray-100'
          }`}>
            <p className={`text-[10px] sm:text-xs ${isDark ? 'text-neutral-700' : 'text-gray-400'}`}>
              Developer{' '}
              <a
                href="https://abel-samuel.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold transition-all duration-300 hover:underline ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                Abel Samuel
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ══════════ LEGAL MODALS ══════════ */}
      <LegalModal
        isOpen={openModal === 'privacy'}
        onClose={() => setOpenModal(null)}
        title="Privacy Policy"
        content={privacyContent}
        isDark={isDark}
      />
      <LegalModal
        isOpen={openModal === 'terms'}
        onClose={() => setOpenModal(null)}
        title="Terms of Service"
        content={termsContent}
        isDark={isDark}
      />

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
    </>
  );
}

export default Footer;
