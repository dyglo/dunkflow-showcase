import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import shoeCenterAlt from '@/assets/shoe-center-alt.png';

gsap.registerPlugin(ScrollTrigger);

const DetailSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animate the shoe image
    gsap.fromTo(
      '#detail-shoe',
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate the background headline
    gsap.fromTo(
      '#detail-headline',
      {
        opacity: 0,
        x: -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate the side description
    gsap.fromTo(
      '#detail-description',
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-background flex items-center justify-center py-20 overflow-hidden"
    >
      {/* Background Large Headline */}
      <h2
        id="detail-headline"
        className="absolute left-10 top-1/2 -translate-y-1/2 text-[12rem] md:text-[16rem] lg:text-[20rem] font-bebas uppercase text-foreground/5 tracking-tighter leading-none select-none pointer-events-none"
        style={{ willChange: 'transform, opacity' }}
      >
        ORANGE
        <br />
        LOBSTER
      </h2>

      {/* Main Content Container */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl px-8 gap-16">
        {/* Left Side - Shoe Image */}
        <div className="flex-1 flex justify-center">
          <img
            id="detail-shoe"
            src={shoeCenterAlt}
            alt="Nike SB Dunk Orange Lobster Detail"
            className="w-full max-w-[600px] h-auto object-contain"
            style={{ willChange: 'transform, opacity' }}
          />
        </div>

        {/* Right Side - Description */}
        <div
          id="detail-description"
          className="flex-1 max-w-lg"
          style={{ willChange: 'transform, opacity' }}
        >
          <h3 className="text-5xl md:text-6xl font-bebas uppercase text-accent tracking-tight mb-6">
            Legendary Details
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            Every stitch tells a story of skateboarding heritage. The Orange Lobster edition
            combines premium suede construction with bold colorways that pay homage to the
            coastal vibes of its inspiration.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Crafted with meticulous attention to detail, this limited edition release features
            custom branding elements and a unique color palette that sets it apart from the rest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
