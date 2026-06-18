
import { useState, useEffect } from 'react';
import {
  FaInstagram,
  FaTelegram,
  FaEnvelope,
  FaGithub,
  FaQuoteLeft,
  FaRocket,
  FaArrowRight,
<<<<<<< HEAD
  FaLinkedin
=======
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
>>>>>>> f6e3aaddc941bc52fe5ab268ff66848551416a8e
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
<<<<<<< HEAD
  instagram: { label: "Instagram", href: "#", icon: <FaInstagram className="w-4 h-4" /> },
  telegram: { label: "Telegram", href: "#", icon: <FaTelegram className="w-4 h-4" /> },
  email: { label: "Email", href: "mailto:", icon: <FaEnvelope className="w-4 h-4" /> },
  github: { label: "GitHub", href: "#", icon: <FaGithub className="w-4 h-4" /> },
  linkedin: { label: "LinkedIn", href: "#", icon: <FaLinkedin className="w-4 h-4" /> },
};

function FoundersCard({ founder, isDark, index }) {
  const colorSchemes = [
    { gradient: "from-blue-500 via-cyan-500 to-blue-600", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    { gradient: "from-purple-500 via-pink-500 to-purple-600", bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    { gradient: "from-emerald-500 via-teal-500 to-emerald-600", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" }
  ];
  
  const c = colorSchemes[index % 3];

  return (
    <div className="group relative">
      <div className={
        "relative rounded-3xl overflow-hidden transition-all duration-500 h-full " +
        (isDark
          ? "bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl hover:border-white/[0.15]"
          : "bg-white/80 border border-white/60 backdrop-blur-sm hover:border-white/80 shadow-lg"
        ) + " group-hover:shadow-2xl group-hover:-translate-y-2"
      }>
        
        {/* Top Section */}
        <div className="relative p-8 pb-0">
          <div className={"absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150 " + c.bg} />

          {/* Profile Image */}
          <div className="relative mx-auto w-36 h-36 mb-6">
            <div className={"absolute inset-0 rounded-full p-[3px] bg-gradient-to-r " + c.gradient}>
              <div className={"w-full h-full rounded-full p-[2px] " + (isDark ? "bg-[#030712]" : "bg-white")}>
                <img 
                  src={founder.img} 
                  alt={founder.name}
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Status */}
            <div className={"absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 flex items-center justify-center " + (isDark ? "border-[#030712] bg-emerald-400" : "border-white bg-emerald-500")}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          {/* Name & Role */}
          <div className="text-center mb-5">
            <h3 className={"text-xl sm:text-2xl font-bold mb-2 " + (isDark ? "text-white" : "text-gray-900")}>
              {founder.name}
            </h3>
            
            <div className={"inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider " + c.bg + " " + c.text + " " + c.border}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {founder.role}
=======
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
>>>>>>> f6e3aaddc941bc52fe5ab268ff66848551416a8e
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Quote */}
        <div className="px-8 pb-6">
          <div className={
            "relative rounded-2xl p-5 border transition-all duration-300 " +
            (isDark ? "bg-white/[0.03] border-white/[0.05]" : "bg-gray-50/80 border-gray-100/50")
          }>
            <div className={"absolute -top-3 left-6 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r " + c.gradient + " shadow-lg"}>
              <FaQuoteLeft className="w-4 h-4 text-white" />
            </div>
            <p className={"text-sm leading-relaxed pl-8 italic " + (isDark ? "text-neutral-400" : "text-gray-600")}>
              "{founder.slogan}"
            </p>
          </div>
        </div>

        {/* Social Bar */}
        <div className={
          "px-8 py-5 flex items-center justify-between border-t " +
          (isDark ? "border-white/[0.04] bg-black/20" : "border-gray-100/50 bg-gray-50/30")
        }>
          <div className="flex items-center gap-2">
=======
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
>>>>>>> f6e3aaddc941bc52fe5ab268ff66848551416a8e
            {founder.socials.map((social) => {
              const data = socialMap[social];
              return (
                <a
                  key={social}
                  href={data.href}
                  target={social === "email" ? undefined : "_blank"}
                  rel={social === "email" ? undefined : "noopener noreferrer"}
                  aria-label={data.label}
<<<<<<< HEAD
                  className={
                    "relative w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 " +
                    (isDark
                      ? "bg-white/[0.04] border-white/[0.06] text-neutral-500 hover:text-white hover:bg-white/[0.08]"
                      : "bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:shadow-md"
                    )
                  }
                >
                  <span className="relative z-10">{data.icon}</span>
=======
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                    isDark
                      ? 'bg-white/[0.04] border-white/[0.06] text-slate-500 hover:text-white hover:border-white/15'
                      : 'bg-white border-gray-200 text-gray-400 hover:text-gray-800 hover:border-gray-300'
                  }`}
                >
                  {data.icon}
>>>>>>> f6e3aaddc941bc52fe5ab268ff66848551416a8e
                </a>
              );
            })}
          </div>
<<<<<<< HEAD

          <button className={
            "hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 " +
            c.bg + " " + c.text + " " + c.border
          }>
            Connect
            <FaArrowRight className="w-3 h-3" />
          </button>
=======
          <a
            href="#contact"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
            style={{ color: s.from, background: `${s.from}10`, border: `1px solid ${s.from}20` }}
          >
            Connect <FaArrowRight className="w-2 h-2" />
          </a>
>>>>>>> f6e3aaddc941bc52fe5ab268ff66848551416a8e
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
<<<<<<< HEAD

      img: abel,
      name: "Abel Samuel",
      img: "b",
      name: "Nahom Samuel",
      role: "CTO & Co-founder",
      slogan: "Great code is invisible. It creates seamless digital experiences that drive our clients' growth.",
      socials: ["github", "linkedin", "telegram", "email"],
    },
    {
      img: nati,
      name: "Nahom Samuel",
      role: "Lead Developer",
      slogan: "Building robust solutions that scale. Every line of code serves a purpose in transforming businesses.",
      socials: ["github", "linkedin", "email"],
    }
  ];

  return (
    <section id="founders" className="relative py-20 sm:py-28 overflow-hidden bg-transparent">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={
          "text-center mb-16 sm:mb-20 transition-all duration-700 " +
          (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")
        }>
          
          <div className={
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 " +
            (isDark ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "bg-indigo-50 text-indigo-600 border border-indigo-200")
          }>
            Our Team
          </div>

          <h2 className={
            "text-4xl sm:text-5xl md:text-6xl font-black mb-6 " +
            (isDark ? "text-white" : "text-gray-900")
          }>
            Meet the{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Team
            </span>
          </h2>

          <p className={
            "text-lg max-w-2xl mx-auto " +
            (isDark ? "text-neutral-400" : "text-gray-600")
          }>
            The brilliant minds behind EthioGlobal Digital's mission to revolutionize Ethiopia's digital landscape.
          </p>
        </div>

        {/* Grid - 3 Columns */}
        <div className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 " +
          (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")
        }>
          {founders.map((founder, index) => (
            <FoundersCard
              key={index}
              founder={founder}
              isDark={isDark}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div className={
          "text-center mt-16 transition-all duration-700 delay-500 " +
          (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")
        }>
          <p className={"text-sm mb-6 " + (isDark ? "text-neutral-500" : "text-gray-500")}>
            Want to join our team?
          </p>
          
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)" }}
          >
            <FaRocket className="w-5 h-5" />
            Get In Touch
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
=======
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
>>>>>>> f6e3aaddc941bc52fe5ab268ff66848551416a8e
    </section>
  );
}
