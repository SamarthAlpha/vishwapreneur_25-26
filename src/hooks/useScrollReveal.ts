import { useEffect } from 'react';

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollReveal = (options: RevealOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold, rootMargin });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));

    return () => {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.unobserve(el));
    };
  }, [threshold, rootMargin]);
};
