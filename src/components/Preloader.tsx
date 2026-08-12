import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings } from 'lucide-react';
import { INITIAL_PORTFOLIO } from '../data/mockData';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Collect all critical asset images to preload
    const imagesToPreload = [
      ...INITIAL_PORTFOLIO.map((p) => p.image),
      'https://i.ibb.co/chh6qSnQ/Chat-GPT-Image-5-de-ago-de-2026-23-08-16.png',
    ];

    let loadedCount = 0;
    const totalCount = imagesToPreload.length;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount >= totalCount && isMounted) {
        setIsLoaded(true);
      }
    };

    if (totalCount === 0) {
      setIsLoaded(true);
    } else {
      imagesToPreload.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = checkComplete;
        img.onerror = checkComplete;
      });
    }

    // Safety eject timer: maximum 1.5s so user is never stuck
    const maxTimer = setTimeout(() => {
      if (isMounted) setIsLoaded(true);
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(maxTimer);
    };
  }, []);

  // Automatically eject when loaded
  useEffect(() => {
    if (isLoaded) {
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(exitTimer);
    }
  }, [isLoaded, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed inset-0 z-[99999] bg-black flex items-center justify-center select-none"
      >
        {/* Simple single gear loading icon */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <Settings className="w-12 h-12 text-amber-400 animate-spin transition-all duration-300" style={{ animationDuration: '2s' }} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
