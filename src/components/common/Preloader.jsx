import React, { useEffect, useState } from 'react';

export const Preloader = ({ images = [], onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (images.length === 0) {
      setProgress(100);
      setIsFading(true);
      const timer = setTimeout(() => {
        setIsDone(true);
        onLoaded?.();
      }, 500);
      return () => clearTimeout(timer);
    }

    let loadedCount = 0;
    const total = images.length;
    let isCancelled = false;

    const handleItemLoad = () => {
      if (isCancelled) return;
      loadedCount++;
      const currentProgress = Math.round((loadedCount / total) * 100);
      setProgress(currentProgress);

      if (loadedCount >= total) {
        finish();
      }
    };

    const finish = () => {
      if (isCancelled) return;
      setProgress(100);
      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => {
          setIsDone(true);
          onLoaded?.();
        }, 600);
      }, 150);
    };

    // Preload each image
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleItemLoad;
      img.onerror = handleItemLoad;
    });

    // Fallback timer (maximum 2.5 seconds wait)
    const timeout = setTimeout(() => {
      if (!isCancelled && loadedCount < total) {
        finish();
      }
    }, 2500);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [images, onLoaded]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#131417] flex flex-col items-center justify-center transition-all duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated pulsating dot */}
        <div className="w-14 h-14 rounded-full bg-zinc-300 opacity-40 animate-[loaderAnim_0.7s_linear_infinite_alternate_forwards] mb-8" />

        {/* Title */}
        <h2 className="text-xs uppercase font-mono tracking-[0.25em] text-zinc-400 mb-4">
          Loading Layout Animations
        </h2>

        {/* Progress Bar Container */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-white transition-all duration-150 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numeric Progress */}
        <span className="text-xs font-mono text-zinc-500 tabular-nums">
          {progress}%
        </span>
      </div>
    </div>
  );
};
