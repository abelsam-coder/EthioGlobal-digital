import { useState, useEffect } from 'react';
import logo from '../../src/assets/logo.png';

const footerLinks = {
  services: [
    'Web Development',
    'E-Commerce',
    'ERP Systems',
    'UI/UX Design',
    'SEO Optimization',
    'Digital Marketing',
  ],
  company: [
    { label: 'About Us', href: '#founders' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
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
    icon: (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/agency.eth',
    icon: (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

// ─── Privacy Policy Content ───
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
      'We may share your data with trusted service providers who assist us in operating our website and delivering services (e.g., hosting providers, payment processors).',
      'We may disclose your information if required by law or to protect our legal rights.',
    ],
  },
  {
    title: '4. Data Security',
    items: [
      'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.',
      'However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: '5. Cookies',
    items: [
      'We use essential cookies to ensure the basic functionality of our website.',
      'We use analytics cookies to understand how visitors interact with our website and improve our services.',
      'You can control cookie preferences through your browser settings at any time.',
    ],
  },
  {
    title: '6. Your Rights',
    items: [
      'You have the right to access, correct, or delete your personal data at any time by contacting us.',
      'You can unsubscribe from marketing communications at any time using the unsubscribe link in our emails.',
      'You have the right to request a copy of the data we hold about you.',
    ],
  },
  {
    title: '7. Contact Us',
    items: [
      'If you have questions about this Privacy Policy, please contact us at info@ethioglobal.com or call +251 912 345 678.',
    ],
  },
];

// ─── Terms of Service Content ───
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
      'We reserve the right to modify or discontinue any service with reasonable notice to affected clients.',
    ],
  },
  {
    title: '3. Project Process & Payments',
    items: [
      'Projects typically follow our standard process: Discovery, Design, Development, Testing, and Deployment.',
      'Payment terms are outlined in each project agreement. Standard terms are 50% upfront and 50% upon completion unless otherwise agreed.',
      'Late payments may result in project delays. We will communicate any impact on timelines due to payment issues.',
    ],
  },
  {
    title: '4. Client Responsibilities',
    items: [
      'Clients are responsible for providing accurate information, content, and feedback in a timely manner.',
      'Delays in providing required materials or feedback may affect the project timeline.',
      'Clients must ensure they have the rights to any content (images, text, logos) they provide for their project.',
    ],
  },
  {
    title: '5. Intellectual Property',
    items: [
      'Upon full payment, clients receive full ownership of their custom website, application, and associated source code.',
      'We retain the right to use general knowledge, skills, and experience gained during the project.',
      'Third-party tools, libraries, and frameworks used in the project remain subject to their respective licenses.',
      'We may display completed projects in our portfolio unless a non-disclosure agreement is in place.',
    ],
  },
  {
    title: '6. Revisions & Changes',
    items: [
      'The number of revisions included in a project is specified in the project proposal.',
      'Additional revisions or scope changes beyond the agreed proposal may incur additional costs.',
      'Any change requests must be communicated in writing and will be assessed before implementation.',
    ],
  },
  {
    title: '7. Warranty & Support',
    items: [
      'We provide 30 days of free bug fixing and technical support after project delivery.',
      'This warranty covers issues arising from the original scope of work, not from third-party modifications or server issues.',
      'Extended support and maintenance plans are available upon request.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    items: [
      'Our total liability for any claims arising from our services shall not exceed the total amount paid by the client for the specific project.',
      'We are not liable for indirect, incidental, or consequential damages including loss of profits, data, or business opportunities.',
      'We are not responsible for issues caused by third-party services, hosting providers, or force majeure events.',
    ],
  },
  {
    title: '9. Termination',
    items: [
      'Either party may terminate a project agreement with 7 days written notice.',
      'In case of termination, the client is responsible for payment of work completed up to the termination date.',
      'We will provide all completed work and source code upon termination and receipt of outstanding payments.',
    ],
  },
  {
    title: '10. Governing Law',
    items: [
      'These Terms of Service are governed by the laws of Ethiopia.',
      'Any disputes shall be resolved through amicable negotiation, and if unsuccessful, through the courts of Addis Ababa, Ethiopia.',
    ],
  },
];

