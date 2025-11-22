import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - hide elements
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 60,
      });

      // Entrance animations
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      }, '-=0.6')
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.5');

      // Parallax effect on scroll
      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 1,
      });

      // Title parallax
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: 150,
        opacity: 0,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/nike-hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <h1 
          ref={titleRef}
          className="font-bebas text-7xl md:text-9xl lg:text-[12rem] leading-none mb-4 text-foreground tracking-tight"
        >
          NIKE SB <span className="text-accent">DUNK</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-inter text-lg md:text-xl lg:text-2xl max-w-2xl mb-12 text-muted-foreground font-light tracking-wide"
        >
          Elevate your style. Unleash your potential.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bebas text-xl px-12 py-6 h-auto transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,53,0.4)]"
          >
            SHOP NOW
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background font-bebas text-xl px-12 py-6 h-auto transition-all duration-300 hover:scale-105"
          >
            EXPLORE
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="font-inter text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
