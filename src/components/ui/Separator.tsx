import React from 'react';

interface SeparatorProps {
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ className = '' }) => {
  return (
    <div className={`w-full flex items-center justify-center gap-4 py-12 z-20 relative opacity-80 pointer-events-none ${className}`}>
      <div className="h-px w-full max-w-[200px] md:max-w-xs bg-gradient-to-r from-transparent via-gold-500/50 to-gold-300"></div>
      <div className="relative flex items-center justify-center separator-pulse">
        <div className="absolute inset-0 bg-gold-500/10 blur-md rounded-full"></div>
        <svg className="w-8 h-8 text-gold-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L22 12L12 22L2 12L12 2Z" />
          <path d="M12 6L18 12L12 18L6 12L12 6Z" opacity="0.6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="h-px w-full max-w-[200px] md:max-w-xs bg-gradient-to-l from-transparent via-gold-500/50 to-gold-300"></div>
    </div>
  );
};
