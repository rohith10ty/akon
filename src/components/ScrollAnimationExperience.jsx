import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollProgress } from './common/ScrollProgress';
import { Footer } from './common/Footer';
import { HeroSection } from './sections/HeroSection';
import { NarrativeSection } from './sections/NarrativeSection';
import { FlipGallery } from './gallery/FlipGallery';
import { useLenis } from '../hooks/useLenis';
import { introData, sectionDetails, galleriesData } from '../data/galleryData';

// Register GSAP plugins
gsap.registerPlugin(Flip, ScrollTrigger);
if (typeof window !== 'undefined') {
  window.ScrollTrigger = ScrollTrigger;
  window.gsap = gsap;
}

// Reset inline styles left by GSAP Flip while preserving background images
const resetGalleryInlineStyles = (galleryEl) => {
  if (!galleryEl) return;
  galleryEl.classList.remove('gallery--switch');
  const items = galleryEl.querySelectorAll('.gallery__item, .gallery__item-inner, .caption');
  items.forEach((el) => {
    const bg = el.style.backgroundImage;
    el.removeAttribute('style');
    if (bg) {
      el.style.backgroundImage = bg;
    }
  });
};

// Exact triggerFlipOnScroll implementation from reference code
const triggerFlipOnScroll = (galleryEl, options) => {
  if (!galleryEl) return;

  // Clean any prior inline styles before measuring Flip state
  resetGalleryInlineStyles(galleryEl);

  let settings = {
    flip: {
      absoluteOnLeave: false,
      absolute: false,
      scale: true,
      simple: true,
    },
    scrollTrigger: {
      start: 'center center',
      end: '+=300%',
    },
    stagger: 0,
  };

  settings = Object.assign({}, settings, options);

  const galleryCaption = galleryEl.querySelector('.caption');
  const galleryItems = galleryEl.querySelectorAll('.gallery__item');
  const galleryItemsInner = [...galleryItems]
    .map((item) => (item.children.length > 0 ? [...item.children] : []))
    .flat();

  // 1. Temporarily add final class to capture target state
  galleryEl.classList.add('gallery--switch');

  const flipstate = Flip.getState([galleryItems, galleryCaption], {
    props: 'filter, opacity',
  });

  // 2. Remove final class to revert to initial state
  galleryEl.classList.remove('gallery--switch');

  // 3. Create the Flip animation timeline tied to scroll
  const tl = Flip.to(flipstate, {
    ease: 'none',
    absoluteOnLeave: settings.flip?.absoluteOnLeave,
    absolute: settings.flip?.absolute,
    scale: settings.flip?.scale,
    simple: settings.flip?.simple,
    scrollTrigger: {
      trigger: galleryEl,
      start: settings.scrollTrigger.start,
      end: settings.scrollTrigger.end,
      pin: galleryEl.parentNode,
      scrub: true,
    },
    stagger: settings.stagger,
  });

  // 4. Subtle scale for inner cut items if present (Gallery 2)
  if (galleryItemsInner.length) {
    tl.fromTo(
      galleryItemsInner,
      {
        scale: 1.1,
      },
      {
        scale: 1,
        ease: 'none',
      },
      0
    );
  }
};

export const ScrollAnimationExperience = ({ onOpenShop, onNavigateHome }) => {
  const containerRef = useRef(null);

  // Initialize Lenis smooth scroll immediately
  useLenis(true);

  // Execute Flip layout transitions across all galleries in sequence
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    }

    const ctx = gsap.context(() => {
      galleriesData.forEach((gallery) => {
        const galleryEl = document.getElementById(gallery.id);
        if (galleryEl) {
          triggerFlipOnScroll(galleryEl, gallery.options);
        }
      });

      // Ensure all pin spacers and trigger positions are calculated accurately
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, containerRef);

    // Refresh triggers once all assets are loaded
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      ctx.revert();
      if (containerRef.current) {
        containerRef.current.querySelectorAll('.gallery').forEach(resetGalleryInlineStyles);
      }
    };
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Main Experience Stream */}
      <main>
        {/* Full-screen Hero Landing Page with Outfit font & Scroll to Explore */}
        <HeroSection onOpenShop={onOpenShop} onNavigateHome={onNavigateHome} />

        {/* 01. Row Gallery */}
        <FlipGallery {...galleriesData[0]} />

        {/* Narrative: Primeknit Architecture */}
        <NarrativeSection {...sectionDetails.section1} />

        {/* 02. Breakout Grid Gallery */}
        <FlipGallery {...galleriesData[1]} />

        {/* Narrative: Boost Cushioning Technology */}
        <NarrativeSection {...sectionDetails.section2} />

        {/* 03. Mosaic 10-Col Gallery */}
        <FlipGallery {...galleriesData[2]} />

        {/* Narrative: Cultural Streetwear Evolution */}
        <NarrativeSection {...sectionDetails.section3} />

        {/* 04. Dark Stack Gallery */}
        <FlipGallery {...galleriesData[3]} />

        {/* 05. 3D Scale Stack Gallery (with 6 slide images) */}
        <FlipGallery {...galleriesData[4]} />

        {/* Narrative: Sculptural EVA Foam Craft */}
        <NarrativeSection {...sectionDetails.section4} />

        {/* 06. Micro Grid Gallery */}
        <FlipGallery {...galleriesData[5]} />

        {/* Narrative: Large 1-Line 3-Word Statement (FORM MEETS FUTURE) */}
        <NarrativeSection {...sectionDetails.section5} />

        {/* 07. Bento Grid Gallery */}
        <FlipGallery {...galleriesData[6]} />
      </main>

      {/* Footer with brand logo and real navigation links */}
      <Footer onOpenShop={onOpenShop} onNavigateHome={onNavigateHome} />
    </div>
  );
};
