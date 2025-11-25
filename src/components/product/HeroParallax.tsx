import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import shoeCenter from '@/assets/shoe-center.png';

const HeroParallax = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const shoeRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const shoe = shoeRef.current;
        const title = titleRef.current;
        const subtitle = subtitleRef.current;

        if (!container || !shoe || !title || !subtitle) return;

        // Initial Load Animation
        const tl = gsap.timeline();

        tl.from(title, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            delay: 0.2,
        })
            .from(
                shoe,
                {
                    y: -50,
                    opacity: 0,
                    scale: 0.8,
                    duration: 1.2,
                    ease: 'power3.out',
                },
                '-=0.8'
            )
            .from(
                subtitle,
                {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                },
                '-=0.6'
            );

        // Mouse Move Parallax
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const yPos = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1

            gsap.to(shoe, {
                x: xPos * 30,
                y: yPos * 30,
                rotation: xPos * 5,
                duration: 1,
                ease: 'power2.out',
            });

            gsap.to(title, {
                x: xPos * -20,
                y: yPos * -20,
                duration: 1,
                ease: 'power2.out',
            });

            gsap.to(subtitle, {
                x: xPos * -10,
                y: yPos * -10,
                duration: 1,
                ease: 'power2.out',
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#e8e8e8] dark:bg-[#1a1a1a]"
        >
            {/* Background Text */}
            <h1
                ref={titleRef}
                className="absolute text-[15vw] font-bebas leading-none text-transparent bg-clip-text bg-gradient-to-b from-black/10 to-transparent dark:from-white/10 select-none pointer-events-none z-0"
            >
                SB DUNK
            </h1>

            {/* Hero Shoe */}
            <div className="relative z-10">
                <img
                    ref={shoeRef}
                    src={shoeCenter}
                    alt="Nike SB Dunk Hero"
                    className="w-[60vw] max-w-[800px] h-auto object-contain drop-shadow-2xl"
                />
            </div>

            {/* Floating Details */}
            <div
                ref={subtitleRef}
                className="absolute bottom-20 left-10 md:left-20 z-20"
            >
                <div className="flex items-center gap-4 mb-2">
                    <span className="bg-orange-500 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider">New Release</span>
                    <span className="text-sm font-mono text-muted-foreground">Vol. 04</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bebas uppercase text-foreground">
                    Orange Lobster
                </h2>
                <p className="max-w-md text-muted-foreground mt-2">
                    Concepts x Nike SB Dunk Low. A legendary collaboration returns with more flavor than ever.
                </p>
            </div>
        </div>
    );
};

export default HeroParallax;
