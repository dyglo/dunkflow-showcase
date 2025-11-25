import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductOverlayProps {
    product: any;
    onClose: () => void;
    onAddToCart: () => void;
}

const ProductOverlay: React.FC<ProductOverlayProps> = ({ product, onClose }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Overlay Background
            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: 'power2.out' }
            );

            // Animate Content Container
            gsap.fromTo(contentRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.1 }
            );

            // Animate Image (Slide in from left)
            gsap.fromTo(imageRef.current,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.3 }
            );

            // Animate Details (Slide in from right)
            gsap.fromTo(detailsRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.4 }
            );

            // Stagger children of details
            gsap.fromTo(".detail-item",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.5 }
            );

        }, overlayRef);

        return () => ctx.revert();
    }, [product]);

    const handleClose = () => {
        const ctx = gsap.context(() => {
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: onClose
            });
        }, overlayRef);
    };

    const handleAddToCart = () => {
        addToCart(product);
        handleClose();
    };

    if (!product) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
            <div
                ref={contentRef}
                className="relative w-full max-w-5xl bg-background rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Left Side: Image */}
                <div
                    className="w-full md:w-1/2 relative min-h-[40vh] md:min-h-full flex items-center justify-center p-8"
                    style={{ backgroundColor: product.color }}
                >
                    <div className="absolute top-8 left-8 text-white/20 font-bebas text-9xl leading-none select-none">
                        NIKE
                    </div>
                    <img
                        ref={imageRef}
                        src={product.image}
                        alt={product.name}
                        className="w-full max-w-md object-contain drop-shadow-2xl z-10"
                    />
                </div>

                {/* Right Side: Details */}
                <div
                    ref={detailsRef}
                    className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto"
                >
                    <div className="detail-item mb-2">
                        <span className="text-accent font-bold tracking-widest uppercase text-sm">{product.brand}</span>
                    </div>

                    <h2 className="detail-item text-5xl md:text-6xl font-bebas uppercase leading-none mb-6">
                        {product.name}
                    </h2>

                    <p className="detail-item text-muted-foreground text-lg leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="detail-item flex items-center justify-between mt-auto pt-8 border-t border-border">
                        <span className="text-4xl font-bebas">{product.price}</span>
                        <button
                            onClick={handleAddToCart}
                            className="bg-foreground text-background px-8 py-4 rounded-full font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-opacity"
                        >
                            Add to Cart <ShoppingBag className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOverlay;
