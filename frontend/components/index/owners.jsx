import { useState, useEffect } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import { 
  FaInstagram, 
  FaTelegram, 
  FaEnvelope, 
  FaGithub,
  FaQuoteLeft,
  FaRocket,
  FaUsers,
  FaProjectDiagram,
  FaClock,
  FaStar,
  FaHandshake,
  FaArrowRight
} from 'react-icons/fa';
import nati from "../../src/assets/nati.png";
import abel from "../../src/assets/abel.jpg";

const socialMap = {
  instagram: {
    label: "Instagram",
    href: "#",
    icon: <FaInstagram className="w-4 h-4" />,
  },
  telegram: {
    label: "Telegram",
    href: "#",
    icon: <FaTelegram className="w-4 h-4" />,
  },
  email: {
    label: "Email",
    href: "mailto:",
    icon: <FaEnvelope className="w-4 h-4" />,
  },
  github: {
    label: "GitHub",
    href: "#",
    icon: <FaGithub className="w-4 h-4" />,
  },
};

// ══════════════════════════════════════════
// FOUNDER CARD COMPONENT
// ══════════════════════════════════════════
function FoundersCard({ founder, isDark, index = 0 }) {
  const isEven = index % 2 === 0;
  
  return (
    <div
      className={`group relative transition-all duration-700 ${
        isEven ? 'lg:-translate-y-8' : 'lg:translate-y-8'
      }`}
    >
      {/* Main Card Container */}
      <div
        className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
          isDark
            ? 'bg-gradient-to-br from-white/[0.03] via-white/[0.05] to-transparent border border-white/[0.08] backdrop-blur-xl shadow-2xl shadow-black/20'
            : 'bg-white border border-gray-200/80 shadow-2xl shadow-gray-200/50'
        } group-hover:shadow-3xl group-hover:scale-[1.02] active:scale-[0.98]`}
      >
        
        {/* TOP SECTION: Image + Name */}
        <div className="relative p-6 sm:p-8 pb-0">
          {/* Background Decoration */}
          <div
            className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-all duration-1000 group-hover:scale-150 ${
              isEven ? 'bg-blue-500/[0.08]' : 'bg-purple-500/[0.08]'
            }`}
          />

          {/* Profile Image */}
          <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40 mb-6">
            <div
              className={`absolute inset-0 rounded-full p-[3px] bg-conic-gradient transition-all duration-1000 ${
                isDark 
                  ? isEven ? 'from-blue-500 via-purple-500 to-pink-500' : 'from-purple-500 via-pink-500 to-blue-500'
                  : isEven ? 'from-blue-400 via-cyan-400 to-blue-600' : 'from-purple-400 via-pink-400 to-purple-600'
              } animate-spin-slow`}
              style={{ animationDuration: '8s' }}
            >
              <div className={`w-full h-full rounded-full p-[2px] ${isDark ? 'bg-[#0a0a0f]' : 'bg-white'}`}>
                <img 
                  src={founder.img} 
                  alt={founder.name}
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Online Status Dot */}
            <div
              className={`absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                isDark ? 'border-[#0a0a0f] bg-emerald-400' : 'border-white bg-emerald-500'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>

          {/* Name & Role */}
          <div className="text-center mb-4">
            <h3
              className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
                isDark ? 'from-white via-gray-200 to-neutral-400' : 'from-gray-900 via-gray-700 to-gray-500'
              }`}
            >
              {founder.name}
            </h3>
            
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                isDark 
                  ? `${isEven ? 'text-blue-400/90 bg-blue-500/10 border border-blue-500/20' : 'text-purple-400/90 bg-purple-500/10 border border-purple-500/20'}`
                  : `${isEven ? 'text-blue-600 bg-blue-50 border-blue-200' : 'text-purple-600 bg-purple-50 border-purple-200'}`
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {founder.role}
            </div>
          </div>
        </div>

        {/* QUOTE SECTION */}
        <div className="px-6 sm:px-8 pb-6">
          <div
            className={`relative rounded-2xl p-5 sm:p-6 border backdrop-blur-sm transition-all duration-300 group-hover:scale-[1.02] overflow-hidden ${
              isDark ? 'bg-white/[0.02] border-white/[0.04]' : 'bg-gradient-to-br from-gray-50 to-white border-gray-100'
            }`}
          >
            {/* Quote Mark Icon */}
            <div
              className={`absolute -top-3 left-6 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 ${
                isDark 
                  ? `bg-gradient-to-br ${isEven ? 'from-blue-500 to-purple-500' : 'from-purple-500 to-pink-500'}`
                  : `bg-gradient-to-br ${isEven ? 'from-blue-400 to-cyan-400' : 'from-purple-400 to-pink-400'}`
              } shadow-lg`}
            >
              <FaQuoteLeft className="w-4 h-4 text-white" />
            </div>

            <p
              className={`text-sm leading-relaxed pl-8 pr-4 italic font-medium transition-colors duration-300 ${
                isDark ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-gray-500 group-hover:text-gray-600'
              }`}
            >
              "{founder.slogan}"
            </p>

            {/* Decorative Line */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
                isDark ? 'from-transparent via-blue-500/30 to-transparent' : 'from-transparent via-purple-300/40 to-transparent'
              }`}
            />
          </div>
        </div>

        {/* SOCIAL ICONS BAR */}
        <div
          className={`px-6 sm:px-8 py-5 flex items-center justify-between border-t backdrop-blur-sm transition-colors duration-300 ${
            isDark ? 'border-white/[0.04] bg-black/20' : 'border-gray-100 bg-gray-50/50'
          }`}
        >
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
                  className={`
                    relative w-10 h-10 rounded-xl border flex items-center justify-center
                    transition-all duration-300 overflow-hidden group/social
                    
                    ${isDark
                      ? 'bg-white/[0.04] border-white/[0.06] text-neutral-500 hover:text-white hover:border-white/15 hover:bg-white/[0.08]'
                      : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:shadow-md'
                    }
                  `}
                >
                  {/* Hover Glow */}
                  <div
                    className={`absolute inset-0 rounded-xl opacity-0 group-hover/social:opacity-100 blur-lg transition-all duration-300 ${
                      isEven ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                    }`}
                  />

                  <span className="relative z-10 transition-transform duration-300 group-hover/social:scale-125 group-hover/social:-rotate-12">
                    {data.icon}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Connect Button */}
          <button
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${
              isDark
                ? `${isEven ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40' : 'text-purple-400 bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/40'}`
                : `${isEven ? 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100' : 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100'}`
            }`}
          >
            Connect
            <FaArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div
        className={`absolute -z-10 -top-10 -right-10 w-40 h-40 rounded-full blur-2xl transition-all duration-1000 group-hover:scale-200 ${
          isEven ? 'bg-blue-500/20' : 'bg-purple-500/20'
        }`}
      />

      <div
        className={`absolute -bottom-2 -right-2 w-20 h-20 rotate-45 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1 ${
          isDark 
            ? `bg-gradient-to-bl ${isEven ? 'from-blue-500/20 to-transparent' : 'from-purple-500/20 to-transparent'}`
            : `bg-gradient-to-bl ${isEven ? 'from-blue-200/30 to-transparent' : 'from-purple-200/30 to-transparent'}`
        }`}
      />
    </div>
  );
}

// ══════════════════════════════════════════
// MAIN OWNERS COMPONENT
// ══════════════════════════════════════════
export default function Owners() {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const founders = [
    {
      img: "a",
      name: "Natinael Birhanu",
      role: "CEO & Founder",
      slogan: "Innovation isn't just about technology; it's about solving real problems for Ethiopian businesses.",
      socials: ["instagram", "telegram", "email"],
    },
    {
      img: "b",
      name: "Nahom Samuel",
      role: "CTO & Co-founder",
      slogan: "Great code is invisible. It creates seamless digital experiences that drive our clients' growth.",
      socials: ["github", "instagram", "telegram", "email"],
    },
  ];

  return (
    <section
      id="founders"
      className={`relative py-24 sm:py-32 md:py-40 overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-[#030308]' : 'bg-gradient-to-b from-white via-purple-50/10 to-blue-50/10'
      }`}
    >
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div
          className={`absolute top-1/4 left-1/3 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] md:w-[900px] md:h-[900px] rounded-full blur-[120px] sm:blur-[180px] md:blur-[220px] animate-morph-main transition-colors duration-1000 ${
            isDark ? 'bg-indigo-600/[0.07]' : 'bg-indigo-300/20'
          }`}
        />
        
        <div
          className={`absolute bottom-1/4 right-1/4 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] md:w-[800px] md:h-[800px] rounded-full blur-[100px] sm:blur-[160px] md:blur-[200px] animate-morph-secondary transition-colors duration-1000 ${
            isDark ? 'bg-violet-600/[0.05]' : 'bg-violet-300/18'
          }`}
        />

        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[550px] sm:h-[550px] rounded-full blur-[90px] sm:blur-[140px] animate-float-orb transition-colors duration-1000 ${
            isDark ? 'bg-fuchsia-600/[0.04]' : 'bg-fuchsia-200/12'
          }`}
        />

        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark
            ? 'opacity-[0.02] bg-[linear-gradient(rgba(99,102,241,0.08)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.08)_1px_1px,transparent_1px)] bg-[size:60px_60px]'
            : 'opacity-[0.03] bg-[linear-gradient(rgba(129,140,248,0.12)_1px_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.12)_1px_1px,transparent_1px)] bg-[size:60px_60px]'
          }`}
        />

        {/* Radial Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isDark ? 'from-transparent via-[#030308]/50 to-[#030308]' : 'from-transparent via-white/40 to-white'
          }`}
        />

        {/* Animated Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-drift"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: isDark 
                ? `rgba(${139 + Math.random() * 116}, ${92 + Math.random() * 92}, ${246 + Math.random() * 9}, ${0.3 + Math.random() * 0.4})`
                : `rgba(${59 + Math.random() * 130}, ${130 + Math.random() * 125}, ${246 + Math.random() * 9}, ${0.4 + Math.random() * 0.4})`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div
          className={`text-center mb-16 sm:mb-20 md:mb-28 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 ${
              isDark
                ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 shadow-lg shadow-indigo-500/20'
                : 'bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 border border-indigo-200 shadow-lg shadow-indigo-200/30'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-indigo-500" />
            </span>
            <span
              className={`text-xs font-bold tracking-widest uppercase ${
                isDark ? 'text-indigo-300' : 'text-indigo-600'
              }`}
            >
              Leadership Team
            </span>
          </div>

          {/* Title */}
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 sm:mb-8 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            Meet the{' '}
            <span
              className={`relative inline-block bg-gradient-to-r bg-clip-text text-transparent ${
                isDark 
                  ? 'from-indigo-400 via-purple-400 via-fuchsia-400 to-pink-400' 
                  : 'from-indigo-600 via-purple-600 via-fuchsia-600 to-pink-600'
              }`}
            >
              Visionaries
            </span>
            
            <span
              className={`absolute -bottom-2 left-0 right-0 h-2 sm:h-3 rounded-full blur-sm transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              } ${isDark ? 'from-indigo-500/50 via-purple-500/50 to-pink-500/50' : 'from-indigo-400/60 via-purple-400/60 to-pink-400/60'}`}
              style={{ transformOrigin: 'left' }}
            />
          </h2>

          {/* Subtitle */}
          <p
            className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${isDark ? 'text-neutral-400' : 'text-gray-500'}`}
            style={{ transitionDelay: '250ms' }}
          >
            The brilliant minds behind Ethio Global Digital&apos;s mission to{' '}
            <span
              className={`font-semibold transition-colors duration-300 ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            >
              revolutionize Ethiopia's digital landscape
            </span>
            {' '}through innovation, creativity, and unwavering commitment to excellence.
          </p>
        </div>

        {/* Founders Display */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-start transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {founders.map((founder, index) => (
            <FoundersCard
              key={index}
              founder={founder}
              isDark={isDark}
              index={index}
            />
          ))}
        </div>

        {/* Connection Divider */}
        <div
          className={`mt-20 sm:mt-24 md:mt-32 flex items-center gap-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div
            className={`flex-1 h-px rounded-full transition-all duration-500 ${
              isDark ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-300 to-transparent'
            }`}
          />
          
        
          
          <div
            className={`flex-1 h-px rounded-full transition-all duration-500 ${
              isDark ? 'bg-gradient-to-l from-transparent via-white/10 to-transparent' : 'bg-gradient-to-l from-transparent via-gray-300 to-transparent'
            }`}
          />
        </div>

     

        {/* CTA Section */}
        <div
          className={`mt-16 sm:mt-20 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <p
            className={`text-sm sm:text-base mb-6 transition-colors duration-300 ${
              isDark ? 'text-neutral-500' : 'text-gray-500'
            }`}
          >
            Interested in collaborating with our visionary team?
          </p>
          
          <a
            href="#contact"
            className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 ${
              isDark
                ? 'text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50'
                : 'text-white shadow-lg shadow-indigo-400/30 hover:shadow-xl hover:shadow-indigo-400/50'
            }`}
            style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A78BFA 100%)' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
            
            <span className="relative z-10 flex items-center gap-2">
              Start Your Project
              <FaRocket className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes morph-main {
          0%, 100% { 
            border-radius: 45% 55% 60% 40% / 55% 45% 40% 60%; 
            transform: scale(1) rotate(0deg); 
          }
          33% { 
            border-radius: 60% 40% 45% 55% / 40% 60% 55% 45%; 
            transform: scale(1.08) rotate(5deg); 
          }
          66% { 
            border-radius: 35% 65% 55% 45% / 65% 35% 45% 55%; 
            transform: scale(0.95) rotate(-3deg); 
          }
        }

        @keyframes morph-secondary {
          0%, 100% { 
            border-radius: 55% 45% 40% 60% / 45% 55% 60% 40%; 
            transform: scale(1) rotate(0deg); 
          }
          50% { 
            border-radius: 40% 60% 55% 45% / 55% 40% 45% 60%; 
            transform: scale(1.06) rotate(-4deg); 
          }
        }

        @keyframes float-orb {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.6; 
          }
          50% { 
            transform: translateY(-30px) scale(1.15); 
            opacity: 0.9; 
          }
        }

        @keyframes drift {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1); 
            opacity: 0.3; 
          }
          25% { 
            transform: translateY(-20px) translateX(10px) scale(1.1); 
            opacity: 0.5; 
          }
          50% { 
            transform: translateY(-10px) translateX(-8px) scale(0.95); 
            opacity: 0.4; 
          }
          75% { 
            transform: translateY(-25px) translateX(12px) scale(1.05); 
            opacity: 0.55; 
          }
        }

        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-morph-main { 
          animation: morph-main 12s ease-in-out infinite; 
        }

        .animate-morph-secondary { 
          animation: morph-secondary 15s ease-in-out infinite; 
        }

        .animate-float-orb { 
          animation: float-orb 10s ease-in-out infinite; 
        }

        .animate-drift { 
          animation: drift 10s ease-in-out infinite; 
        }
      `}</style>
    </section>
  );
}