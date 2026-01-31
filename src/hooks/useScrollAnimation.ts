import { useEffect, useRef } from 'react';

export const useScrollAnimation = (callback: (progress: number) => void, options?: { threshold?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const totalHeight = rect.height - viewHeight;

      let progress = -1 * rect.top / totalHeight;
      progress = Math.max(0, Math.min(1, progress));

      callback(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);

  return ref;
};
