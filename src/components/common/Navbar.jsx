import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const Navbar = ({ galleries = [] }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-40 bg-transparent border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/15">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-semibold text-sm tracking-wide text-white block">
              On-Scroll Layout Animations
            </span>
            <span className="text-[11px] text-zinc-400 font-mono tracking-wider uppercase">
              React + Vite + Tailwind
            </span>
          </div>
        </div>

        {/* Quick jump gallery selector */}
        <nav className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-1">
          {galleries.map((gallery, idx) => (
            <button
              key={gallery.id}
              onClick={() => scrollTo(gallery.id)}
              className="px-2.5 py-1 text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              title={`Jump to ${gallery.title || `Gallery ${idx + 1}`}`}
            >
              0{idx + 1}
            </button>
          ))}
        </nav>

        {/* Action Links */}
        <div className="flex items-center gap-3 text-xs">
          <a
            href="https://tympanus.net/codrops/?p=72941"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
          >
            <span>Article</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
          <a
            href="https://tympanus.net/Development/ScrollTransitions/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Previous Demo</span>
          </a>
        </div>
      </div>
    </header>
  );
};
