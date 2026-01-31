import React from 'react';
import { Sparkles, FlaskConical } from 'lucide-react';

interface NavbarProps {
  isNavOpen: boolean;
  onToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isNavOpen, onToggle }) => {
  return (
    <>
      {/* Title */}
      <div className="fixed top-6 left-6 md:left-10 z-50 flex items-center gap-3 mix-blend-difference pointer-events-none">
        <Sparkles className="text-gold-300 w-5 h-5 animate-pulse-slow" />
        <span className="font-header text-lg md:text-xl tracking-[0.2em] text-gold-metallic font-bold uppercase">
          EDC-VIT
        </span>
      </div>

      {/* Toggle Button */}
      <button
        id="nav-toggle"
        onClick={onToggle}
        className={`fixed top-6 right-6 md:right-10 z-[60] group focus:outline-none transition-transform duration-500 ${
          isNavOpen ? 'rotate-180' : ''
        }`}
        aria-label="Toggle Menu"
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-gold-400 bg-charcoal/90 backdrop-blur-md rotate-45 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:border-gold-300 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] transition-all duration-300"></div>
          <div className="absolute inset-1.5 border border-gold-500/30 rotate-45 rounded-md"></div>
          <div className="relative z-10 -rotate-45 transition-transform duration-500">
            <FlaskConical className="text-gold-300 w-5 h-5 fill-gold-500/10" />
          </div>
        </div>
      </button>

      {/* Vertical Chain Navigation */}
      <nav
        id="main-nav"
        className={`fixed top-[4.5rem] right-6 md:right-10 z-50 flex flex-col items-center w-12 origin-top transition-all ${
          isNavOpen ? 'nav-visible' : ''
        }`}
      >
        <NavNode href="#opus" icon="Sun" label="MAGNUM OPUS" color="amber" />
        <NavNode href="#geometry" icon="Triangle" label="GEOMETRY" color="emerald" />
        <NavNode href="#symbols" icon="Gem" label="MATERIA" color="rose" />
        <NavNode href="#transmutation" icon="Flame" label="TRANSMUTE" color="purple" />

        {/* Action Node */}
        <div className="chain-node relative group mt-1">
          <button onClick={onToggle} className="w-10 h-10 rounded-full border border-gold-400 bg-gold-900/80 text-gold-300 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:bg-gold-500 hover:text-black transition-all duration-300">
            <span className="w-4 h-4 animate-spin-slow">⚛</span>
          </button>
          <div className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
            <span className="font-header text-[0.65rem] tracking-[0.25em] text-gold-300 font-bold uppercase">INITIATE</span>
          </div>
        </div>
      </nav>
    </>
  );
};

interface NavNodeProps {
  href: string;
  icon: string;
  label: string;
  color: string;
}

const NavNode: React.FC<NavNodeProps> = ({ href, icon, label, color }) => {
  const iconClass = `text-${color}-400`;

  return (
    <>
      <div className="chain-line w-px bg-gradient-to-b from-gold-400 to-gold-500/50 h-0"></div>
      <div className="chain-node relative group">
        <a
          href={href}
          className="block w-8 h-8 rotate-45 border border-gold-500/50 bg-charcoal/90 backdrop-blur hover:bg-gold-500/20 hover:border-gold-300 transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center rounded-md group-hover:scale-110"
        >
          <span className={`-rotate-45 w-3.5 h-3.5 drop-shadow-[0_0_3px_rgba(251,191,36,0.8)] transition-all group-hover:drop-shadow-[0_0_6px_rgba(251,191,36,1)]`}>
            {icon === 'Sun' && '☀'}
            {icon === 'Triangle' && '△'}
            {icon === 'Gem' && '◆'}
            {icon === 'Flame' && '🔥'}
          </span>
        </a>
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
          <span className="font-header text-[0.65rem] tracking-[0.25em] text-gold-200 bg-black/80 px-2 py-1 rounded-sm border border-gold-500/20 backdrop-blur-md">
            {label}
          </span>
        </div>
      </div>
    </>
  );
};
