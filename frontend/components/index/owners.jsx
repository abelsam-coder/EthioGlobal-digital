
import { useState, useEffect } from 'react';
import {
  FaInstagram,
  FaTelegram,
  FaEnvelope,
  FaGithub,
  FaQuoteLeft,
  FaRocket,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaHandshake,
  FaBolt,
  FaCheckCircle,
  FaLinkedin,
  FaPhone,
  FaProjectDiagram,
  FaCode,
  FaTasks,
  FaShieldAlt
} from 'react-icons/fa';
import nati from "../../src/assets/nati.png";
import abel from "../../src/assets/ab.jpg";

function useSafeTheme() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    try {
      const html = document.documentElement;
      setIsDark(html.classList.contains('dark'));
      const obs = new MutationObserver(() => setIsDark(html.classList.contains('dark')));
      obs.observe(html, { attributes: true, attributeFilter: ['class'] });
      return () => obs.disconnect();
    } catch (e) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mq.matches);
      const h = (e) => setIsDark(e.matches);
      mq.addEventListener('change', h);
      return () => mq.removeEventListener('change', h);
    }
  }, []);
  return { isDark };
}

const socialMap = {
  instagram: { label: "Instagram", href: "#", icon: <FaInstagram className="w-3.5 h-3.5" /> },
  telegram: { label: "Telegram", href: "#", icon: <FaTelegram className="w-3.5 h-3.5" /> },
  email: { label: "Email", href: "mailto:contact@ethioglobal.com", icon: <FaEnvelope className="w-3.5 h-3.5" /> },
  github: { label: "GitHub", href: "#", icon: <FaGithub className="w-3.5 h-3.5" /> },
  linkedin: { label: "LinkedIn", href: "#", icon: <FaLinkedin className="w-3.5 h-3.5" /> },
};

const roleIcons = {
  "CEO & Founder": FaRocket,
  "CTO & Co-founder": FaCode,
  "Project Manager": FaTasks,
};

const schemes = [
  { from: '#7c3aed', via: '#8b5cf6', to: '#a855f7' },
  { from: '#6d28d9', via: '#7c3aed', to: '#a78bfa' },
  { from: '#a21caf', via: '#c026d3', to: '#e879f9' },
];

