function Service() {
  const packages = [
    {
      name: "Social Media Management",
      price: "50,000",
      description:
        "Perfect for startups looking to build brand awareness and engage their audience online.",
      features: [
        "3 Social Media Platforms Setup",
        "12 Content Posts per Month",
        "Basic Graphic Design & Reels",
        "Community Management & Replies",
        "Monthly Analytics Report",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Growth Package",
      price: "250,000",
      description:
        "Ideal for established businesses needing aggressive digital marketing without dev costs.",
      features: [
        "Everything in Social Media, plus:",
        "Advanced SEO Optimization",
        "Google & Meta Ads Management",
        "Email Marketing Campaigns",
        "Landing Page Design (UI/UX)",
        "Conversion Rate Optimization",
      ],
      cta: "Choose Growth",
      popular: false,
    },
    {
      name: "Full Digital Suite",
      price: "550,000",
      description:
        "The ultimate end-to-end solution. We build your tech stack and fill it with traffic.",
      features: [
        "Everything in Growth Package, plus:",
        "Custom Website Development",
        "Mobile App Development (iOS/Android)",
        "Advanced API Integrations",
        "Dedicated Project Manager",
        "6 Months Post-Launch Support",
      ],
      cta: "Get Full Suite",
      popular: true,
    },
  ];

  return (
    <section
      id="services"
      className="relative bg-[#050505] py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* ─── Background Effects ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] lg:w-[700px] lg:h-[700px] bg-blue-600/5 rounded-full blur-[80px] sm:blur-[130px] lg:blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="text-center max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-semibold text-blue-400 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4">
            Pricing &amp; Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4 sm:mb-5">
            Transparent Packages for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Every Scale
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 leading-relaxed px-2">
            Choose a plan that fits your business goals. No hidden fees, just
            pure digital transformation.
          </p>
        </div>

        {/* ── Pricing Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-start">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`group relative flex flex-col rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 transition-all duration-500 ${
                pkg.popular
                  ? "bg-gradient-to-b from-blue-500/[0.08] to-purple-500/[0.05] border border-blue-500/20 shadow-2xl shadow-blue-500/10 md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none lg:scale-105 z-10"
                  : "bg-white/[0.02] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.04]"
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-0.5 sm:py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-blue-500/25">
                  <span className="text-[10px] sm:text-xs font-semibold text-white whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-5 sm:mb-6 pt-1 sm:pt-2">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {pkg.name}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed min-h-[36px] sm:min-h-[40px]">
                  {pkg.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6 sm:mb-8">
                <span className="text-xs sm:text-sm text-neutral-400 font-medium">
                  ETB
                </span>
                <span
                  className={`text-4xl sm:text-5xl font-bold tracking-tight ${
                    pkg.popular ? "text-white" : "text-neutral-200"
                  }`}
                >
                  {pkg.price}
                </span>
                <span className="text-xs sm:text-sm text-neutral-500 ml-1">
                  Birr
                </span>
              </div>

              {/* Features List */}
              <ul className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-10 flex-grow">
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 sm:gap-3"
                  >
                    <div
                      className={`mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center ${
                        pkg.popular ? "bg-blue-500/20" : "bg-white/[0.06]"
                      }`}
                    >
                      <svg
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                          pkg.popular ? "text-blue-400" : "text-neutral-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span
                      className={`leading-snug ${
                        pkg.features[0].startsWith("Everything")
                          ? i === 0
                            ? "text-xs sm:text-sm text-blue-400/70 font-medium"
                            : "text-xs sm:text-sm text-neutral-400"
                          : "text-xs sm:text-sm text-neutral-400"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#contact"
                className={`relative flex items-center justify-center w-full py-3 sm:py-3.5 text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl overflow-hidden transition-all duration-500 active:scale-[0.98] ${
                  pkg.popular
                    ? "text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                    : "text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                {pkg.popular && (
                  <>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 skew-x-12" />
                  </>
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {pkg.cta}
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* ── Bottom Note ── */}
        <p className="text-center text-[10px] sm:text-xs text-neutral-600 mt-8 sm:mt-10 lg:mt-12 px-4 sm:px-8 max-w-2xl mx-auto leading-relaxed">
          * All packages include a dedicated account manager and monthly
          performance reporting. Custom enterprise solutions are also available.
        </p>
      </div>
    </section>
  );
}

export default Service;