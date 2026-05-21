// ==================== HOME PAGE V2 - ULTRA OPTIMIZED PERFORMANCE ====================
import { lazy, Suspense } from 'react';
import { ThemeProvider } from '../../src/context/ThemeContext';
import HeaderV2 from './header';
import HookV2 from './Hookv2';
import myLogo from '../../src/assets/logo.png';
import Pricing from './pricing';

const Service = lazy(() => import('./service'));
const Owners = lazy(() => import('./owners'));
const Testimonials = lazy(() => import('./testimony'));
const Contact = lazy(() => import('./contact_us'));
const Footer = lazy(() => import('./footer'));
const EthioXChat = lazy(() => import('./chatbot'));

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse" />
    </div>
  );
}

function HomeV2() {
  return (
    <ThemeProvider>
      {/* ═══ SINGLE WRAPPER WITH GPU ACCELERATION ═══ */}
      <div className="relative min-h-screen bg-optimize-dark dark:bg-optimize-light">
        
        {/* ═══ BACKGROUND - SINGLE DIV, PURE CSS ═══ */}
        <div 
          className="fixed inset-0 pointer-events-none optimize-bg"
          aria-hidden="true"
        />

        {/* ═══ CONTENT LAYER ═══ */}
        <div className="relative z-10 will-change-transform">
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

      {/* ═══ MINIMAL GLOBAL STYLES ═══ */}
      <style jsx global>{`
        /* ═══ BASE THEME VARIABLES ═══ */
        :root {
          --color-primary: #2563eb;
          --color-secondary: #9333ea;
        }

        /* ═══ OPTIMIZED BACKGROUNDS (CSS Only - No JS Recalculation!) ═══ */
        .bg-optimize-dark {
          background-color: #030712;
        }
        
        .bg-optimize-light {
          background-color: #f8fafc;
        }

        /* ═══ THE MAGIC: ALL-IN-ONE BACKGROUND (Single Element!) ═══ */
        .optimize-bg {
          /* Base gradient */
          background-color: #030712;
          background-image: 
            /* Dot pattern - tiny, optimized */
            radial-gradient(circle, rgba(59, 130, 246, 0.06) 1px, transparent 1px),
            /* Gradient orbs combined into ONE layer */
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(59, 130, 246, 0.08), transparent),
            radial-gradient(ellipse 70% 50% at 80% 15%, rgba(139, 92, 246, 0.07), transparent),
            radial-gradient(ellipse 60% 40% at 75% 85%, rgba(99, 102, 241, 0.06), transparent),
            radial-gradient(ellipse 55% 45% at 15% 80%, rgba(6, 182, 212, 0.05), transparent);
          
          /* Single background size for all layers */
          background-size: 28px 28px, 100% 100%, 100% 100%, 100% 100%, 100% 100%;
          background-position: 0 0, 0 0, 0 0, 0 0, 0 0;
          
          /* GPU Acceleration - Prevents Layout Thrashing! */
          transform: translateZ(0);
          backface-visibility: hidden;
          contain: strict; /* Isolates this element completely! */
        }

        /* Light mode override */
        html:not(.dark) .optimize-bg {
          background-color: #f8fafc;
          background-image: 
            radial-gradient(circle, rgba(59, 130, 246, 0.10) 1px, transparent 1px),
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(59, 130, 246, 0.12), transparent),
            radial-gradient(ellipse 70% 50% at 80% 15%, rgba(139, 92, 246, 0.10), transparent),
            radial-gradient(ellipse 60% 40% at 75% 85%, rgba(99, 102, 241, 0.09), transparent),
            radial-gradient(ellipse 55% 45% at 15% 80%, rgba(6, 182, 212, 0.07), transparent);
        }

        /* ═══ PERFORMANCE HINTS ═══ */
        .will-change-transform {
          will-change: transform;
        }

        /* ═══ SCROLLBAR (Minimal) ═══ */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary)); 
          border-radius: 6px; 
        }

        /* ═══ SELECTION ═══ */
        ::selection { background: rgba(99, 102, 241, 0.3); color: white; }

        /* ═══ SMOOTH SCROLL ═══ */
        html { scroll-behavior: smooth; }
      `}</style>
    </ThemeProvider>
  );
}

export default HomeV2;