function FounderCard({ founder, isDark, index }) {
  const s = schemes[index % 3];
  const RoleIcon = roleIcons[founder.role] || FaUsers;

  return (
    <div
      className={`relative rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? 'bg-white/[0.04] border-white/[0.08]'
          : 'bg-white/80 border-gray-200/80 shadow-lg shadow-gray-100/50'
      }`}
    >
      {/* top bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${s.from}, ${s.via}, ${s.to})` }} />

      <div className="p-6">
        {/* avatar */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full p-[2px]"
              style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
            >
              <div className={`w-full h-full rounded-full p-[2px] ${isDark ? 'bg-[#0a0a1a]' : 'bg-white'}`}>
                {founder.img ? (
                  <img src={founder.img} alt={founder.name} className="w-full h-full object-cover rounded-full" loading="lazy" />
                ) : (
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-lg font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
                  >
                    {founder.initials}
                  </div>
                )}
              </div>
            </div>
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                isDark ? 'border-[#0a0a1a] bg-emerald-400' : 'border-white bg-emerald-500'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
            <div
              className={`absolute -top-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-[#0a0a1a]/90 border border-white/10' : 'bg-white border border-gray-200'
              }`}
            >
              <RoleIcon className="w-3 h-3" style={{ color: s.from }} />
            </div>
          </div>
        </div>

        {/* name + role */}
        <div className="text-center mb-4">
          <h3 className={`text-lg font-bold tracking-tight mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {founder.name}
          </h3>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white"
            style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
          >
            <span className="w-1 h-1 rounded-full bg-white/80" />
            {founder.role}
          </div>
        </div>

        {/* quote */}
        <div className={`relative rounded-xl p-4 border mb-5 ${isDark ? 'bg-white/[0.02] border-white/[0.05]' : 'bg-gray-50/50 border-gray-100'}`}>
          <FaQuoteLeft
            className="absolute -top-2 left-4 w-4 h-4 text-white rounded-full p-[3px] shadow"
            style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
          />
          <p className={`text-xs leading-relaxed pl-6 pr-1 italic ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            &ldquo;{founder.slogan}&rdquo;
          </p>
        </div>

        {/* socials */}
        <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-white/[0.05]' : 'border-gray-100'}`}>
          <div className="flex items-center gap-1.5">
            {founder.socials.map((social) => {
              const data = socialMap[social];
              return (
                <a
                  key={social}
                  href={data.href}
                  target={social === "email" ? undefined : "_blank"}
                  rel={social === "email" ? undefined : "noopener noreferrer"}
                  aria-label={data.label}
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                    isDark
                      ? 'bg-white/[0.04] border-white/[0.06] text-slate-500 hover:text-white hover:border-white/15'
                      : 'bg-white border-gray-200 text-gray-400 hover:text-gray-800 hover:border-gray-300'
                  }`}
                >
                  {data.icon}
                </a>
              );
            })}
          </div>
          <a
            href="#contact"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
            style={{ color: s.from, background: `${s.from}10`, border: `1px solid ${s.from}20` }}
          >
            Connect <FaArrowRight className="w-2 h-2" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Owners() {
  const { isDark } = useSafeTheme();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  const founders = [
    {
      img: nati,
      name: "Natinael Birhanu",
      role: "CEO & Founder",
      slogan: "Innovation isn't just about technology; it's about solving real problems for Ethiopian businesses and building something that lasts.",
      socials: ["instagram", "telegram", "email", "linkedin"],
    },
    {
      img: abel,
      name: "Abel Samuel",
      role: "CTO & Co-founder",
      slogan: "Great code is invisible. We build seamless digital experiences that drive growth and set new standards in the Ethiopian market.",
      socials: ["github", "linkedin", "telegram", "email"],
    },
    {
      img: null,
      initials: "NT",
      name: "Nahom Tadesse",
      role: "Project Manager",
      slogan: "Every successful project starts with clear communication and ends with exceeding expectations. Nothing falls through the cracks.",
      socials: ["linkedin", "telegram", "email"],
    },
  ];

  const stats = [
    { icon: FaUsers, value: "3+", label: "Core Team" },
    { icon: FaProjectDiagram, value: "50+", label: "Projects" },
    { icon: FaStar, value: "100%", label: "Retention" },
    { icon: FaHandshake, value: "15+", label: "Clients" },
  ];

  return (
    <section
      id="founders"
      className={`relative py-20 sm:py-28 overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#0a0a1a]' : 'bg-gradient-to-br from-slate-50 via-white to-violet-50/50'
      }`}
      style={{ fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif" }}
    >
      {/* background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-violet-500/15 to-purple-500/15 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-fuchsia-500/10 to-blue-500/10 blur-3xl" />
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px_1px,transparent_1px)] bg-[size:50px_50px]'
              : 'opacity-[0.03] bg-[linear-gradient(rgba(139,92,246,0.12)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.12)_1px_1px,transparent_1px)] bg-[size:50px_50px]'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* header */}
        <div
          className={`text-center mb-14 sm:mb-20 transition-all duration-700 ${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md shadow-sm mb-6 ${
              isDark ? 'border-violet-500/30 bg-violet-500/10' : 'border-violet-200 bg-white shadow-violet-100/50'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-violet-500" />
            </span>
            <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-violet-200' : 'text-violet-700'}`}>
              Leadership Team
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Meet the{' '}
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Visionaries
            </span>
          </h2>

          <p className={`text-sm sm:text-base max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            The minds behind Ethio Global Digital&apos;s mission to{' '}
            <span className={`font-semibold ${isDark ? 'text-violet-300' : 'text-violet-600'}`}>
              revolutionize Ethiopia&apos;s digital landscape
            </span>{' '}
            through innovation and commitment to excellence.
          </p>
        </div>

        {/* cards grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14 sm:mb-20 transition-all duration-700 ${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          {founders.map((founder, i) => (
            <FounderCard key={i} founder={founder} isDark={isDark} index={i} />
          ))}
        </div>

        {/* stats row */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-14 sm:mb-20 transition-all duration-700 ${
            show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center p-4 rounded-xl border transition-colors ${
                isDark ? 'border-white/5 bg-white/[0.02]' : 'border-violet-100 bg-white'
              }`}
            >
              <stat.icon className={`w-4 h-4 mx-auto mb-1.5 ${isDark ? 'text-violet-400' : 'text-violet-500'}`} />
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

       

        {/* bottom cta */}
      
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
      `}} />
    </section>
  );
}
