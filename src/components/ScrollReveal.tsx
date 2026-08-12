import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  distance = 35,
  duration = 0.7,
  delay = 0,
  threshold = 0.15,
  className = '',
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Determine initial transform offset
    let startX = 0;
    let startY = 0;

    switch (direction) {
      case 'up':
        startY = distance;
        break;
      case 'down':
        startY = -distance;
        break;
      case 'left':
        startX = distance;
        break;
      case 'right':
        startX = -distance;
        break;
      case 'none':
        break;
    }

    // Set initial state via GSAP
    gsap.set(el, {
      opacity: 0,
      x: startX,
      y: startY,
      willChange: 'transform, opacity',
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              duration,
              delay,
              ease: 'power2.out',
              force3D: true,
              onComplete: () => {
                gsap.set(el, { clearProps: 'willChange' });
              },
            });

            if (once) {
              observer.unobserve(el);
            }
          } else if (!once) {
            gsap.to(el, {
              opacity: 0,
              x: startX,
              y: startY,
              duration: 0.4,
              ease: 'power2.in',
            });
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [direction, distance, duration, delay, threshold, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
