// ==================== HOME PAGE V2 - COMPLETE 3D IMMERSIVE EXPERIENCE ====================
import { lazy, Suspense } from 'react';
import { ThemeProvider } from '../../src/context/ThemeContext';
import HeaderV2 from './header';
import HookV2 from './Hookv2';
import myLogo from '../../src/assets/logo.png';

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

function HomeV2() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-500">
        <HeaderV2 logoSrc={myLogo} />
        
        <main>
          <HookV2 />
          
          <Suspense fallback={<LoadingSpinner />}>
            <Service />
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

      {/* Global CSS Variables for Theming */}
      <style jsx global>{`
        :root {
          --color-primary: #2563eb;
          --color-secondary: #9333ea;
          --color-accent: #06b6d4;
        }

        /* Dark Mode (Default) */
        .dark {
          --bg-primary: #050505;
          --bg-secondary: #0a0a0a;
          --bg-tertiary: #111111;
          --text-primary: #ffffff;
          --text-secondary: #a3a3a3;
          --text-muted: #525252;
          --border-color: rgba(255, 255, 255, 0.06);
        }

        /* Light Mode */
        html:not(.dark) {
          --bg-primary: #ffffff;
          --bg-secondary: #f9fafb;
          --bg-tertiary: #f3f4f6;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-muted: #9ca3af;
          --border-color: rgba(0, 0, 0, 0.1);
        }

        body {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: var(--bg-secondary);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #3b82f6, #a78bfa);
        }

        /* Selection color */
        ::selection {
          background: rgba(99, 102, 241, 0.3);
          color: white;
        }

        /* Focus styles */
        *:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
      `}</style>
    </ThemeProvider>
  );
}

export default HomeV2;