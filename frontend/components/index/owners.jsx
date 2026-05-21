import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import { 
  FaInstagram, 
  FaTelegram, 
  FaEnvelope, 
  FaGithub,
  FaQuoteLeft,
  FaRocket,
  FaArrowRight,
  FaLinkedin
} from 'react-icons/fa';
import nati from "../../src/assets/nati.png";
import abel from "../../src/assets/abel.jpg";

const socialMap = {
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
            </div>
          </div>
        </div>

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
            {founder.socials.map((social) => {
              const data = socialMap[social];
              return (
                <a
                  key={social}
                  href={data.href}
                  target={social === "email" ? undefined : "_blank"}
                  rel={social === "email" ? undefined : "noopener noreferrer"}
                  aria-label={data.label}
                  className={
                    "relative w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 " +
                    (isDark
                      ? "bg-white/[0.04] border-white/[0.06] text-neutral-500 hover:text-white hover:bg-white/[0.08]"
                      : "bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:shadow-md"
                    )
                  }
                >
                  <span className="relative z-10">{data.icon}</span>
                </a>
              );
            })}
          </div>

          <button className={
            "hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 " +
            c.bg + " " + c.text + " " + c.border
          }>
            Connect
            <FaArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Owners() {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const founders = [
    {
      img: nati,
      name: "Natinael Birhanu",
      role: "CEO & Founder",
      slogan: "Innovation isn't just about technology; it's about solving real problems for Ethiopian businesses.",
      socials: ["instagram", "telegram", "email"],
    },
    {
      img: abel,
      name: "Abel Samuel",
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
    </section>
  );
}