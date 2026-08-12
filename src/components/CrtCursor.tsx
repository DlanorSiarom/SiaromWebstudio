import React, { useEffect, useState, useRef } from 'react';

export const CrtCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPointer, setHasPointer] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasPointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setHasPointer(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!hasPointer) return;

    let rafId: number | null = null;
    let latestX = -100;
    let latestY = -100;

    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${latestX}px, ${latestY}px, 0)`;
      }
      rafId = null;
    };

    const onMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, select, textarea, [role="button"], [data-interactive], .cursor-pointer')
        );
        setIsHovered((prev) => (prev !== isInteractive ? isInteractive : prev));
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [hasPointer, isVisible]);

  if (!hasPointer || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none">
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 pointer-events-none -mt-3 -ml-3 will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-150 ${
            isClicked ? 'scale-75' : isHovered ? 'scale-125' : 'scale-100'
          }`}
        >
          {/* Interactive Hover Ring */}
          <div
            className={`absolute rounded-full border border-amber-400 transition-all duration-150 ${
              isHovered
                ? 'w-6 h-6 bg-amber-400/20 shadow-[0_0_12px_rgba(245,158,11,0.5)] opacity-100 scale-100'
                : 'w-4 h-4 border-amber-500/40 opacity-40 scale-75'
            } ${isClicked ? 'border-amber-300 bg-amber-400/40' : ''}`}
          />

          {/* Minimal CRT Ticks */}
          <div className="absolute -top-2.5 w-[1.5px] h-1.5 bg-amber-400 shadow-[0_0_4px_#f59e0b]" />
          <div className="absolute -bottom-2.5 w-[1.5px] h-1.5 bg-amber-400 shadow-[0_0_4px_#f59e0b]" />
          <div className="absolute -left-2.5 h-[1.5px] w-1.5 bg-amber-400 shadow-[0_0_4px_#f59e0b]" />
          <div className="absolute -right-2.5 h-[1.5px] w-1.5 bg-amber-400 shadow-[0_0_4px_#f59e0b]" />

          {/* Precision Center Dot */}
          <div
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-100 ${
              isClicked
                ? 'bg-amber-200 shadow-[0_0_8px_#fef08a]'
                : isHovered
                ? 'bg-amber-300 shadow-[0_0_6px_#fbbf24]'
                : 'bg-amber-400 shadow-[0_0_4px_#f59e0b]'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
