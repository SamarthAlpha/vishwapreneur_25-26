import React, { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { createSpiralPath } from '../../utils/animationUtils';

const ITEM_SPACING_Y = 800;
const ITEM_ANGLE_STEP = 180;
const SPIRAL_RADIUS_BASE = 0.3;
const ROTATION_SPEED_PER_ITEM = 360;

export const SymbolsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const helixGroupRef = useRef<HTMLDivElement>(null);
  const spiralSvgRef = useRef<SVGSVGElement>(null);
  const spiralItemsRef = useRef<HTMLDivElement[]>([]);

  useScrollAnimation((scrollP) => {
    if (!helixGroupRef.current || !spiralItemsRef.current) return;

    const START_INDEX = -0.5;
    const END_INDEX = 4.5;
    const currentFocus = START_INDEX + (END_INDEX - START_INDEX) * scrollP;

    const groupTranslateY = -1 * currentFocus * ITEM_SPACING_Y;
    const groupRotateY = -1 * currentFocus * ROTATION_SPEED_PER_ITEM;

    helixGroupRef.current.style.transform = `translateY(${groupTranslateY}px) rotateY(${groupRotateY}deg)`;
    if (spiralSvgRef.current) spiralSvgRef.current.style.transform = `translateY(${groupTranslateY}px) rotateY(${groupRotateY}deg)`;

    const currentRadius = Math.min(window.innerWidth, window.innerHeight) * SPIRAL_RADIUS_BASE;

    spiralItemsRef.current.forEach((item, index) => {
      const itemAngle = index * ITEM_ANGLE_STEP;
      const itemY = index * ITEM_SPACING_Y;
      const rad = (itemAngle * Math.PI) / 180;
      const x = currentRadius * Math.cos(rad);
      const z = currentRadius * Math.sin(rad);
      const rotY = index * ROTATION_SPEED_PER_ITEM;
      const distFromFocus = Math.abs(currentFocus - index);

      let glowIntensity = 0;
      if (distFromFocus < 0.3) {
        glowIntensity = 1 - distFromFocus / 0.3;
        glowIntensity = Math.pow(glowIntensity, 0.6);
      }

      const quoteEl = item.querySelector('.quote-container');
      if (quoteEl) {
        let quoteOpacity = 0;
        if (distFromFocus < 0.25) {
          quoteOpacity = 1 - distFromFocus / 0.25;
          quoteOpacity = Math.pow(quoteOpacity, 0.5);
        }
        (quoteEl as HTMLElement).style.opacity = String(quoteOpacity);
        const slideOffset = (1 - quoteOpacity) * 20;
        (quoteEl as HTMLElement).style.transform = `translateY(calc(-50% + ${slideOffset}px))`;
      }

      if (glowIntensity > 0.01) {
        const coreColor = `rgba(255, 223, 0, ${glowIntensity * 0.9})`;
        const rimColor = `rgba(184, 134, 11, ${glowIntensity * 0.7})`;
        item.style.boxShadow = `inset 0 0 ${15 * glowIntensity}px ${coreColor}, 0 0 ${2 * glowIntensity}px ${rimColor}, 0 0 ${25 * glowIntensity}px ${rimColor}`;
        item.style.borderColor = `rgba(255, 215, 0, ${0.4 + 0.6 * glowIntensity})`;
        item.style.backgroundColor = `rgba(20, 20, 20, ${0.3 + 0.4 * glowIntensity})`;
        item.style.zIndex = '100';
        const h3 = item.querySelector('h3');
        if (h3) {
          h3.textContent = h3.textContent?.toUpperCase() || '';
          (h3 as HTMLElement).style.textShadow = `0 1px 2px rgba(0,0,0,0.8), 0 0 ${10 * glowIntensity}px rgba(255, 215, 0, 0.6)`;
          (h3 as HTMLElement).style.color = '#FFF';
          (h3 as HTMLElement).style.letterSpacing = `${2 + glowIntensity}px`;
        }
      } else {
        item.style.boxShadow = 'inset 0 0 20px rgba(255, 255, 255, 0.03), 0 4px 10px rgba(0, 0, 0, 0.6)';
        item.style.borderColor = 'rgba(212, 175, 55, 0.1)';
        item.style.backgroundColor = 'rgba(10, 10, 10, 0.3)';
        item.style.zIndex = '10';
        const h3 = item.querySelector('h3');
        if (h3) {
          (h3 as HTMLElement).style.textShadow = 'none';
          (h3 as HTMLElement).style.color = '';
          (h3 as HTMLElement).style.letterSpacing = '2px';
        }
      }

      let opacity = 0;
      if (distFromFocus < 0.8) {
        opacity = 1;
      } else {
        opacity = 1 - Math.pow((distFromFocus - 0.8) / 1.0, 2);
        opacity = Math.max(0, Math.min(1, opacity));
      }

      const scale = 0.6 + 0.4 * opacity + 0.02 * glowIntensity;
      item.style.opacity = String(opacity);
      item.style.transform = `translate3d(${x}px, ${itemY}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`;
    });
  });

  useEffect(() => {
    if (spiralSvgRef.current) {
      createSpiralPath(spiralSvgRef.current, ITEM_SPACING_Y, SPIRAL_RADIUS_BASE, ITEM_ANGLE_STEP);
    }
  }, []);

  const symbols = [
    {
      name: 'Lapis',
      quote: '"The Stone that is not a stone, a precious thing that has no value."',
      source: 'Rosarium Philosophorum',
      quoteAlign: 'left',
      orbClass: 'orb-lapis',
      description: 'Immortality & Perfection',
    },
    {
      name: 'Mercury',
      quote: '"It is the father of all metals, the fluid spirit of life."',
      source: 'The Emerald Tablet',
      quoteAlign: 'right',
      orbClass: 'orb-mercury',
      description: 'Fluid Spirit & Mind',
    },
    {
      name: 'Sulphur',
      quote: '"The internal fire that activates and coagulates the spirit."',
      source: 'Paracelsus',
      quoteAlign: 'left',
      orbClass: 'orb-sulphur',
      description: 'Active Soul & Fire',
    },
    {
      name: 'Salt',
      quote: '"The key to the lock, the beginning and the end of the work."',
      source: 'Hermetic Corpus',
      quoteAlign: 'right',
      orbClass: 'orb-salt',
      description: 'Body & Matter',
    },
  ];

  return (
    <section id="symbols" className="relative h-[1000vh] bg-charcoal z-10">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center scene-3d perspective-3d">
        <div className="absolute top-12 text-center z-20 pointer-events-none">
          <h2 className="font-header text-5xl text-gold-200 mb-2 tracking-wide">The Prima Materia</h2>
          <p className="text-gray-500 font-body text-xl tracking-widest uppercase opacity-60">The Ingredients of the Cosmos</p>
        </div>

        <div id="helix-group" ref={helixGroupRef} className="helix-group flex items-center justify-center">
          <svg id="spiral-svg" ref={spiralSvgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30"></svg>

          {symbols.map((symbol, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) spiralItemsRef.current[idx] = el;
              }}
              className="symbol-card spiral-item group"
            >
              <div className={`quote-container quote-${symbol.quoteAlign}`}>
                <p className="quote-text">{symbol.quote}</p>
                <span className="quote-sub">{symbol.source}</span>
              </div>

              <div className="h-32 w-32 mb-4 relative flex items-center justify-center">
                <div className={`alchemy-orb ${symbol.orbClass}`}></div>
              </div>
              <h3 className="font-header text-gold-300 text-lg mb-1 tracking-widest">{symbol.name}</h3>
              <p className="text-gray-400 text-xs text-center px-8 leading-relaxed">{symbol.description}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 animate-pulse text-gold-500/50 text-xs tracking-widest z-20">SCROLL TO ASCEND</div>
      </div>
    </section>
  );
};
