import { useState, useEffect } from 'react';
import { 
  FaCheckCircle, 
  FaTimesCircle,
  FaCrown,
  FaRocket,
  FaStar,
  FaGem,
  FaFire,
  FaArrowRight,
  FaShieldAlt,
  FaHeadset,
  FaBolt,
  FaGift
} from 'react-icons/fa';
import { useTheme } from '../../src/context/ThemeContext';

function Pricing() {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const plans = [
    {
      name: 'Starter',
      icon: FaRocket,
      price: '2,500',
      period: '/month',
      description: 'Perfect for small businesses just starting out',
      color: 'from-blue-500 to-cyan-500',
      popular: false,
      features: [
        { text: '8 Posts per Month', included: true },
        { text: 'Basic Content Creation', included: true },
        { text: 'Community Management', included: true },
        { text: 'Monthly Report', included: true },
        { text: 'Ad Management', included: false },
        { text: 'Priority Support', included: false },
        { text: 'Custom Graphics', included: false }
      ]
    },
    {
      name: 'Growth',
      icon: FaFire,
      price: '5,000',
      period: '/month',
      description: 'For businesses ready to scale up',
      color: 'from-emerald-500 to-teal-500',
      popular: true,
      badge: 'MOST POPULAR',
      features: [
        { text: '16 Posts per Month', included: true },
        { text: 'Premium Content Creation', included: true },
        { text: 'Community Management', included: true },
        { text: 'Weekly Reports', included: true },
        { text: 'Basic Ad Management', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Custom Graphics', included: false }
      ]
    },
    {
      name: 'Premium',
      icon: FaCrown,
      price: '9,000',
      period: '/month',
      description: 'Full-service management for serious growth',
      color: 'from-purple-500 to-pink-500',
      popular: false,
      badge: 'BEST VALUE',
      features: [
        { text: '24 Posts per Month', included: true },
        { text: 'VIP Content Creation', included: true },
        { text: '24/7 Community Management', included: true },
        { text: 'Daily Analytics', included: true },
        { text: 'Advanced Ad Management', included: true },
        { text: 'Dedicated Account Manager', included: true },
        { text: 'Custom Videos & Graphics', included: true }
      ]
    }
  ];

  return (
    // ═══ TRANSPARENT - INHERITS BG FROM MAIN LAYOUT ═══
    <section id="pricing" className="relative py-20 sm:py-28 overflow-hidden bg-transparent">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
            isDark ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-purple-50 text-purple-600 border border-purple-200'
          }`}>
            <FaGem className="w-4 h-4" />
            Simple Pricing
          </div>

          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Choose Your Plan
          </h2>
          
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto mb-4 ${
            isDark ? 'text-neutral-400' : 'text-gray-600'
          }`}>
            Transparent pricing with no hidden fees. Cancel anytime.
          </p>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDark ? 'bg-yellow-500/10' : 'bg-yellow-50'
          }`}>
            <FaGift className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <span className={`text-sm font-semibold ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
              First Month FREE on all plans!
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group rounded-3xl transition-all duration-500 hover:-translate-y-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${plan.popular ? 'lg:scale-105 z-10' : ''}`}
              style={{ transitionDelay: (index * 150 + 300) + 'ms' }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className={'px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg bg-gradient-to-r ' + plan.color + ' text-white'}>
                    ⭐ {plan.badge}
                  </div>
                </div>
              )}

              {/* Card - Glass Effect */}
              <div className={'relative h-full p-8 sm:p-10 rounded-3xl transition-all duration-500 ' + (
                isDark 
                  ? ('bg-white/[0.04] border-2 ' + (plan.popular ? 'border-emerald-500/40 shadow-2xl shadow-emerald-500/10' : 'border-white/[0.08] hover:border-white/[0.15]') + ' backdrop-blur-xl')
                  : ('bg-white/80 border-2 ' + (plan.popular ? 'border-emerald-400 shadow-2xl shadow-emerald-200/50' : 'border-white/50 hover:border-white/70') + ' shadow-xl backdrop-blur-sm')
              ) + ' ' + (hoveredCard === index ? (isDark ? 'shadow-2xl shadow-emerald-500/15' : 'shadow-2xl') : '')}>
                
                {/* Glow on Hover */}
                {hoveredCard === index && (
                  <div className={'absolute inset-0 rounded-3xl bg-gradient-to-br ' + plan.color + ' opacity-5 blur-xl -z-10'} />
                )}

                {/* Icon & Name */}
                <div className="flex items-center justify-between mb-6">
                  <div className={'inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ' + plan.color + ' shadow-lg group-hover:scale-110 transition-transform duration-300'}>
                    <plan.icon className="w-7 h-7 text-white" />
                  </div>
                  {plan.popular && (
                    <FaStar className={'w-5 h-5 ' + (isDark ? 'text-yellow-400' : 'text-yellow-500')} />
                  )}
                </div>

                <h3 className={'text-2xl font-bold mb-2 ' + (isDark ? 'text-white' : 'text-gray-900')}>
                  {plan.name}
                </h3>
                
                <p className={'text-sm mb-6 ' + (isDark ? 'text-neutral-400' : 'text-gray-600')}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className={'mb-8 pb-6 border-b-2 ' + (isDark ? 'border-white/[0.06]' : 'border-black/5')}>
                  <div className="flex items-baseline gap-1">
                    <span className={'text-lg font-semibold ' + (isDark ? 'text-neutral-400' : 'text-gray-500')}>ETB</span>
                    <span className={'text-5xl font-black ' + (isDark ? 'text-white' : 'text-gray-900')}>{plan.price}</span>
                    <span className={'text-base ' + (isDark ? 'text-neutral-500' : 'text-gray-500')}>{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <FaCheckCircle className={'w-5 h-5 mt-0.5 flex-shrink-0 ' + (plan.popular ? 'text-emerald-500' : (isDark ? 'text-emerald-400' : 'text-emerald-600'))} />
                      ) : (
                        <FaTimesCircle className={'w-5 h-5 mt-0.5 flex-shrink-0 ' + (isDark ? 'text-neutral-600' : 'text-gray-400')} />
                      )}
                      <span className={'text-sm ' + (feature.included ? (isDark ? 'text-neutral-200' : 'text-gray-700') : (isDark ? 'text-neutral-600' : 'text-gray-400'))}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={'group/btn w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] ' + (
                  plan.popular
                    ? ('bg-gradient-to-r ' + plan.color + ' text-white hover:shadow-2xl')
                    : (isDark
                      ? 'bg-white/5 text-white border-2 border-white/10 hover:bg-white/10 hover:border-white/20'
                      : 'bg-white/60 text-gray-800 border-2 border-white/40 hover:bg-white/90 hover:border-white/60')
                )}>
                  <span className="flex items-center justify-center gap-2">
                    Get Started
                    <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <div className={`text-center mt-12 flex flex-wrap items-center justify-center gap-6 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center gap-2">
            <FaShieldAlt className={'w-5 h-5 ' + (isDark ? 'text-emerald-400' : 'text-emerald-600')} />
            <span className={'text-sm font-medium ' + (isDark ? 'text-neutral-300' : 'text-gray-600')}>No Contract</span>
          </div>
          
          <div className={'w-1.5 h-1.5 rounded-full ' + (isDark ? 'bg-neutral-700' : 'bg-gray-300')} />
          
          <div className="flex items-center gap-2">
            <FaHeadset className={'w-5 h-5 ' + (isDark ? 'text-blue-400' : 'text-blue-600')} />
            <span className={'text-sm font-medium ' + (isDark ? 'text-neutral-300' : 'text-gray-600')}>24/7 Support</span>
          </div>
          
          <div className={'w-1.5 h-1.5 rounded-full ' + (isDark ? 'bg-neutral-700' : 'bg-gray-300')} />
          
          <div className="flex items-center gap-2">
            <FaBolt className={'w-5 h-5 ' + (isDark ? 'text-yellow-400' : 'text-yellow-600')} />
            <span className={'text-sm font-medium ' + (isDark ? 'text-neutral-300' : 'text-gray-600')}>Instant Setup</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Pricing;