import React from 'react';

export const Footer = ({ onOpenShop, onNavigateHome }) => {
  const handleNav = (targetId) => {
    if (targetId === 'shop') {
      if (onOpenShop) onOpenShop();
      return;
    }
    if (onNavigateHome) onNavigateHome();
    setTimeout(() => {
      if (targetId === 'root') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <footer className="mt-0 border-t border-white/10 bg-zinc-950/90 backdrop-blur-lg py-12 px-6 sm:px-12 lg:px-20 relative z-10" id="footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Logo & Editorial Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-serif-fraunces text-2xl sm:text-3xl font-normal tracking-tight text-white">
              Akon<span className="italic text-[#ff5a1f] ml-0.5">*</span>
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-light">
            Avant-garde Yeezy footwear archive, modular ergonomics, and architectural sneaker design.
          </p>
        </div>

        {/* Real Navigation Links (Replacing Tech Skills Badges) */}
        <nav aria-label="Footer Navigation">
          <ul className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
            <li>
              <button
                onClick={() => handleNav('root')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('shop')}
                className="hover:text-[#ff5a1f] text-zinc-200 transition-colors cursor-pointer"
              >
                Shop Collection
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('gallery-1')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                350 V2
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('gallery-2')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Slides & Foams
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('gallery-7')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                The Archive
              </button>
            </li>
          </ul>
        </nav>

        {/* Copyright notice - Clean, without any top-to-bottom / back-to-top buttons */}
        <div className="text-[11px] font-mono text-zinc-500">
          <span>© 2026 Akon Studio. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
