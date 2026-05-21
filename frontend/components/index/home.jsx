// ==================== HOME PAGE V2 - STATIC SMOOTH BACKGROUND ====================
import { lazy, Suspense, useState, useEffect } from 'react';
import { ThemeProvider } from '../../src/context/ThemeContext';
import HeaderV2 from './header';
import HookV2 from './Hookv2';
import myLogo from '../../src/assets/logo.png';
import Pricing from './pricing';

// Lazy load components for performance
const Service = lazy(() => import('./service'));
const Owners = lazy(() => import('./owners'));
const Testimonials = lazy(() => import('./testimony'));
const Contact = lazy(() => import('./contact_us'));
const Footer = lazy(() => import('./footer'));
const EthioXChat = lazy(() => import('./chatbot'));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse opacity-75"></div>
        <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

function StaticBackground({ isDark }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* ═══ BASE COLOR ═══ */}
      <div className={'absolute inset-0 transition-colors duration-500 ' + (isDark ? 'bg-[#030712]' : 'bg-slate-50')} />

      {/* ═══ DOT PATTERN ═══ */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: isDark 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 1.5px, transparent 1.5px)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* ═══ GRADIENT ORB 1 - Top Left (Blue) ═══ */}
      <div 
        className={'absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full blur-[140px] ' + (isDark ? 'bg-blue-600/[0.07]' : 'bg-blue-400/[0.10]')}
      />
      
      {/* ═══ GRADIENT ORB 2 - Top Right (Purple) ═══ */}
      <div 
        className={'absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full blur-[130px] ' + (isDark ? 'bg-purple-600/[0.06]' : 'bg-purple-400/[0.09]')}
      />
      
      {/* ═══ GRADIENT ORB 3 - Bottom Right (Indigo) ═══ */}
      <div 
        className={'absolute bottom-[-15%] right-[-5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full blur-[120px] ' + (isDark ? 'bg-indigo-600/[0.05]' : 'bg-indigo-400/[0.08]')}
      />

      {/* ═══ GRADIENT ORB 4 - Bottom Left (Cyan) ═══ */}
      <div 
        className={'absolute bottom-[-10%] left-[-12%] w-[40vw] h-[40vw] max-w-[550px] max-h-[550px] rounded-full blur-[110px] ' + (isDark ? 'bg-cyan-600/[0.04]' : 'bg-cyan-400/[0.07]')}
      />

      {/* ═══ CENTER GLOW ═══ */}
      <div 
        className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[180px] ' + (isDark ? 'bg-indigo-500/[0.03]' : 'bg-indigo-400/[0.04]')}
      />

    </div>
  );
}

function HomeV2() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      setIsDark(true);
    }
    
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains('dark'));
    });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        
        {/* ═══ STATIC BACKGROUND ═══ */}
        <StaticBackground isDark={isDark} />

        {/* ═══ CONTENT ═══ */}
        <div className="relative z-10">
          <HeaderV2 logoSrc={myLogo} />
          
          <main>
            <HookV2 />
            
            <Suspense fallback={<LoadingSpinner />}>
              <Service />
              <Pricing />
              <Owners />
              <Testimonials />
              <Contact />
            </Suspense>
          </main>

          <Suspense fallback={<div />}>
            <Footer />
          </Suspense>

          <EthioXChat />
        </div>
      </div>

      {/* ═══ GLOBAL STYLES ═══ */}
      <style jsx global>{`
        :root {
          --color-primary: #2563eb;
          --color-secondary: #9333ea;
        }

        .dark {
          --bg-primary: #030712;
          --text-primary: #ffffff;
        }

        html:not(.dark) {
          --bg-primary: #ffffff;
          --text-primary: #111827;
        }

        body {
          background-color: var(--bg-primary);
          color: var(--text-primary);
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: var(--bg-primary);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
          border-radius: 10px;
        }
        ::selection {
          background: rgba(99, 102, 241, 0.3);
          color: white;
        }
      `}</style>
    </ThemeProvider>
  );
}

export default HomeV2;