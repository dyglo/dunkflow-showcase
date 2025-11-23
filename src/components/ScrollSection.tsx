import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import shoeCenter from '@/assets/shoe-center.png';
import shoeLeft from '@/assets/shoe-left.png';
import shoeRight from '@/assets/shoe-right.png';

gsap.registerPlugin(ScrollTrigger);

const ScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinned = pinnedRef.current;

    if (!container || !pinned) return;

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: pinned,
        anticipatePin: 1,
      },
    });

    // Stage 1: Initial State & Transition (0% to 25%)
    tl.to('#shoe-center', {
      scale: 1.3,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.inOut',
    })
      .to(
        '#text-1',
        {
          opacity: 1,
          duration: 0.1,
          ease: 'power2.in',
        },
        0
      )
      .to(
        '#text-1',
        {
          opacity: 0,
          duration: 0.15,
          ease: 'power2.out',
        },
        0.15
      );

    // Stage 2: Split Reveal (25% to 50%)
    tl.fromTo(
      '#shoe-left',
      {
        x: -150,
        opacity: 0,
      },
      {
        x: -20,
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
      }
    )
      .fromTo(
        '#shoe-right',
        {
          x: 150,
          opacity: 0,
        },
        {
          x: 20,
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
        },
        '<'
      )
      .to(
        '#text-2',
        {
          opacity: 1,
          duration: 0.15,
          ease: 'power2.in',
        },
        '<'
      );

    // Stage 3: Detail Fade (50% to 75%)
    tl.to('#text-2', {
      opacity: 0,
      duration: 0.15,
      ease: 'power2.out',
    }).to(
      '#text-3',
      {
        opacity: 1,
        duration: 0.1,
        ease: 'power2.in',
      },
      '<'
    );

    // Stage 4: Exit (75% to 100%)
    tl.to('#shoe-left', {
      x: -300,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.inOut',
    })
      .to(
        '#shoe-right',
        {
          x: 300,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(
        '#text-3',
        {
          opacity: 0,
          duration: 0.15,
          ease: 'power2.out',
        },
        '<'
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-background">
      <div
        ref={pinnedRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Pinned Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Image 1 - Center */}
          <img
            id="shoe-center"
            src={shoeCenter}
            alt="Nike SB Dunk Orange Lobster"
            className="absolute w-[500px] h-auto object-contain"
            style={{ opacity: 1, scale: 1.1 }}
          />

          {/* Image 2 - Left */}
          <img
            id="shoe-left"
            src={shoeLeft}
            alt="Nike SB Dunk Side View"
            className="absolute w-[400px] h-auto object-contain"
            style={{ opacity: 0 }}
          />

          {/* Image 3 - Right */}
          <img
            id="shoe-right"
            src={shoeRight}
            alt="Nike SB Dunk Rear View"
            className="absolute w-[400px] h-auto object-contain"
            style={{ opacity: 0 }}
          />
        </div>

        {/* Text Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Text Block 1 */}
          <div
            id="text-1"
            className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center opacity-0"
          >
            <h2 className="text-6xl md:text-8xl font-bebas uppercase text-foreground tracking-tighter">
              Orange Lobster
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mt-4 font-medium">
              Premium craftsmanship meets iconic design
            </p>
          </div>

          {/* Text Block 2 */}
          <div
            id="text-2"
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-center opacity-0 max-w-2xl px-6"
          >
            <h3 className="text-4xl md:text-5xl font-bebas uppercase text-accent tracking-wide">
              On-Foot Excellence
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mt-3 leading-relaxed">
              Experience the perfect blend of street style and comfort with every step
            </p>
          </div>

          {/* Text Block 3 */}
          <div
            id="text-3"
            className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center opacity-0 max-w-xl px-6"
          >
            <h3 className="text-5xl md:text-6xl font-bebas uppercase text-foreground italic tracking-tighter">
              Legendary Details
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mt-3 font-medium">
              Every stitch tells a story of skateboarding heritage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollSection;
