import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import shoeLeft from '@/assets/shoe-left.png';
import shoeRight from '@/assets/shoe-right.png';
import rightSide from '@/assets/right-side.png';

gsap.registerPlugin(ScrollTrigger);

const materials = [
    {
        id: 1,
        title: 'Nubuck Leather',
        description: 'Soft, velvety texture that ages beautifully with wear.',
        image: shoeLeft,
    },
    {
        id: 2,
        title: 'Mesh Tongue',
        description: 'Breathable mesh tongue for maximum comfort and airflow.',
        image: rightSide,
    },
    {
        id: 3,
        title: 'Gum Rubber',
        description: 'Classic gum sole for superior grip and board feel.',
        image: shoeRight,
    },
];

const MaterialShowcase = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const slider = sliderRef.current;
            if (!slider) return;

            const totalWidth = slider.scrollWidth;
            const windowWidth = window.innerWidth;
            const scrollAmount = totalWidth - windowWidth;

            gsap.to(slider, {
                x: -scrollAmount,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: `+=${scrollAmount}`,
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-background overflow-hidden">
            <div className="absolute top-32 left-10 z-10">
                <h2 className="text-4xl md:text-6xl font-bebas uppercase">Material Details</h2>
                <p className="text-muted-foreground">Scroll to explore</p>
            </div>

            <div
                ref={sliderRef}
                className="flex h-full items-center pl-10 md:pl-20 gap-20 w-max"
            >
                {materials.map((material, index) => (
                    <div
                        key={material.id}
                        className="relative w-[80vw] md:w-[60vw] h-[70vh] flex flex-col md:flex-row items-center bg-secondary/30 rounded-3xl overflow-hidden p-8 md:p-12"
                    >
                        <div className="flex-1 z-10">
                            <span className="text-9xl font-bebas text-background/10 absolute top-0 left-0 -translate-y-1/2 select-none">
                                0{index + 1}
                            </span>
                            <h3 className="text-4xl md:text-5xl font-bebas uppercase mb-4 relative z-10">
                                {material.title}
                            </h3>
                            <p className="text-lg text-muted-foreground max-w-md relative z-10">
                                {material.description}
                            </p>
                        </div>
                        <div className="flex-1 h-full flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl transform scale-75" />
                            <img
                                src={material.image}
                                alt={material.title}
                                className="w-full h-auto object-contain drop-shadow-2xl relative z-10 hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </div>
                ))}
                {/* Extra padding at the end */}
                <div className="w-[10vw]" />
            </div>
        </div>
    );
};

export default MaterialShowcase;
