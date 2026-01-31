import React from 'react';
import { Play, ArrowDown } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface GalleryItemData {
  type: 'video' | 'image';
  src: string;
  poster?: string;
  title: string;
  subtitle: string;
}

const galleryItems: GalleryItemData[] = [
  {
    type: 'video',
    src: 'https://videos.pexels.com/video-files/3163534/3163534-sd_640_360_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop',
    title: 'Nigredo',
    subtitle: '"Putrefaction and decomposition."',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=800&auto=format&fit=crop',
    title: 'Liber Mutus',
    subtitle: '"The Silent Book."',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop',
    title: 'Macrocosm',
    subtitle: '"As above, so below."',
  },
  {
    type: 'video',
    src: 'https://videos.pexels.com/video-files/2022395/2022395-sd_640_360_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    title: 'Ignis Ardens',
    subtitle: '"Purification and calcination."',
  },
  {
    type: 'video',
    src: 'https://videos.pexels.com/video-files/6561173/6561173-sd_360_640_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=600&auto=format&fit=crop',
    title: 'Sublimation',
    subtitle: '"Transition from solid to gas."',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1601379327896-d25032df7377?q=80&w=800&auto=format&fit=crop',
    title: 'Geometry',
    subtitle: '"Language of creation."',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&auto=format&fit=crop',
    title: 'Aurum Potabile',
    subtitle: '"The universal medicine."',
  },
  {
    type: 'video',
    src: 'https://videos.pexels.com/video-files/7565436/7565436-sd_540_960_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1515405295579-ba7b45498955?q=80&w=600&auto=format&fit=crop',
    title: 'The Great Work',
    subtitle: '"The laboratory of the soul."',
  },
];

export const ArchiveSection: React.FC = () => {
  useScrollReveal();

  return (
    <section
      id="archive"
      className="relative min-h-screen w-full bg-void z-20 flex flex-col items-center justify-start py-12 md:py-24 px-3 md:px-12"
    >
      <div className="text-center mb-8 md:mb-16 relative z-10 w-full max-w-4xl mx-auto reveal-on-scroll">
        <h2 className="font-header text-3xl md:text-5xl text-gold-200 mb-2 md:mb-4 tracking-widest">THE ARCHIVE</h2>
        <p className="text-gold-100/50 text-xs md:text-sm tracking-[0.3em] uppercase mb-8">Visual Records of the Great Work</p>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-2 gap-3 md:gap-10">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            className="gallery-item group cursor-pointer reveal-on-scroll"
            style={{ transitionDelay: idx % 2 === 0 ? '0ms' : '100ms' }}
          >
            {item.type === 'video' ? (
              <>
                <video
                  className="gallery-media pointer-events-none"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={item.poster}
                >
                  <source src={item.src} type="video/mp4" />
                </video>
                <div className="video-indicator">
                  <Play className="w-3 h-3 fill-current" />
                </div>
              </>
            ) : (
              <img src={item.src} alt={item.title} className="gallery-media" />
            )}

            <div className="gallery-overlay p-4 md:p-8">
              <h3 className="font-header text-gold-300 text-sm md:text-2xl tracking-widest leading-tight">
                {item.title}
              </h3>
              <p className="font-body text-gray-300 text-[0.65rem] md:text-sm italic border-l border-gold-500/50 pl-2 md:pl-3 mt-1 md:mt-2 hidden sm:block">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-16 reveal-on-scroll">
        <button className="border border-gold-500/30 px-6 md:px-10 py-3 md:py-4 rounded-sm text-gold-300 hover:bg-gold-500/10 hover:border-gold-300 transition-all font-header text-[0.6rem] md:text-xs tracking-[0.3em] flex items-center gap-3">
          <span>EXPLORE ARCHIVES</span>
          <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
    </section>
  );
};
