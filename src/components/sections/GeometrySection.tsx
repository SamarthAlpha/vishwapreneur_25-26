import React, { useEffect, useRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { easeFunction } from '../../utils/animationUtils';

export const GeometrySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const geoOuterRef = useRef<SVGGElement>(null);
  const geoTri1Ref = useRef<SVGGElement>(null);
  const geoTri2Ref = useRef<SVGGElement>(null);
  const geoSquareRef = useRef<SVGGElement>(null);
  const geoCenterRef = useRef<SVGGElement>(null);
  const geoScatterRef = useRef<SVGGElement>(null);
  const geoPortalRef = useRef<HTMLDivElement>(null);
  const cinematicContainerRef = useRef<HTMLDivElement>(null);
  const cinematicTitleRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const textRingRef = useRef<HTMLDivElement>(null);
  const geoTitleRef = useRef<HTMLDivElement>(null);
  const charElementsRef = useRef<any[]>([]);

  useScrollAnimation((progress) => {
    const reassemblyPhase = Math.max(0, Math.min(1, progress / 0.6));
    const p = easeFunction(reassemblyPhase);

    if (geoOuterRef.current) {
      geoOuterRef.current.style.transform = `rotate(${(1 - p) * 180}deg) scale(${1 + (1 - p) * 0.5})`;
      geoOuterRef.current.style.opacity = String(p);
    }
    if (geoTri1Ref.current) {
      geoTri1Ref.current.style.transform = `translateY(${(1 - p) * -200}px)`;
      geoTri1Ref.current.style.opacity = String(p);
    }
    if (geoTri2Ref.current) {
      geoTri2Ref.current.style.transform = `translateY(${(1 - p) * 200}px)`;
      geoTri2Ref.current.style.opacity = String(p);
    }
    if (geoSquareRef.current) {
      geoSquareRef.current.style.transform = `rotate(${(1 - p) * -90}deg) scale(${p})`;
      geoSquareRef.current.style.opacity = String(p);
    }
    if (geoCenterRef.current) {
      const centerP = Math.max(0, (reassemblyPhase - 0.5) * 2);
      geoCenterRef.current.style.transform = `scale(${centerP})`;
      geoCenterRef.current.style.opacity = String(centerP);
    }
    if (geoScatterRef.current) {
      geoScatterRef.current.style.transform = `scale(${1 + p * 2}) rotate(${p * 360}deg)`;
      geoScatterRef.current.style.opacity = String(1 - p);
    }

    charElementsRef.current.forEach((char) => {
      const curX = char.startX + (char.targetX - char.startX) * p;
      const curY = char.startY + (char.targetY - char.startY) * p;
      const curRot = char.startRot + (char.targetRot - char.startRot) * p;
      char.element.style.transform = `translate(${curX}px, ${curY}px) rotate(${curRot}deg)`;
      char.element.style.opacity = String(Math.min(1, p * 2));
    });

    if (geoPortalRef.current && cinematicContainerRef.current) {
      const wipeStart = 0.6;
      const wipeEnd = 0.8;
      let wipeP = 0;
      if (progress > wipeStart) {
        wipeP = (progress - wipeStart) / (wipeEnd - wipeStart);
        wipeP = Math.max(0, Math.min(1, wipeP));
      }
      const easeWipe = wipeP * wipeP * (3 - 2 * wipeP);
      const radius = easeWipe * 150;
      geoPortalRef.current.style.clipPath = `circle(${radius}% at 50% 50%)`;

      if (svgContainerRef.current) svgContainerRef.current.style.opacity = String(1 - wipeP);
      if (textRingRef.current) textRingRef.current.style.opacity = String(1 - wipeP);
      if (geoTitleRef.current) geoTitleRef.current.style.opacity = String(1 - wipeP);

      const videoStart = 0.8;
      const videoEnd = 0.98;
      let videoP = 0;
      if (progress > videoStart) {
        videoP = (progress - videoStart) / (videoEnd - videoStart);
        videoP = Math.max(0, Math.min(1, videoP));
      }
      cinematicContainerRef.current.style.opacity = String(videoP);
      if (cinematicTitleRef.current) cinematicTitleRef.current.style.opacity = String(videoP);
      cinematicContainerRef.current.style.transform = `scale(${0.95 + videoP * 0.05})`;
    }
  });

  useEffect(() => {
    const phrase = "VISITA • INTERIORA • TERRAE • RECTIFICANDO • INVENIES • OCCULTUM • LAPIDEM • ";
    const textRing = textRingRef.current;
    if (!textRing) return;

    textRing.innerHTML = '';
    charElementsRef.current = [];
    const radius = 42;
    const angleStep = 360 / phrase.length;
    const vmin = Math.min(window.innerWidth, window.innerHeight) / 100;
    const rPx = radius * vmin;

    for (let i = 0; i < phrase.length; i++) {
      const char = phrase[i];
      const span = document.createElement('span');
      span.innerText = char;
      span.className = 'sacred-char text-xs md:text-sm tracking-widest';

      const theta = (i * angleStep - 90) * (Math.PI / 180);
      const targetX = rPx * Math.cos(theta);
      const targetY = rPx * Math.sin(theta);
      const targetRot = i * angleStep;

      const startX = (Math.random() - 0.5) * window.innerWidth * 1.5;
      const startY = (Math.random() - 0.5) * window.innerHeight * 1.5;
      const startRot = Math.random() * 360;

      charElementsRef.current.push({
        element: span,
        startX,
        startY,
        startRot,
        targetX,
        targetY,
        targetRot,
      });

      span.style.transform = `translate(${startX}px, ${startY}px) rotate(${startRot}deg)`;
      span.style.opacity = '0';
      textRing.appendChild(span);
    }
  }, []);

  return (
    <section id="geometry" ref={sectionRef} className="relative h-[500vh] bg-void z-20">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          id="geo-title"
          ref={geoTitleRef}
          className="absolute top-10 text-center z-10 mix-blend-difference pointer-events-none bg-void/30 backdrop-blur-[2px] p-4 rounded-xl transition-opacity duration-500"
        >
          <h2 className="font-header text-3xl md:text-5xl text-gold-300 mb-2 tracking-widest opacity-80">
            SOLVE ET COAGULA
          </h2>
          <p className="font-body text-gold-100/60 text-sm tracking-[0.2em] uppercase">Dissolve and Coagulate</p>
        </div>

        <div id="geo-portal" ref={geoPortalRef} className="absolute inset-0 w-full h-full z-30 pointer-events-none"></div>

        <div id="cinematic-title-outside" ref={cinematicTitleRef} className="absolute top-[90px] left-0 w-full text-center z-45 opacity-0 pointer-events-none">
          <h2 className="font-header text-xs md:text-sm text-gold-300 tracking-[0.4em] uppercase drop-shadow-lg">
            MAGNUM OPUS
          </h2>
        </div>

        <div id="cinematic-container" ref={cinematicContainerRef} className="absolute top-[120px] left-2 right-2 md:left-8 md:right-8 bottom-8 z-40 opacity-0 pointer-events-none border border-gold-500/30 box-shadow: 0 0 50px rgba(0, 0, 0, 0.8) bg-black overflow-hidden">
          <div className="absolute top-[-1px] left-[-1px] w-5 h-5 border-t-2 border-l-2 border-gold-300"></div>
          <div className="absolute top-[-1px] right-[-1px] w-5 h-5 border-t-2 border-r-2 border-gold-300"></div>
          <div className="absolute bottom-[-1px] left-[-1px] w-5 h-5 border-b-2 border-l-2 border-gold-300"></div>
          <div className="absolute bottom-[-1px] right-[-1px] w-5 h-5 border-b-2 border-r-2 border-gold-300"></div>

          <video id="main-video" autoPlay loop muted playsInline crossOrigin="anonymous" className="absolute top-0 left-0 w-full h-full object-cover opacity-100 transition-opacity duration-1000 z-10">
            <source src="https://videos.pexels.com/video-files/5527732/5527732-sd_640_360_25fps.mp4" type="video/mp4" />
          </video>
        </div>

        <div id="text-ring" ref={textRingRef} className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center transition-opacity duration-500"></div>

        <div id="svg-container" ref={svgContainerRef} className="w-full h-full flex items-center justify-center relative transition-opacity duration-500">
          <svg id="reassembly-svg" className="w-[65vmin] h-[65vmin] overflow-visible" viewBox="0 0 600 600">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g id="geo-outer" ref={geoOuterRef} className="geometry-path text-gold-700/50">
              <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
              <circle cx="300" cy="300" r="260" fill="none" stroke="currentColor" strokeWidth="4" />
              <path d="M300 20 L300 40 M300 560 L300 580 M20 300 L40 300 M560 300 L580 300" stroke="currentColor" strokeWidth="2" />
            </g>

            <g id="geo-tri1" ref={geoTri1Ref} className="geometry-path text-gold-500" filter="url(#glow)">
              <polygon points="300,50 516.5,425 83.5,425" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="300" cy="50" r="5" fill="currentColor" />
              <circle cx="516.5" cy="425" r="5" fill="currentColor" />
              <circle cx="83.5" cy="425" r="5" fill="currentColor" />
            </g>

            <g id="geo-tri2" ref={geoTri2Ref} className="geometry-path text-gold-400" filter="url(#glow)">
              <polygon points="300,550 516.5,175 83.5,175" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="300" y1="550" x2="300" y2="300" stroke="currentColor" strokeWidth="1" />
              <line x1="516.5" y1="175" x2="300" y2="300" stroke="currentColor" strokeWidth="1" />
              <line x1="83.5" y1="175" x2="300" y2="300" stroke="currentColor" strokeWidth="1" />
            </g>

            <g id="geo-square" ref={geoSquareRef} className="geometry-path text-gold-300">
              <rect x="200" y="200" width="200" height="200" fill="none" stroke="currentColor" strokeWidth="3" transform="rotate(45 300 300)" />
            </g>

            <g id="geo-center" ref={geoCenterRef} className="geometry-path text-gold-100">
              <circle cx="300" cy="300" r="50" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="300" cy="300" r="10" fill="currentColor" />
              <path d="M300 250 L300 350 M250 300 L350 300" stroke="currentColor" strokeWidth="1" />
            </g>

            <g id="geo-scatter" ref={geoScatterRef} className="geometry-path text-gold-600">
              <path d="M100 100 L120 120 M120 100 L100 120" stroke="currentColor" strokeWidth="2" transform="translate(0,0)" />
              <circle cx="500" cy="100" r="10" fill="none" stroke="currentColor" />
              <rect x="100" y="500" width="20" height="20" fill="none" stroke="currentColor" />
              <path d="M500 500 L510 480 L520 500 Z" fill="none" stroke="currentColor" />
            </g>
          </svg>
        </div>

        <div className="absolute bottom-10 animate-pulse text-gold-500/50 text-xs tracking-widest">SCROLL TO REFORM</div>
      </div>
    </section>
  );
};
