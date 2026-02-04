import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

export function useTypewriter({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  loop = true,
}: UseTypewriterOptions) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (isWaiting) {
      const waitTimeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetweenWords);
      return () => clearTimeout(waitTimeout);
    }

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        if (loop || currentWordIndex < words.length - 1) {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
        return;
      }

      const deleteTimeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
      return () => clearTimeout(deleteTimeout);
    }

    if (currentText === currentWord) {
      setIsWaiting(true);
      return;
    }

    const typeTimeout = setTimeout(() => {
      setCurrentText(currentWord.slice(0, currentText.length + 1));
    }, typeSpeed);

    return () => clearTimeout(typeTimeout);
  }, [currentText, currentWordIndex, isDeleting, isWaiting, words, typeSpeed, deleteSpeed, delayBetweenWords, loop]);

  return { text: currentText, isTyping: !isWaiting && !isDeleting };
}
