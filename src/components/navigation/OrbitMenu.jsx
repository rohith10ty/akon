import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ShoppingBag, CreditCard } from 'lucide-react';

const shoeNavItems = [
  {
    num: '01',
    main: 'Home',
    tag: 'Akon Studio',
    targetId: 'root',
  },
  {
    num: '02',
    main: 'Shop Collection',
    tag: 'All Footwear & Silhouettes',
    targetId: 'shop',
  },
  {
    num: '03',
    main: 'Instant Checkout',
    tag: 'Direct Secure Order',
    targetId: 'checkout',
  },
  {
    num: '04',
    main: 'Yeezy 350 V2',
    tag: 'Row Expand Architecture',
    targetId: 'gallery-1',
  },
  {
    num: '05',
    main: 'Slides & Foams',
    tag: 'Breakout Minimalist Grid',
    targetId: 'gallery-2',
  },
  {
    num: '06',
    main: 'Mosaic Edition',
    tag: 'Multi-Angle Granite Showcase',
    targetId: 'gallery-3',
  },
  {
    num: '07',
    main: 'The Archive',
    tag: '60-Item Micro Grid',
    targetId: 'gallery-7',
  },
  {
    num: '08',
    main: 'About & Contact',
    tag: 'Footwear Studio',
    targetId: 'footer',
  },
];

