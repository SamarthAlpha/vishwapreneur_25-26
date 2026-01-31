import React, { useEffect, useRef } from 'react';
import { useAlchemyCanvas } from '../../hooks/useAlchemyCanvas';

export const TransmutationSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const goldCountRef = useRef<HTMLSpanElement>(null);
  const leadCountRef = useRef<HTMLSpanElement>(null);
  const { countsRef } = useAlchemyCanvas('alchemyCanvas');

  useEffect(() => {
    const updateCounts = setInterval(() => {
      if (goldCountRef.current && leadCountRef.current) {
        goldCountRef.current.innerText = String(countsRef.current.gold);
        leadCountRef.current.innerText = String(countsRef.current.lead);
      }
    }, 100);

    return () => clearInterval(updateCounts);
  }, [countsRef]);

  return (
    <section id="transmutation" className="relative h-screen bg-transparent flex flex-col items-center justify-center overflow-hidden z-10">
      <div className="absolute inset-0 z-0">
        <canvas id="alchemyCanvas" ref={canvasRef}></canvas>
      </div>

      <div className="relative z-10 text-center pointer-events-none mix-blend-difference">
        <h2 className="font-header text-5xl md:text-7xl text-gold-100 mb-4 tracking-tight">TRANSMUTATION</h2>
        <p className="font-body text-xl text-white/80">Move your cursor to transmute Lead into Gold</p>
      </div>

      <div className="absolute bottom-10 left-0 w-full flex justify-center z-10">
        <div className="border border-gold-500/30 bg-black/50 backdrop-blur px-8 py-4 rounded-full flex gap-8">
          <div className="text-center">
            <span ref={leadCountRef} className="block text-2xl font-header text-gray-500">
              0
            </span>
            <span className="text-xs uppercase tracking-widest text-gray-600">Lead</span>
          </div>
          <div className="w-[1px] bg-gold-500/30"></div>
          <div className="text-center">
            <span ref={goldCountRef} className="block text-2xl font-header text-gold-400">
              0
            </span>
            <span className="text-xs uppercase tracking-widest text-gold-600">Gold</span>
          </div>
        </div>
      </div>
    </section>
  );
};
