import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    id: number;
    image: string;
    brand: string;
    name: string;
    description: string;
    price: string;
    color: string;
    delay?: number;
    onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, brand, name, description, price, color, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const shoeRef = useRef<HTMLImageElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // State for 3D tilt
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateYValue = ((x - centerX) / centerX) * 10;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseEnter = () => {
        const ctx = gsap.context(() => {
            gsap.to(shoeRef.current, {
                scale: 1.2,
                z: 50,
                duration: 0.5,
                ease: 'power3.out',
            });
            gsap.to(contentRef.current, {
                z: 30,
                duration: 0.5,
                ease: 'power3.out',
            });
        }, cardRef);
        return () => ctx.revert();
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);

        const ctx = gsap.context(() => {
            gsap.to(shoeRef.current, {
                scale: 1,
                z: 0,
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
            });
            gsap.to(contentRef.current, {
                z: 0,
                duration: 0.5,
                ease: 'power3.out',
            });
        }, cardRef);
        return () => ctx.revert();
    };

    return (
        <div
            className="perspective-1000 w-full max-w-sm mx-auto"
            style={{ perspective: '1000px' }}
        >
            <div
                ref={cardRef}
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative w-full bg-card rounded-3xl overflow-hidden shadow-xl cursor-pointer transform-style-3d transition-transform duration-100 ease-out"
                style={{
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Colored Header Background */}
                <div
                    className="h-56 w-full relative overflow-visible transition-colors duration-500"
                    style={{ backgroundColor: color }}
                >
                    <div className="absolute top-6 left-6 text-white/90 font-mono text-xs tracking-[0.2em] uppercase font-bold transform-style-3d translate-z-20">
                        {brand}
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

                    {/* Floating Shoe Image */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[115%] h-auto z-10 transform-style-3d">
                        <img
                            ref={shoeRef}
                            src={image}
                            alt={name}
                            className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-transform duration-300"
                        />
                    </div>
                </div>

                {/* Body Content */}
                <div
                    ref={contentRef}
                    className="pt-20 pb-8 px-8 text-center flex flex-col items-center gap-4 bg-card transform-style-3d"
                >
                    <div className="space-y-1 transform-style-3d translate-z-10">
                        <h3 className="text-muted-foreground text-[10px] font-bold tracking-[0.2em] uppercase">{brand}</h3>
                        <h2 className="text-3xl font-bebas uppercase tracking-tight text-foreground">{name}</h2>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 min-h-[2.5rem] transform-style-3d translate-z-5">
                        {description}
                    </p>

                    <div className="flex items-center gap-4 mt-4 w-full justify-center transform-style-3d translate-z-10">
                        <span className="font-bebas text-2xl bg-secondary px-4 py-1 rounded-md text-foreground">{price}</span>
                        <button
                            className="border-2 px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors hover:bg-current hover:text-white"
                            style={{ borderColor: color, color: color }}
                        >
                            View Details <ShoppingBag className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
