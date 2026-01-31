import { useEffect, useState } from 'react';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/ui/Footer';
import { Separator } from './components/ui/Separator';
import { HeroSection } from './components/sections/HeroSection';
import { GeometrySection } from './components/sections/GeometrySection';
import { SymbolsSection } from './components/sections/SymbolsSection';
import { ArchiveSection } from './components/sections/ArchiveSection';
import { TransmutationSection } from './components/sections/TransmutationSection';
import { useScrollReveal } from './hooks/useScrollReveal';
import { initRandomGlows } from './utils/animationUtils';
import './App.css';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useScrollReveal();

  useEffect(() => {
    // Initialize random glow effects when geometry section loads
    const timer = setTimeout(() => {
      initRandomGlows();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="font-body selection:bg-gold-500 selection:text-black">
      {/* Atmospheric Smoke Background */}
      <div className="smoke-container">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gold-900/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Navbar */}
      <Navbar isNavOpen={isNavOpen} onToggle={toggleNav} />

      {/* Sections */}
      <HeroSection />
      <GeometrySection />

      {/* Separator */}
      <Separator />

      {/* Symbols Section */}
      <SymbolsSection />

      {/* Separator 2 */}
      <Separator className="bg-void/50 backdrop-blur-sm -mt-24 mb-12" />

      {/* Archive Section */}
      <ArchiveSection />

      {/* Transmutation Section */}
      <TransmutationSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
