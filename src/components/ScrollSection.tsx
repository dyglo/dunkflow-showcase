import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import shoeCenter from '@/assets/shoe-center.png';
import shoeCenterAlt from '@/assets/shoe-center-alt.png';
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
        scrub: 1,
        pin: pinned,
        anticipatePin: 1,
      },
    });

    // Stage 1: Intro & Hero Shoe (0% to 20%)
    tl.to('#shoe-center', {
      scale: 1.2,
      duration: 0.2,
      ease: 'power3.out',
    })
      .to(
        '#text-1',
        {
          opacity: 1,
          duration: 0.05,
          ease: 'power2.inOut',
        },
        0.05
      )
      .to(
        '#text-1',
        {
          opacity: 0,
          duration: 0.05,
          ease: 'power2.inOut',
        },
        0.15
      );

    // Stage 2: Split Reveal - Left & Right Shoes (20% to 45%)
    tl.to('#shoe-center', {
      scale: 0.8,
      opacity: 0,
      duration: 0.1,
      ease: 'power2.inOut',
    })
      .fromTo(
        '#shoe-left',
        {
          x: -400,
          opacity: 0,
        },
        {
          x: -280,
          opacity: 1,
          duration: 0.15,
          ease: 'power3.out',
        },
        '<'
      )
      .fromTo(
        '#shoe-right',
        {
          x: 400,
          opacity: 0,
        },
        {
          x: 280,
          opacity: 1,
          duration: 0.15,
          ease: 'power3.out',
        },
        '<'
      )
      .to(
        '#text-2',
        {
          opacity: 1,
          duration: 0.1,
          ease: 'power2.inOut',
        },
        '<0.05'
      );

    // Stage 3: Detail Focus & 4th Image Introduction (45% to 70%)
    tl.to('#text-2', {
      opacity: 0,
      duration: 0.08,
      ease: 'power2.inOut',
    })
      .fromTo(
        '#shoe-center-alt',
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1.1,
          opacity: 1,
          duration: 0.15,
          ease: 'power3.out',
        },
        '<'
      )
      .to(
        '#text-3',
        {
          opacity: 1,
          duration: 0.1,
          ease: 'power2.inOut',
        },
        '<0.05'
      );

    // Stage 4: Exit Sequence (70% to 100%)
    tl.to('#text-3', {
      opacity: 0,
      duration: 0.08,
      ease: 'power2.inOut',
    })
      .to(
        '#shoe-left',
        {
          x: -500,
          opacity: 0,
          duration: 0.12,
          ease: 'expo.out',
        },
        '<0.02'
      )
      .to(
        '#shoe-center-alt',
        {
          scale: 1.4,
          opacity: 0,
          duration: 0.12,
          ease: 'expo.out',
        },
        '<0.05'
      )
      .to(
        '#shoe-right',
        {
          x: 500,
          opacity: 0,
          duration: 0.12,
          ease: 'expo.out',
        },
        '<0.05'
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
          {/* Image 1 - Center Hero */}
          <img
            id="shoe-center"
            src={shoeCenter}
            alt="Nike SB Dunk Orange Lobster"
            className="absolute w-[500px] h-auto object-contain z-30"
            style={{ opacity: 1, scale: 1.0, willChange: 'transform, opacity' }}
          />

          {/* Image 2 - Left On-Foot */}
          <img
            id="shoe-left"
            src={shoeLeft}
            alt="Nike SB Dunk Side View"
            className="absolute w-[400px] h-auto object-contain z-10"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          />

          {/* Image 3 - Right On-Foot */}
          <img
            id="shoe-right"
            src={shoeRight}
            alt="Nike SB Dunk Rear View"
            className="absolute w-[400px] h-auto object-contain z-15"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
          />

          {/* Image 4 - Center Detail Alt */}
          <img
            id="shoe-center-alt"
            src={shoeCenterAlt}
            alt="Nike SB Dunk Detail View"
            className="absolute w-[450px] h-auto object-contain z-20"
            style={{ opacity: 0, willChange: 'transform, opacity' }}
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
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center opacity-0 max-w-2xl px-8"
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
            className="absolute top-24 left-1/2 -translate-x-1/2 text-center opacity-0 max-w-xl px-8"
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
