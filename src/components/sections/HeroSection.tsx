import React from 'react';
import { ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [parallaxOffset, setParallaxOffset] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const factor = 0.03;
    setParallaxOffset({ x: x * factor, y: y * factor });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  return (
    <header
      id="opus"
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-600/5 rounded-full blur-[100px] animate-pulse-slow"></div>

      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <svg className="w-[800px] h-[800px] animate-spin-slow text-gold-400" viewBox="0 0 500 500">
          <defs>
            <path id="textCircle" d="M 250, 250 m -200, 0 a 200,200 0 1,1 400,0 a 200,200 0 1,1 -400,0" />
          </defs>
          <circle cx="250" cy="250" r="240" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="250" cy="250" r="220" fill="none" stroke="currentColor" strokeWidth="1" />
          <polygon points="250,50 423,350 77,350" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="250,450 423,150 77,150" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="250" cy="50" r="10" fill="currentColor" />
          <circle cx="423" cy="350" r="10" fill="currentColor" />
          <circle cx="77" cy="350" r="10" fill="currentColor" />
        </svg>
        <svg className="absolute w-[500px] h-[500px] animate-spin-reverse-slow text-gold-200" viewBox="0 0 500 500">
          <circle cx="250" cy="250" r="150" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="175" y="175" width="150" height="150" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 250 250)" />
          <circle cx="250" cy="250" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div
        id="hero-content"
        className="relative z-10 text-center px-4 transition-transform duration-75 ease-out"
        style={{ transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)` }}
      >
        <p className="font-header text-gold-500 tracking-[0.5em] text-sm mb-4 animate-float uppercase">
          EDC - VIT PRESENTS
        </p>
        <h1 className="font-header text-5xl sm:text-6xl md:text-9xl text-gold-metallic font-black mb-6 tracking-tighter drop-shadow-2xl leading-none">
          VISHWAPRENEUR
        </h1>
        <p className="font-body text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto italic font-light leading-relaxed mb-10">
          "To see a World in a Grain of Sand, And a Heaven in a Wild Flower,<br />
          Hold Infinity in the palm of your hand, And Eternity in an hour."
        </p>

        <div className="mb-12">
          <a
            href="#geometry"
            className="group relative inline-flex items-center gap-3 px-8 py-3 overflow-hidden rounded-sm bg-void border border-gold-500/50 transition-all duration-300 hover:border-gold-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            <div className="absolute inset-0 w-0 bg-gold-500/10 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative font-header text-xs tracking-[0.3em] text-gold-300 group-hover:text-gold-200 uppercase">
              Explore Now
            </span>
            <ArrowDown className="relative w-4 h-4 text-gold-300 transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </div>

        <div className="flex justify-center gap-6">
          <div className="h-16 w-[1px] bg-gradient-to-b from-gold-300 to-transparent"></div>
        </div>
      </div>
    </header>
  );
};