// ─── Legal Modal Component ───
function LegalModal({ isOpen, onClose, title, content }) {
  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full sm:max-w-2xl max-h-[90dvh] sm:max-h-[80vh] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/[0.08] sm:rounded-2xl rounded-t-2xl shadow-2xl shadow-black/60 flex flex-col overflow-hidden animate-[fadeSlideIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/[0.06] bg-[#0d0d12]/80 flex-shrink-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          {/* Drag handle (mobile) */}
          <div className="sm:hidden absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />
          <div className="pr-8 sm:pr-0">
            <h3 className="text-base sm:text-lg font-semibold text-white">{title}</h3>
            <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5">Last updated: January 2025</p>
          </div>
          <button
            onClick={onClose}
            className="absolute right-3 sm:relative w-9 h-9 rounded-lg flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/[0.06] active:bg-white/10 transition-all duration-200 flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-6 scrollbar-thin overscroll-contain">
          {content.map((section, index) => (
            <div key={index}>
              <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3">{section.title}</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 sm:gap-3">
                    <span className="w-1 h-1 rounded-full bg-blue-500/40 flex-shrink-0 mt-1.5 sm:mt-2" />
                    <span className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/[0.06] bg-[#0d0d12]/60 flex-shrink-0">
          {/* Safe area padding for iOS */}
          <button
            onClick={onClose}
            className="w-full py-3 sm:py-2.5 text-sm font-medium text-neutral-400 hover:text-white rounded-xl border border-white/[0.08] hover:border-white/15 hover:bg-white/[0.03] active:scale-[0.98] transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const [openModal, setOpenModal] = useState(null);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative bg-[#030304] border-t border-white/[0.04]">

        {/* ─── Top Divider Glow ─── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        {/* ─── Background Subtle Effects ─── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-blue-600/[0.02] sm:bg-blue-600/[0.03] rounded-full blur-[80px] sm:blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] bg-purple-600/[0.02] sm:bg-purple-600/[0.03] rounded-full blur-[60px] sm:blur-[120px]" />
        </div>

        {/* ═══════════════════════════════════════════
            MAIN FOOTER CONTENT
            ═══════════════════════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8">

          {/* ── Top Section: Brand + Services ── */}
          <div className="pb-8 sm:pb-10 md:pb-12 border-b border-white/[0.06]">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 sm:gap-10">

              {/* Brand Column */}
              <div className="flex flex-col gap-4 sm:gap-5 max-w-md">
                {/* Logo & Brand Name */}
                <a href="#home" className="group flex items-center gap-2.5 sm:gap-3 w-fit">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.06]">
                    <img
                      src={logo}
                      alt="EthioGlobal Digital Logo"
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                      EthioGlobal Digital
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-medium text-neutral-500 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                      Digital Agency
                    </span>
                  </div>
                </a>

                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  Ethiopia&apos;s premier digital agency. We build websites, ERP systems, e-commerce platforms, and run digital marketing that drives real growth.
                </p>

                <div className="flex items-center gap-2 sm:gap-2.5">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/15 hover:bg-white/[0.08] active:scale-90 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href="tel:+251912345678"
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-500 hover:text-blue-400 transition-colors duration-300 w-fit py-1 -ml-1 pl-1"
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    +251 912 345 678
                  </a>
                  <a
                    href="mailto:info@ethioglobal.com"
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-500 hover:text-blue-400 transition-colors duration-300 w-fit py-1 -ml-1 pl-1"
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    info@ethioglobal.com
                  </a>
                </div>
              </div>

              {/* Services List */}
              <div>
                <h5 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-[0.15em] sm:tracking-wider mb-4 sm:mb-5 flex items-center gap-2">
                  <span className="w-4 sm:w-5 h-px bg-blue-500/50" />
                  Services
                </h5>
                <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-2.5 sm:gap-y-3">
                  {footerLinks.services.map((service) => (
                    <div key={service} className="flex items-center gap-2 sm:gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-blue-500/40 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-neutral-500">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Middle Section: Company + Legal + Hours ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 sm:gap-8 py-8 sm:py-10 md:py-12 border-b border-white/[0.06]">

            {/* Company */}
            <div className="col-span-1">
              <h5 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-[0.15em] sm:tracking-wider mb-4 sm:mb-5 flex items-center gap-2">
                <span className="w-4 sm:w-5 h-px bg-purple-500/50" />
                Company
              </h5>
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-neutral-500 hover:text-white transition-colors duration-300 w-fit py-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal — opens modals */}
            <div className="col-span-1">
              <h5 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-[0.15em] sm:tracking-wider mb-4 sm:mb-5 flex items-center gap-2">
                <span className="w-4 sm:w-5 h-px bg-emerald-500/50" />
                Legal
              </h5>
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => setOpenModal(link.action)}
                      className="text-xs sm:text-sm text-neutral-500 hover:text-white transition-colors duration-300 w-fit py-0.5 active:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Working Hours */}
            <div className="col-span-2 sm:col-span-1">
              <h5 className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-[0.15em] sm:tracking-wider mb-4 sm:mb-5 flex items-center gap-2">
                <span className="w-4 sm:w-5 h-px bg-amber-500/50" />
                Working Hours
              </h5>
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {[
                  { day: 'Mon – Fri', time: '9:00 – 18:00' },
                  { day: 'Saturday', time: '10:00 – 15:00' },
                  { day: 'Sunday', time: 'Closed' },
                ].map((item) => (
                  <li key={item.day} className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm text-neutral-500">{item.day}</span>
                    <span className={`text-xs sm:text-sm font-medium ${item.time === 'Closed' ? 'text-red-400/60' : 'text-neutral-300'}`}>
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 sm:mt-5 flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] w-fit">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-emerald-400">Online Support 24/7</span>
              </div>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-6 sm:pt-8">
            <p className="text-[10px] sm:text-xs text-neutral-600 text-center sm:text-left">
              © {currentYear} EthioGlobal Digital. All rights reserved. Made with{' '}
              <span className="text-red-400/60">♥</span> in Addis Ababa.
            </p>

            <div className="flex items-center gap-1.5">
              <span className="text-[9px] sm:text-[10px] text-neutral-700 uppercase tracking-wider">Powered by</span>
              <span className="text-[11px] sm:text-xs font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EthioGlobal Tech
              </span>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-[10px] sm:text-xs text-neutral-600 hover:text-white transition-colors duration-300 py-1"
            >
              Back to top
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-white/[0.06] flex items-center justify-center group-hover:border-white/15 group-hover:bg-white/[0.04] active:scale-90 transition-all duration-300">
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════
          LEGAL MODALS
          ═══════════════════════════════════════════ */}
      <LegalModal
        isOpen={openModal === 'privacy'}
        onClose={() => setOpenModal(null)}
        title="Privacy Policy"
        content={privacyContent}
      />
      <LegalModal
        isOpen={openModal === 'terms'}
        onClose={() => setOpenModal(null)}
        title="Terms of Service"
        content={termsContent}
      />
    </>
  );
}

export default Footer;