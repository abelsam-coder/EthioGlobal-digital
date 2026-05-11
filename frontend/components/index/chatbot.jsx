import { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../../src/context/ThemeContext';
import api from '../../api/api';

const fallbackResponses = {
  service: "Great question! Our team specializes in web development, e-commerce, ERP systems, and digital marketing. Which service interests you?",
  project: "We'd love to hear more about your project. Could you tell us a bit about your business and what you're looking for?",
  time: "Our typical turnaround time is 2-4 weeks depending on the project scope. We always keep you updated throughout the process.",
  price: "Absolutely! We offer flexible payment plans — usually 50% upfront and 50% on completion. We can discuss what works best for you.",
  contact: "You can reach our team directly through the contact form, email (info@agency.com), or Telegram (@agency_support). We respond within 2 hours!",
  goodbye: "Thanks for chatting with EthioX! For a detailed project discussion, feel free to fill out our contact form and we'll get back to you with a custom proposal. 🚀",
  default: "Thanks for your message! Let me connect you with our team for a detailed response. You can also reach us directly through the contact form below. 😊",
};

const quickReplies = [
  'What services do you offer?',
  'How long does a project take?',
  'What are the pricing plans?',
  'Talk to a human',
];

const SIZE_PRESETS = {
  small: { w: 350, h: 450, label: 'S' },
  medium: { w: 420, h: 560, label: 'M' },
  large: { w: 520, h: 680, label: 'L' },
};

function getFallbackResponse(text) {
  const lower = text.toLowerCase();
  if (lower.includes('service') || lower.includes('offer') || lower.includes('do you do')) return fallbackResponses.service;
  if (lower.includes('how long') || lower.includes('time') || lower.includes('duration') || lower.includes('turnaround')) return fallbackResponses.time;
  if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing') || lower.includes('payment') || lower.includes('plan')) return fallbackResponses.price;
  if (lower.includes('human') || lower.includes('talk to') || lower.includes('real person') || lower.includes('agent')) return fallbackResponses.contact;
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('good')) return "Hello! 👋 Welcome to EthioX. How can I help you today?";
  if (lower.includes('thank') || lower.includes('bye') || lower.includes('goodbye')) return fallbackResponses.goodbye;
  return fallbackResponses.default;
}

