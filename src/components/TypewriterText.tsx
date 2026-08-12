import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  delayBetweenWords = 1800,
  className = '',
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const currentFullWord = words[wordIndex % words.length];

    if (!isDeleting) {
      if (currentText.length < currentFullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(currentFullWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Pause at full word before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentFullWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{currentText}</span>
      <span className="w-[3px] h-[1.1em] bg-amber-400 ml-1 inline-block animate-[pulse_0.8s_infinite]" />
    </span>
  );
};
