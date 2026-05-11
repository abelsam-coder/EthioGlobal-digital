// ==================== 3D SCROLL ANIMATION HOOK ====================
import { useState, useEffect, useRef } from 'react';

export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [threshold, rootMargin, once]);

  // Calculate 3D transform values based on scroll
  const getTransform3D = (depth = 50, rotateX = 0, rotateY = 0) => {
    if (!isVisible) {
      return {
        transform: `
          perspective(1000px)
          translateZ(-${depth}px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(0.9)
        `,
        opacity: 0,
      };
    }

    const progress = Math.min(scrollY / 1000, 1);
    const parallaxY = (window.scrollY - (ref.current?.offsetTop || 0)) * 0.1;

    return {
      transform: `
        perspective(1000px)
        translateZ(${Math.min(parallaxY, depth)}px)
        rotateX(${rotateX * (1 - progress)}deg)
        rotateY(${rotateY * (1 - progress)}deg)
        scale(${0.9 + progress * 0.1})
      `,
      opacity: 1,
    };
  };

  return { ref, isVisible, scrollY, getTransform3D };
}

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        setOffset((scrolled - elementTop) * speed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}