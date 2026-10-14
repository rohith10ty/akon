import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ThreeDOrbitSlider } from '../hero/ThreeDOrbitSlider';

export const HeroSection = () => {
  const scrollToFirstGallery = () => {
    const el = document.getElementById('gallery-1');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="h-[100dvh] min-h-[520px] max-h-[1080px] w-full flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-20 sm:pt-24 pb-4 sm:pb-5 relative overflow-hidden">
      {/* Main Hero Center Content: 2-column layout with Title on Left & 3D Orbit Slider on Right */}
      <div className="w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center py-0 relative z-10">
        {/* Left: Yeezy Redefined in "Ideas in motion" style */}
        <div className="lg:col-span-5 flex flex-col items-start justify-center -translate-y-2 lg:-translate-y-4">
          <h1 className="hero__title text-left select-none">
            <span className="block">YEEZY</span>
            <span className="block mt-1 sm:mt-2.5 flex items-baseline">
              <span className="text-white">RE</span>
              <em className="font-serif-fraunces italic text-[#ff5a1f] lowercase ml-2 sm:ml-3">
                defined.
              </em>
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs font-mono text-zinc-400 max-w-xs tracking-wider uppercase">
            3D Sneaker Orbit • Drag to rotate
          </p>
        </div>

        {/* Right: 3D Orbit Slider */}
        <div className="lg:col-span-7 w-full flex items-center justify-center">
          <ThreeDOrbitSlider />
        </div>
      </div>

      {/* Hero Bottom: Compact, clearly visible Scroll to explore indicator */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center pt-1 pb-1 z-20">
        <button
          onClick={scrollToFirstGallery}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-all group cursor-pointer"
        >
          <span className="tracking-[0.22em] uppercase text-[10px] font-mono text-zinc-400 group-hover:text-white transition-colors">
            Scroll to explore
          </span>
          <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/25 border border-white/15 flex items-center justify-center transition-all animate-bounce">
            <ChevronDown className="w-3 h-3 text-white" />
          </div>
        </button>
      </div>
    </section>
  );
};
