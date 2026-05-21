import { useState, useEffect } from 'react';
import Header from '../../components/index/header';
import myLogo from '../assets/logo.png';
import Hook from '../../components/index/home';
import Service from '../../components/index/service';
import Owners from '../../components/index/owners';
import Testimonials from '../../components/index/testimony';
import Contact from '../../components/index/contact_us';
import Footer from '../../components/index/footer';
import EthioXChat from '../../components/index/chatbot';
import { ThemeProvider } from '../context/ThemeContext';
import Pricing from '../../components/index/pricing';

function Home() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Detect initial theme
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      setIsDark(true);
    }
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains('dark'));
    });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider>
      {/* ══════════ GLOBAL BACKGROUND EFFECTS ══════════ */}
      <div className={`relative min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-[#030712]' : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50/20'
      }`}>
        
        {/* ═══ DOT PATTERN LAYER (Full Page) ═══ */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Primary Dot Grid */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: isDark 
                ? `radial-gradient(circle, rgba(16, 185, 129, 0.12) 1.5px, transparent 1.5px)`
                : `radial-gradient(circle, rgba(16, 185, 129, 0.2) 1.5px, transparent 1.5px)`,
              backgroundSize: '28px 28px'
            }}
          />

          {/* Secondary Dot Layer (Offset) */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: isDark 
                ? `radial-gradient(circle, rgba(139, 92, 246, 0.08) 1px, transparent 1px)`
                : `radial-gradient(circle, rgba(139, 92, 246, 0.15) 1px, transparent 1px)`,
              backgroundSize: '44px 44px',
              backgroundPosition: '14px 14px'
            }}
          />

          {/* ═══ MASSIVE GRADIENT ORBS ═══ */}
          {/* Top Left - Emerald */}
          <div className={`absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full blur-[180px] animate-orb-1 ${
            isDark ? 'bg-emerald-500/[0.07]' : 'bg-emerald-400/[0.12]'
          }`} />
          
          {/* Top Right - Blue */}
          <div className={`absolute -top-[15%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[160px] animate-orb-2 ${
            isDark ? 'bg-blue-500/[0.06]' : 'bg-blue-400/[0.10]'
          }`} />
          
          {/* Center - Purple */}
          <div className={`absolute top-[30%] left-[20%] w-[80vw] h-[80vw] rounded-full blur-[200px] animate-orb-3 ${
            isDark ? 'bg-purple-500/[0.05]' : 'bg-purple-400/[0.08]'
          }`} />
          
          {/* Bottom Right - Cyan */}
          <div className={`absolute bottom-[10%] right-[-5%] w-[65vw] h-[65vw] rounded-full blur-[170px] animate-orb-4 ${
            isDark ? 'bg-cyan-500/[0.06]' : 'bg-cyan-400/[0.10]'
          }`} />
          
          {/* Bottom Left - Pink/Rose */}
          <div className={`absolute -bottom-[20%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[150px] animate-orb-5 ${
            isDark ? 'bg-pink-500/[0.05]' : 'bg-pink-400/[0.08]'
          }`} />

          {/* ═══ FLOATING ANIMATED DOTS ═══ */}
          {[...Array(40)].map((_, i) => (
            <div key={i} className="absolute w-1.5 h-1.5 rounded-full animate-float-random"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 4 === 0 
                  ? (isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.5)')
                  : i % 4 === 1 
                    ? (isDark ? 'rgba(139, 92, 246, 0.4)' : 'rgba(139, 92, 246, 0.5)')
                    : i % 4 === 2 
                      ? (isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.5)')
                      : (isDark ? 'rgba(236, 72, 153, 0.3)' : 'rgba(236, 72, 153, 0.4)'),
                boxShadow: `0 0 ${8 + Math.random() * 12}px currentColor`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${5 + Math.random() * 6}s`
              }}
            />
          ))}

          {/* ═══ NOISE TEXTURE OVERLAY (Subtle) ═══ */}
          <div 
            className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px'
            }}
          />
        </div>

        {/* ══════════ CONTENT LAYERS (Above Background) ══════════ */}
        <div className="relative z-10">
          <Header logoSrc={myLogo} />
          <Hook />
          <Service />
          <Pricing />
          <Owners />
          <Testimonials />
          <Contact />
          <Footer />
        </div>

        {/* Chatbot (Fixed Position) */}
        <EthioXChat />
      </div>

      {/* ═══ GLOBAL ANIMATIONS ═══ */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 40px) scale(0.95); }
        }
        @keyframes orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-35px, 45px) scale(1.03); }
          66% { transform: translate(25px, -35px) scale(0.97); }
        }
        @keyframes orb-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, 20px) scale(1.04); }
          66% { transform: translate(-40px, -25px) scale(0.96); }
        }
        @keyframes orb-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, -40px) scale(1.02); }
          66% { transform: translate(35px, 30px) scale(0.98); }
        }
        @keyframes orb-5 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(45px, 35px) scale(1.06); }
          66% { transform: translate(-25px, -45px) scale(0.94); }
        }
        @keyframes float-random {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1); 
            opacity: 0.2; 
          }
          25% { 
            transform: translateY(-18px) translateX(12px) scale(1.4); 
            opacity: 0.6; 
          }
          50% { 
            transform: translateY(-28px) translateX(-8px) scale(1); 
            opacity: 0.4; 
          }
          75% { 
            transform: translateY(-12px) translateX(-14px) scale(1.3); 
            opacity: 0.7; 
          }
        }
        .animate-orb-1 { animation: orb-1 12s ease-in-out infinite; }
        .animate-orb-2 { animation: orb-2 14s ease-in-out infinite; }
        .animate-orb-3 { animation: orb-3 16s ease-in-out infinite; }
        .animate-orb-4 { animation: orb-4 13s ease-in-out infinite; }
        .animate-orb-5 { animation: orb-5 15s ease-in-out infinite; }
        .animate-float-random { animation: float-random 7s ease-in-out infinite; }
      `}} />
    </ThemeProvider>
  );
}

export default Home;