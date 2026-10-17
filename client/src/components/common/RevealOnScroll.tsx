'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function RevealOnScroll({ children, className = '', delay = 0 }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const visible = seen || reduceMotion;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 40px 0px' },
    );
    observer.observe(el);

    // Fallback: if observer doesn't trigger within 2s, show content
    const fallback = setTimeout(() => setSeen(true), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity var(--duration-slow) var(--ease-out-expo) ${delay}ms, transform var(--duration-slow) var(--ease-out-expo) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