function EthioXChat() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hi there! 👋 I'm EthioX, your digital assistant. How can I help you today?", time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [size, setSize] = useState(SIZE_PRESETS.medium);
  const [isResizing, setIsResizing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const resizeStartRef = useRef({ x: 0, y: 0, w: 0, h: 0, axis: 'both' });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // ── Detect Hover Capability (Desktop vs Mobile) ──
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mediaQuery.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // ── Body Scroll Lock for Mobile ──
  useEffect(() => {
    if (isOpen && !isDesktop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isDesktop]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), isDesktop ? 400 : 100);
    }
  }, [isOpen, isDesktop]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: text.trim(), time: new Date() }]);
    setIsTyping(true);

    api
      .post('/chat/', { message: text.trim() })
      .then((response) => {
        const botText = response.data?.response || response.data?.message || response.data?.reply || getFallbackResponse(text);
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: Date.now(), sender: 'bot', text: botText, time: new Date() }]);
      })
      .catch((err) => {
        console.log('Chat API failed, using fallback:', err.message);
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: Date.now(), sender: 'bot', text: getFallbackResponse(text), time: new Date() }]);
      });
  }, []);

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  const handleQuickReply = (reply) => {
    setInput('');
    sendMessage(reply);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Desktop Resize Logic ──
  const handleResizeStart = (e, axis = 'both') => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    resizeStartRef.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h, axis };
  };

  const handleResizeMove = useCallback((e) => {
    if (!isResizing) return;
    const s = resizeStartRef.current;
    let newW = size.w;
    let newH = size.h;

    if (s.axis === 'both' || s.axis === 'x') {
      const dx = s.x - e.clientX;
      newW = Math.min(Math.max(s.w + dx, 320), 620);
    }
    if (s.axis === 'both' || s.axis === 'y') {
      const dy = s.y - e.clientY;
      newH = Math.min(Math.max(s.h + dy, 400), 780);
    }
    setSize({ w: newW, h: newH });
  }, [isResizing, size.w, size.h]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'nwse-resize';
    }
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isResizing, handleResizeMove, handleResizeEnd, isDesktop]);

  const getCurrentPreset = () => {
    if (Math.abs(size.w - SIZE_PRESETS.small.w) < 25 && Math.abs(size.h - SIZE_PRESETS.small.h) < 25) return 'small';
    if (Math.abs(size.w - SIZE_PRESETS.large.w) < 25 && Math.abs(size.h - SIZE_PRESETS.large.h) < 25) return 'large';
    return 'medium';
  };

  const cyclePreset = () => {
    const c = getCurrentPreset();
    if (c === 'small') setSize(SIZE_PRESETS.medium);
    else if (c === 'medium') setSize(SIZE_PRESETS.large);
    else setSize(SIZE_PRESETS.small);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">

      {/* ═══ Mobile Backdrop ═══ */}
      {isOpen && !isDesktop && (
        <div
          className={`fixed inset-0 backdrop-blur-sm -z-10 ${isDark ? 'bg-black/60' : 'bg-black/30'}`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ═══════════════════════════════════════════
          CHAT PANEL
          ═══════════════════════════════════════════ */}
      <div
        className={`transition-[opacity,transform] duration-500 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        } ${
          isDesktop
            ? 'origin-bottom-right'
            : 'fixed inset-x-2 sm:inset-x-4 bottom-20 top-2 sm:top-4 w-auto h-auto'
        }`}
      >
        <div
          className={`relative backdrop-blur-xl border rounded-2xl shadow-2xl flex flex-col overflow-hidden h-full ${
            isDark
              ? 'bg-[#0a0a0a]/95 border-white/[0.08] shadow-black/60'
              : 'bg-white border-gray-200 shadow-black/10'
          }`}
          style={isDesktop ? { width: size.w, height: Math.min(size.h, window.innerHeight - 48) } : undefined}
        >

          {/* ── Header ── */}
          <div
            className={`relative flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b flex-shrink-0 ${
              isDark ? 'border-white/[0.06] bg-[#0d0d12]/80' : 'border-gray-100 bg-gray-50/90'
            }`}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

            {/* Mobile Drag Handle */}
            {!isDesktop && (
              <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
            )}

            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 rounded-full border-2 ${
                isDark ? 'border-[#0d0d12]' : 'border-white'
              }`} />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>EthioX</h4>
              <p className={`text-[10px] sm:text-[11px] flex items-center gap-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="truncate">Online — typically replies instantly</span>
              </p>
            </div>

            {/* Size Toggle (Desktop Only) */}
            {isDesktop && (
              <button
                onClick={cyclePreset}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isDark
                    ? 'text-neutral-500 hover:text-white hover:bg-white/[0.06]'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                }`}
                title={`Size: ${getCurrentPreset().toUpperCase()} — click to change`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className={`w-9 h-9 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                isDark
                  ? 'text-neutral-500 hover:text-white hover:bg-white/[0.06] active:bg-white/10'
                  : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-200'
              }`}
              aria-label="Close chat"
            >
              <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ── Messages Area ── */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-3 sm:space-y-4 scrollbar-thin overscroll-contain min-h-0">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-1.5 sm:gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 mb-4 sm:mb-5">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <div
                      className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed break-words ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                          : isDark
                            ? 'bg-white/[0.06] text-neutral-300 border border-white/[0.06] rounded-bl-md'
                            : 'bg-gray-100 text-gray-700 border border-gray-200 rounded-bl-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <p className={`text-[9px] sm:text-[10px] mt-1 px-1 ${
                      isDark ? 'text-neutral-700' : 'text-gray-400'
                    } ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {formatTime(msg.time)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-1.5 sm:gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 mb-4 sm:mb-5">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div
                    className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl rounded-bl-md ${
                      isDark
                        ? 'bg-white/[0.06] border border-white/[0.06]'
                        : 'bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-neutral-500' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }} />
                      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-neutral-500' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }} />
                      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-neutral-500' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick Replies ── */}
          {messages.length <= 2 && (
            <div className="px-3 sm:px-4 pb-2 flex flex-wrap gap-1.5 sm:gap-1.5 flex-shrink-0">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  className={`px-3 sm:px-3 py-2 sm:py-1.5 rounded-full border font-medium active:scale-95 transition-all duration-200 ${
                    isDark
                      ? 'border-white/[0.08] bg-white/[0.03] text-[11px] text-neutral-400 hover:text-white hover:border-blue-500/30 hover:bg-blue-500/[0.06]'
                      : 'border-gray-200 bg-gray-50 text-[11px] text-gray-500 hover:text-gray-900 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* ── Input Area ── */}
          <div
            className={`px-3 sm:px-4 py-2.5 sm:py-3 border-t flex-shrink-0 ${
              isDark ? 'border-white/[0.06] bg-[#0d0d12]/60' : 'border-gray-100 bg-gray-50/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`flex-1 relative rounded-xl border transition-all duration-300 ${
                  isDark
                    ? 'border-white/[0.08] bg-white/[0.03] focus-within:border-blue-500/30 focus-within:bg-blue-500/[0.02]'
                    : 'border-gray-200 bg-white focus-within:border-blue-400 focus-within:bg-blue-50/50'
                }`}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  enterKeyHint="send"
                  className={`w-full bg-transparent text-sm py-2.5 sm:py-2.5 px-3.5 sm:px-4 outline-none rounded-xl placeholder-${
                    isDark ? 'neutral-600 text-white' : 'gray-400 text-gray-900'
                  }`}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 disabled:opacity-30 disabled:shadow-none transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <svg className="w-4 h-4 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <p className={`text-[9px] sm:text-[10px] text-center mt-1.5 sm:mt-2 ${isDark ? 'text-neutral-700' : 'text-gray-400'}`}>
              EthioX AI · Powered by EthioDigital Global
            </p>
          </div>

          {/* ══════════════════════════════════════
              RESIZE HANDLES (Desktop Only)
              ══════════════════════════════════════ */}
          {isDesktop && (
            <>
              {/* Corner handle — bottom-left */}
              <div
                onMouseDown={(e) => handleResizeStart(e, 'both')}
                className={`absolute bottom-0 left-0 w-6 h-6 cursor-nwse-resize z-20 flex items-start justify-end pt-1 pr-1 transition-opacity duration-200 ${
                  isResizing ? 'opacity-100' : 'opacity-20 hover:opacity-60'
                }`}
              >
                <svg className={`w-3.5 h-3.5 rotate-180 ${isDark ? 'text-neutral-400' : 'text-gray-400'}`} fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" d="M2 14L14 2M8 14L14 8" />
                </svg>
              </div>

              {/* Right edge handle */}
              <div
                onMouseDown={(e) => handleResizeStart(e, 'x')}
                className={`absolute top-14 right-0 bottom-14 w-1.5 cursor-ew-resize z-20 transition-all duration-200 rounded-l ${
                  isResizing
                    ? 'opacity-100 bg-blue-500/40'
                    : 'opacity-0 hover:opacity-100 hover:bg-blue-500/20'
                }`}
              />

              {/* Bottom edge handle */}
              <div
                onMouseDown={(e) => handleResizeStart(e, 'y')}
                className={`absolute bottom-0 left-8 right-0 h-1.5 cursor-ns-resize z-20 transition-all duration-200 rounded-t ${
                  isResizing
                    ? 'opacity-100 bg-blue-500/40'
                    : 'opacity-0 hover:opacity-100 hover:bg-blue-500/20'
                }`}
              />
            </>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          FLOATING TOGGLE BUTTON
          ═══════════════════════════════════════════ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className={`group relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl z-10 ${
          isOpen
            ? `${
                isDark
                  ? 'bg-[#0a0a0a] border border-white/[0.08] shadow-black/40'
                  : 'bg-white border border-gray-200 shadow-gray-300/40'
              } rotate-0`
            : 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-110 active:scale-95'
        }`}
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-20" />
        )}

        <svg
          className={`w-5 h-5 text-white transition-all duration-300 ${
            isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>

        <svg
          className={`w-6 h-6 text-white absolute transition-all duration-300 ${
            isOpen ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>

        {!isOpen && (
          <span className={`absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 flex items-center justify-center ${
            isDark ? 'border-[#050505]' : 'border-white'
          }`}>
            <span className="text-[8px] font-bold text-white">1</span>
          </span>
        )}
      </button>

      {/* ═══ Tooltip (Desktop Only) ═══ */}
      {!isOpen && isDesktop && (
        <div
          className={`absolute bottom-[70px] right-0 px-3 py-1.5 rounded-lg backdrop-blur-md border shadow-lg whitespace-nowrap pointer-events-none animate-[fadeSlideIn_0.3s_ease-out] ${
            isDark
              ? 'bg-[#0a0a0a]/90 border-white/[0.08]'
              : 'bg-white border-gray-200 shadow-gray-300/30'
          }`}
        >
          <p className={`text-xs font-medium ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>Chat with EthioX</p>
          <div
            className={`absolute bottom-0 right-5 translate-y-1/2 rotate-45 w-2 h-2 border-r border-b ${
              isDark
                ? 'bg-[#0a0a0a]/90 border-white/[0.08]'
                : 'bg-white border-gray-200'
            }`}
          />
        </div>
      )}
    </div>
  );
}

export default EthioXChat;