export const OrbitMenu = ({
  onOpenShop,
  onOpenCheckout,
  onNavigateHome,
  currentView = 'home',
  isShopView = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isOpenRef = useRef(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const contentRef = useRef(null);
  const circleRef = useRef(null);
  const tlRef = useRef(null);
  const clipState = useRef({ r: 0 });

  // Monitor scroll for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate circular expansion origin and maximum radius to cover viewport
  const computeCircle = useCallback(() => {
    if (!toggleRef.current) {
      return { cx: window.innerWidth - 60, cy: 60, maxR: window.innerWidth * 1.5 };
    }
    const rect = toggleRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const dx = Math.max(cx, vw - cx);
    const dy = Math.max(cy, vh - cy);
    const maxR = Math.sqrt(dx * dx + dy * dy) + 50;

    return { cx, cy, maxR };
  }, []);

  // Update SVG circle and CSS clip-path in lockstep
  const applyCircle = useCallback((cx, cy, r) => {
    if (circleRef.current) {
      circleRef.current.setAttribute('cx', cx);
      circleRef.current.setAttribute('cy', cy);
      circleRef.current.setAttribute('r', r);
    }
    if (contentRef.current) {
      contentRef.current.style.setProperty('--cx', `${cx}px`);
      contentRef.current.style.setProperty('--cy', `${cy}px`);
      contentRef.current.style.setProperty('--cr', `${r}px`);
    }
  }, []);

  // Initialize GSAP ink-blot animation timeline once on mount
  useEffect(() => {
    const coords = computeCircle();
    applyCircle(coords.cx, coords.cy, 0);

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power3.inOut' },
      onUpdate: () => {
        const c = computeCircle();
        applyCircle(c.cx, c.cy, clipState.current.r);
      },
    });

    tl.to(
      clipState.current,
      {
        r: () => computeCircle().maxR,
        duration: 0.85,
        ease: 'power3.inOut',
      },
      0
    );

    tlRef.current = tl;

    const handleResize = () => {
      const c = computeCircle();
      if (isOpenRef.current) {
        applyCircle(c.cx, c.cy, c.maxR);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpenRef.current) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      tl.kill();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [computeCircle, applyCircle]);

  // Handle open / close states and lock all scrolling when open
  useEffect(() => {
    isOpenRef.current = isOpen;
    if (!tlRef.current) return;

    if (isOpen) {
      document.body.classList.add('is-open');
      if (window.lenis) {
        window.lenis.stop();
      }
      tlRef.current.play();

      const preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };

      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });

      return () => {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
      };
    } else {
      document.body.classList.remove('is-open');
      if (window.lenis) {
        window.lenis.start();
      }
      tlRef.current.reverse();
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavigate = (targetId) => {
    setIsOpen(false);
    setTimeout(() => {
      if (targetId === 'shop') {
        if (onOpenShop) onOpenShop();
        return;
      }

      if (targetId === 'checkout') {
        if (onOpenCheckout) onOpenCheckout();
        return;
      }

      if (isShopView && onNavigateHome) {
        onNavigateHome();
        setTimeout(() => {
          if (targetId === 'root') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return;
      }

      if (targetId === 'root') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 350);
  };

  return (
    <>
      {/* Sticky Header Bar - Always visible wherever user scrolls */}
      <header className="fixed top-0 left-0 w-full z-60 px-6 sm:px-12 lg:px-20 py-4 sm:py-5 flex items-center justify-between bg-transparent pointer-events-none">
        <button
          onClick={() => {
            if (isShopView && onNavigateHome) {
              onNavigateHome();
            } else {
              handleNavigate('root');
            }
          }}
          className={`pointer-events-auto font-serif-fraunces text-2xl sm:text-3xl font-normal tracking-tight flex items-center group cursor-pointer border-none bg-transparent transition-colors duration-400 ${
            isOpen ? 'text-[#111111]' : 'text-white'
          }`}
        >
          <span>Akon</span>
          <span className="italic text-[#ff5a1f] ml-0.5 group-hover:scale-125 transition-transform duration-300">
            *
          </span>
        </button>

        {/* Beside menu button lines: SHOP & CHECKOUT BUTTONS */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenShop}
            className={`px-3.5 sm:px-4 py-2 rounded-full border text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              currentView === 'shop'
                ? 'bg-[#ff5a1f] border-[#ff5a1f] text-white shadow-lg shadow-[#ff5a1f]/25 font-semibold'
                : isOpen
                ? 'border-black/20 text-[#111111] hover:bg-black/5 hover:border-black'
                : 'border-white/20 text-white hover:bg-white hover:text-black hover:border-white shadow-lg bg-black/20 backdrop-blur-sm'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shop</span>
          </button>

          <button
            onClick={onOpenCheckout}
            className={`px-3.5 sm:px-4 py-2 rounded-full border text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              currentView === 'checkout'
                ? 'bg-[#ff5a1f] border-[#ff5a1f] text-white shadow-lg shadow-[#ff5a1f]/25 font-semibold'
                : isOpen
                ? 'border-black/20 text-[#111111] hover:bg-black/5 hover:border-black'
                : 'border-white/20 text-white hover:bg-white hover:text-black hover:border-white shadow-lg bg-black/20 backdrop-blur-sm'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Checkout</span>
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            ref={toggleRef}
            onClick={toggleMenu}
            className={`menu-toggle ${isOpen ? 'is-open' : ''}`}
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="toggle__inner" aria-hidden="true">
              <span className="toggle__line" />
              <span className="toggle__line" />
              <span className="toggle__line" />
            </span>
          </button>
        </div>
      </header>

      {/* Orbit Menu Ink-Blot Overlay */}
      <div
        ref={menuRef}
        className={`orbit-menu ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        {/* SVG clip mask */}
        <svg className="orbit-menu__svg" aria-hidden="true">
          <defs>
            <clipPath id="orbitClip" clipPathUnits="userSpaceOnUse">
              <circle ref={circleRef} cx="100" cy="100" r="0" />
            </clipPath>
          </defs>
          <rect
            className="orbit-menu__fill"
            width="100%"
            height="100%"
            clipPath="url(#orbitClip)"
          />
        </svg>

        {/* Clipped interactive content */}
        <div ref={contentRef} className="orbit-menu__content">
          <nav className="orbit-nav">
            <ul className="orbit-nav__list">
              {shoeNavItems.map((item) => (
                <li key={item.num} className="orbit-nav__item">
                  <button
                    onClick={() => handleNavigate(item.targetId)}
                    className="orbit-nav__link w-full text-left bg-transparent border-none cursor-pointer"
                  >
                    <span className="orbit-nav__num">{item.num}</span>

                    {/* Stays in place, changes color to #ff5a1f on hover */}
                    <span className="orbit-nav__title">
                      {item.main}
                    </span>

                    <span className="orbit-nav__tag hidden sm:inline-block">
                      {item.tag}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom menu metadata */}
          <div className="w-full max-w-[860px] mx-auto pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Akon Studio • Yeezy Footwear Architecture</span>
            <span className="hidden sm:inline">Press ESC to close</span>
          </div>
        </div>
      </div>
    </>
  );
};
