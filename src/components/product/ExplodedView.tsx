import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import shoeCenterAlt from '@/assets/shoe-center-alt.png';

gsap.registerPlugin(ScrollTrigger);

const ExplodedView = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const shoeRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const shoe = shoeRef.current;
            if (!shoe) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=200%',
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            // Initial state
            gsap.set('.tech-point', { scale: 0, opacity: 0 });
            gsap.set('.tech-line', { scaleX: 0, transformOrigin: 'left center' });
            gsap.set('.tech-text', { opacity: 0, x: -20 });

            // Sequence 1: Zoom in and show Upper details
            tl.to(shoe, { scale: 1.5, y: 100, duration: 1, ease: 'power2.inOut' })
                .to('#point-upper', { scale: 1, opacity: 1, duration: 0.2 }, '<0.5')
                .to('#line-upper', { scaleX: 1, duration: 0.3 }, '<0.1')
                .to('#text-upper', { opacity: 1, x: 0, duration: 0.3 }, '<0.1');

            // Sequence 2: Move to Swoosh
            tl.to(shoe, { x: -100, y: -50, scale: 1.8, duration: 1, ease: 'power2.inOut' })
                .to(['#point-upper', '#line-upper', '#text-upper'], { opacity: 0, duration: 0.2 }, '<')
                .to('#point-swoosh', { scale: 1, opacity: 1, duration: 0.2 }, '<0.5')
                .to('#line-swoosh', { scaleX: 1, duration: 0.3 }, '<0.1')
                .to('#text-swoosh', { opacity: 1, x: 0, duration: 0.3 }, '<0.1');

            // Sequence 3: Move to Sole
            tl.to(shoe, { x: 50, y: -200, scale: 1.6, duration: 1, ease: 'power2.inOut' })
                .to(['#point-swoosh', '#line-swoosh', '#text-swoosh'], { opacity: 0, duration: 0.2 }, '<')
                .to('#point-sole', { scale: 1, opacity: 1, duration: 0.2 }, '<0.5')
                .to('#line-sole', { scaleX: 1, duration: 0.3 }, '<0.1')
                .to('#text-sole', { opacity: 1, x: 0, duration: 0.3 }, '<0.1');

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-zinc-900 text-white overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-950" />

            <h2 className="absolute top-32 left-10 text-4xl font-bebas tracking-wider z-20 text-white/20">
                Technical Breakdown
            </h2>

            <div className="relative z-10 w-full max-w-4xl h-[60vh] flex items-center justify-center">
                <img
                    ref={shoeRef}
                    src={shoeCenterAlt}
                    alt="Technical View"
                    className="w-full h-full object-contain"
                />

                {/* Upper Point */}
                <div className="absolute top-[30%] left-[40%] pointer-events-none">
                    <div id="point-upper" className="tech-point w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
                    <div id="line-upper" className="tech-line absolute top-2 left-4 w-32 h-[1px] bg-white/50" />
                    <div id="text-upper" className="tech-text absolute top-[-10px] left-40 w-64">
                        <h4 className="font-bold text-orange-500 uppercase">Premium Suede</h4>
                        <p className="text-xs text-gray-400">Double-layered specifically for durability.</p>
                    </div>
                </div>

                {/* Swoosh Point */}
                <div className="absolute top-[45%] left-[60%] pointer-events-none">
                    <div id="point-swoosh" className="tech-point w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
                    <div id="line-swoosh" className="tech-line absolute top-2 left-4 w-32 h-[1px] bg-white/50" />
                    <div id="text-swoosh" className="tech-text absolute top-[-10px] left-40 w-64">
                        <h4 className="font-bold text-orange-500 uppercase">Iconic Swoosh</h4>
                        <p className="text-xs text-gray-400">Contrast stitching with metallic finish.</p>
                    </div>
                </div>

                {/* Sole Point */}
                <div className="absolute bottom-[20%] left-[50%] pointer-events-none">
                    <div id="point-sole" className="tech-point w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
                    <div id="line-sole" className="tech-line absolute top-2 left-4 w-32 h-[1px] bg-white/50" />
                    <div id="text-sole" className="tech-text absolute top-[-10px] left-40 w-64">
                        <h4 className="font-bold text-orange-500 uppercase">Zoom Air Unit</h4>
                        <p className="text-xs text-gray-400">Responsive cushioning for impact protection.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplodedView;
