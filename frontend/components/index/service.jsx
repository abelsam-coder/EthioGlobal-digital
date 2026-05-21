import { useState, useEffect } from 'react';
import { 
  FaFacebook, 
  FaCheckCircle,
  FaCalendarAlt, 
  FaImage, 
  FaBullhorn,
  FaComments,
  FaPaintBrush,
  FaChartLine,
  FaRocket,
  FaArrowRight,
  FaTimes
} from 'react-icons/fa';
import { useTheme } from '../../src/context/ThemeContext';

function Service() {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: FaPaintBrush,
      title: 'Content Creation',
      shortDescription: 'Professional posts, graphics & videos tailored for your brand',
      color: 'from-pink-500 to-rose-500',
      detailedDescription: 'Our expert content team creates scroll-stopping posts that resonate with your Ethiopian audience. We craft compelling visuals, write engaging captions, and produce short videos that tell your brand story.',
      features: ['Custom Graphics Design', 'Professional Photography', 'Short Video Production', 'Brand Storytelling', 'Engaging Captions', 'Content Calendar Planning'],
      stats: { posts: '16+/month', engagement: '300%', reach: '50K+' }
    },
    {
      icon: FaBullhorn,
      title: 'Ad Management',
      shortDescription: 'Targeted Facebook ads that reach your ideal customers',
      color: 'from-blue-500 to-cyan-500',
      detailedDescription: 'Maximize your ROI with data-driven Facebook advertising campaigns. We handle everything from audience research and ad creation to A/B testing and optimization.',
      features: ['Audience Research & Targeting', 'Ad Copy & Creative Design', 'A/B Testing', 'Campaign Optimization', 'Retargeting Setup', 'Performance Reports'],
      stats: { roas: '5x average', cpc: '-40% cost', conversions: '+200%' }
    },
    {
      icon: FaComments,
      title: 'Community Management',
      shortDescription: '24/7 response to comments & messages from your audience',
      color: 'from-emerald-500 to-teal-500',
      detailedDescription: 'Build lasting relationships with your community through authentic engagement. Our team monitors and responds to all comments, messages, and mentions in real-time.',
      features: ['Real-time Response (< 1hr)', 'Comment Moderation', 'Message Handling', 'Crisis Management', 'Customer Support', 'Community Building'],
      stats: { responseTime: '< 1 hour', satisfaction: '98%', retention: '85%' }
    },
    {
      icon: FaChartLine,
      title: 'Growth Strategy',
      shortDescription: 'Data-driven strategies to grow your following & engagement',
      color: 'from-purple-500 to-violet-500',
      detailedDescription: 'Scale your Facebook presence with proven growth strategies tailored for the Ethiopian market. We analyze your competitors and implement systematic approaches to increase your follower count.',
      features: ['Competitor Analysis', 'Growth Roadmap', 'Engagement Tactics', 'Follower Growth', 'Viral Content Strategy', 'Monthly Strategy Calls'],
      stats: { followerGrowth: '+150%/year', engagementRate: '8%+', monthlyReach: '100K+' }
    },
    {
      icon: FaCalendarAlt,
      title: 'Posting Schedule',
      shortDescription: 'Optimal posting times for maximum reach & visibility',
      color: 'from-orange-500 to-amber-500',
      detailedDescription: 'Never miss the perfect moment to post again. We analyze when your Ethiopian audience is most active and schedule content for maximum impact.',
      features: ['Optimal Time Analysis', 'Automated Scheduling', 'Content Mix Balance', 'Consistency Planning', 'Seasonal Adjustments', 'Event-based Posting'],
      stats: { visibility: '+180%', consistency: '100%', optimalTiming: 'Peak Hours' }
    },
    {
      icon: FaImage,
      title: 'Visual Design',
      shortDescription: 'Stunning visuals that stop the scroll & drive action',
      color: 'from-indigo-500 to-blue-500',
      detailedDescription: 'Stand out in the crowded Facebook feed with breathtaking visual designs. Our designers create eye-catching images, infographics, carousels, and stories.',
      features: ['Brand Identity Design', 'Social Media Graphics', 'Infographics', 'Story Templates', 'Carousel Designs', 'Animated Visuals'],
      stats: { stopScroll: '3x better', clicks: '+250%', shares: '+180%' }
    }
  ];

  // Modal Component
  const ServiceModal = ({ service, onClose }) => {
    if (!service) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className={`absolute inset-0 backdrop-blur-md transition-opacity ${
          isDark ? 'bg-black/70' : 'bg-black/50'
        }`} />
        
        {/* Modal Content */}
        <div 
          className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 sm:p-10 transition-all duration-300 animate-modal-in ${
            isDark ? 'bg-gray-900/95 border border-white/10 backdrop-blur-xl' : 'bg-white border border-gray-200 shadow-2xl'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
              isDark 
                ? 'bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400' 
                : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600'
            }`}
          >
            <FaTimes className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}>
              <service.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {service.title}
              </h3>
              <p className={'text-sm font-semibold mt-1 bg-gradient-to-r ' + service.color + ' bg-clip-text text-transparent'}>
                Premium Service
              </p>
            </div>
          </div>

          {/* Detailed Description */}
          <p className={`text-lg leading-relaxed mb-8 ${
            isDark ? 'text-neutral-300' : 'text-gray-700'
          }`}>
            {service.detailedDescription}
          </p>

          {/* Stats Grid */}
          <div className={`grid grid-cols-3 gap-4 mb-8 p-6 rounded-2xl ${
            isDark ? 'bg-white/5' : 'bg-gray-50'
          }`}>
            {Object.entries(service.stats).map(([key, value], idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl font-black text-emerald-400">
                  {value}
                </div>
                <div className={`text-xs uppercase tracking-wider mt-1 ${
                  isDark ? 'text-neutral-500' : 'text-gray-500'
                }`}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>

          {/* Features List */}
          <div className="mb-8">
            <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              What's Included:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <FaCheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                  <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button 
            className="w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-white"
            style={{ background: 'linear-gradient(to right, #10b981, #06b6d4)' }}
          >
            <span className="flex items-center justify-center gap-3">
              <FaRocket className="w-5 h-5" />
              Get This Service
              <FaArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    // ═══ TRANSPARENT - INHERITS BG FROM MAIN LAYOUT ═══
    <section id="services" className="relative py-20 sm:py-28 overflow-hidden bg-transparent">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-16 sm:mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
            isDark ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20' : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            <FaFacebook className="w-4 h-4" />
            What We Do
          </div>

          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our Services
          </h2>
          
          <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${
            isDark ? 'text-neutral-400' : 'text-gray-600'
          }`}>
            Everything you need to dominate Facebook and grow your Ethiopian business
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${
                isDark 
                  ? 'bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/30 backdrop-blur-sm' 
                  : 'bg-white/80 border border-gray-200/50 hover:border-blue-400 shadow-lg shadow-gray-200/30 backdrop-blur-sm'
              }`}
              style={{ transitionDelay: (index * 100 + 300) + 'ms' }}
              onClick={() => setSelectedService(service)}
            >
              {/* Icon */}
              <div className={'inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 bg-gradient-to-br ' + service.color + ' shadow-lg group-hover:scale-110 transition-transform duration-300'}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {service.title}
              </h3>
              
              <p className={`text-base leading-relaxed mb-6 ${
                isDark ? 'text-neutral-400' : 'text-gray-600'
              }`}>
                {service.shortDescription}
              </p>

              {/* Learn More Link */}
              <div className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Learn More
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 sm:mt-20 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <a href="#pricing"
            className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}
          >
            <FaRocket className="w-5 h-5" />
            View Pricing Plans
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>

      {/* Modal */}
      <ServiceModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
      />

      {/* Only Modal Animation - No Background Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes modal-in {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        .animate-modal-in { animation: modal-in 0.3s ease-out forwards; }
      `}} />
    </section>
  );
}

export default Service;