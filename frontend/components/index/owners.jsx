import nati from "../../src/assets/nati.png";
import abel from "../../src/assets/abel.jpg";

const socialMap = {
  instagram: {
    label: "Instagram",
    href: "#",
    hoverColor: "hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/10",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  telegram: {
    label: "Telegram",
    href: "#",
    hoverColor: "hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-500/10",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  email: {
    label: "Email",
    href: "mailto:",
    hoverColor: "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/10",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  github: {
    label: "GitHub",
    href: "#",
    hoverColor: "hover:text-white hover:border-white/20 hover:bg-white/[0.08]",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
};

function Owners() {
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
      socials: ["github", "instagram", "telegram", "email"],
    },
  ];

  return (
    <section id="founders" className="relative bg-[#050505] py-24 overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold text-purple-400 uppercase tracking-[0.2em] mb-3">
            The Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
            Meet the{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Founders
            </span>
          </h2>
          <p className="text-neutral-500 text-sm max-w-md mx-auto leading-relaxed">
            Driving Ethio Global Digital's mission to revolutionize the tech landscape.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
            >
              {/* Hover top gradient line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-t-2xl" />

              {/* Image — no glow */}
              <div className="relative mx-auto w-24 h-24 mb-5">
                <div className="w-full h-full rounded-full p-[1.5px] bg-gradient-to-br from-neutral-700 to-neutral-800 group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-500">
                  <img
                    src={founder.img}
                    alt={founder.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-semibold text-white tracking-tight mb-1">
                {founder.name}
              </h3>
              <p className="text-xs font-medium text-blue-400/80 uppercase tracking-wider mb-4">
                {founder.role}
              </p>

              {/* Slogan / Quote */}
              <div className="relative bg-white/[0.02] rounded-xl p-4 mb-5 border border-white/[0.04]">
                <span className="absolute top-2 left-3 text-2xl font-serif text-white/[0.05] leading-none select-none">
                  &ldquo;
                </span>
                <p className="text-xs text-neutral-500 leading-relaxed pl-4 italic">
                  {founder.slogan}
                </p>
              </div>

              {/* Social Icons — dynamic from socials array */}
              <div className="flex items-center justify-center gap-2">
                {founder.socials.map((social) => {
                  const data = socialMap[social];
                  return (
                    <a
                      key={social}
                      href={data.href}
                      target={social === "email" ? undefined : "_blank"}
                      rel={social === "email" ? undefined : "noopener noreferrer"}
                      aria-label={data.label}
                      className={`w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-neutral-500 ${data.hoverColor} transition-all duration-300`}
                    >
                      {data.icon}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Owners;