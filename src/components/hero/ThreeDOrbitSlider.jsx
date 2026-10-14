import React, { useRef, useEffect, useState, useCallback } from 'react';

const shoeSlides = [
  { src: '/orbit-shoes/shoe1.webp', title: '350 V2 Beluga', tag: 'Reflective' },
  { src: '/orbit-shoes/shoe2.webp', title: '350 V2 Core Black', tag: 'Bred Edition' },
  { src: '/orbit-shoes/shoe3.webp', title: '350 V2 Zebra', tag: 'Monochrome' },
  { src: '/orbit-shoes/shoe4.webp', title: '350 V2 Bone', tag: 'Pure White' },
  { src: '/orbit-shoes/shoe5.webp', title: '350 V2 Granite', tag: 'Neutral Grey' },
  { src: '/orbit-shoes/shoe6.webp', title: '350 V2 Salt', tag: 'Sage Undertone' },
  { src: '/orbit-shoes/shoe7.webp', title: '350 V2 Carbon', tag: 'Ashen Weave' },
  { src: '/orbit-shoes/shoe8.webp', title: 'Yeezy Slide Azure', tag: 'Cobalt Blue' },
  { src: '/orbit-shoes/shoe9.webp', title: 'Yeezy Slide Flax', tag: 'Warm Ochre' },
  { src: '/orbit-shoes/shoe10.webp', title: 'Yeezy Foam Runner', tag: 'Onyx Mineral' },
];

const totalSlides = shoeSlides.length;
const angleBetweenSlides = 360 / totalSlides;

export const ThreeDOrbitSlider = () => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const orbitRef = useRef(null);
  const previewRef = useRef(null);
  const titleRef = useRef(null);
  const previewImgRef = useRef(null);

  const [activeTitle, setActiveTitle] = useState(shoeSlides[0].title);
  const [activeTag, setActiveTag] = useState(shoeSlides[0].tag);
  const [isDragging, setIsDragging] = useState(false);

  // Animation refs
  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const currentTiltXRef = useRef(0);
  const currentTiltYRef = useRef(0);
  const targetTiltXRef = useRef(0);
  const targetTiltYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartRotRef = useRef(0);
  const lastActiveIndexRef = useRef(0);

  // Responsive radius calibrated to fit laptop screens without clipping
  const getRadius = useCallback(() => {
    if (typeof window === 'undefined') return 230;
    if (window.innerWidth < 640) return 140;
    if (window.innerWidth < 1024) return 180;
    if (window.innerWidth < 1440) return 225;
    return 250;
  }, []);

  useEffect(() => {
    let animId;
    const lerp = (from, to, amount) => from + (to - from) * amount;
    const smoothing = 0.06;

    const tick = () => {
      // Gentle auto-rotation when user is not actively dragging
      if (!isDraggingRef.current) {
        targetRotationRef.current -= 0.16;
      }

      // Smooth interpolation for rotation
      currentRotationRef.current = lerp(
        currentRotationRef.current,
        targetRotationRef.current,
        smoothing
      );

      // Smooth interpolation for tilt
      currentTiltXRef.current = lerp(
        currentTiltXRef.current,
        targetTiltXRef.current,
        smoothing
      );
      currentTiltYRef.current = lerp(
        currentTiltYRef.current,
        targetTiltYRef.current,
        smoothing
      );

      const rot = currentRotationRef.current;
      const tiltX = currentTiltXRef.current;
      const tiltY = currentTiltYRef.current;

      if (stageRef.current) {
        stageRef.current.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      if (orbitRef.current) {
        orbitRef.current.style.transform = `translate(-50%, -50%) rotateY(${rot}deg)`;
      }

      if (previewRef.current) {
        previewRef.current.style.transform = `translate(-50%, -50%) rotateY(${-rot}deg)`;
      }

      // Active slide detection
      const steps = Math.round(-rot / angleBetweenSlides);
      const activeIndex = ((steps % totalSlides) + totalSlides) % totalSlides;

      if (activeIndex !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = activeIndex;
        if (previewImgRef.current) {
          previewImgRef.current.src = shoeSlides[activeIndex].src;
        }
        setActiveTitle(shoeSlides[activeIndex].title);
        setActiveTag(shoeSlides[activeIndex].tag);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const maxTilt = 16;
    targetTiltYRef.current = x * maxTilt;
    targetTiltXRef.current = -y * maxTilt;

    if (isDraggingRef.current) {
      const deltaX = e.clientX - dragStartXRef.current;
      targetRotationRef.current = dragStartRotRef.current + deltaX * 0.35;
    }
  };

  const handleMouseLeave = () => {
    targetTiltXRef.current = 0;
    targetTiltYRef.current = 0;
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartRotRef.current = targetRotationRef.current;
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const radius = getRadius();

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`relative w-full h-[310px] sm:h-[350px] lg:h-[380px] max-w-[540px] mx-auto flex items-center justify-center select-none -translate-y-2 sm:-translate-y-4 lg:-translate-y-6 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ perspective: '1600px', touchAction: 'pan-y' }}
    >
      {/* 3D Stage with Tilt */}
      <div
        ref={stageRef}
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Rotating Cylinder Orbit */}
        <div
          ref={orbitRef}
          className="absolute top-1/2 left-1/2 w-[72px] h-[96px] sm:w-[82px] sm:h-[109px]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Center Preview Card - Counter-rotates to stay facing the viewer */}
          <div
            ref={previewRef}
            className="absolute top-1/2 left-1/2 w-[165px] h-[220px] sm:w-[190px] sm:h-[254px] lg:w-[205px] lg:h-[273px] rounded-2xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.85)] border border-white/25 bg-white"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          >
            <img
              ref={previewImgRef}
              src={shoeSlides[0].src}
              alt="Preview"
              className="w-full h-full object-cover pointer-events-none transition-opacity duration-300"
            />
            {/* Subtle inner gloss highlight */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/30 pointer-events-none" />
          </div>

          {/* 10 Cylindrical Orbit Panels */}
          {shoeSlides.map((slide, idx) => {
            const angle = idx * angleBetweenSlides;
            return (
              <div
                key={idx}
                className="absolute inset-0 rounded-xl overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.7)] border border-white/20 bg-white backface-visible"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
              >
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover pointer-events-none brightness-95 hover:brightness-100 transition-all"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Active Title Pill Badge */}
      <div
        ref={titleRef}
        className="absolute bottom-0 sm:bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.6)] text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-white pointer-events-none z-20"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f] animate-pulse" />
        <span className="font-semibold">{activeTitle}</span>
        <span className="hidden sm:inline text-zinc-500 font-normal">| {activeTag}</span>
      </div>
    </div>
  );
};
