import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import ProductOverlay from './ProductOverlay';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import images
import img1 from '@/assets/products-images/Concepts_x_Nike_SB_Dunk_Low__Orange_Lobster_-removebg-preview.png';
import img2 from '@/assets/products-images/Who_said_fruit_doesn_t_flex__These_SBs_aren_t_made_for_eating__but_they_sure_go_hard__More_juicy_concepts_on_the_way_______Made_using__dreamina_ai_____ORIGINAL_CONCEPT_DESIGN___2025_SNEAKR0H1IT-remove.png';
import img3 from '@/assets/products-images/_Nike_X_Concepts_Sb_Dunk_Low______Lobster_Special_Box_____Sneakers_-_Orange_-removebg-preview.png';
import img4 from '@/assets/products-images/download__15_-removebg-preview.png';

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        id: 1,
        brand: 'Nike SB',
        name: 'Orange Lobster',
        description: 'Inspired by the rare crustacean, featuring a metallic swoosh and picnic table lining.',
        price: '$450',
        color: '#e85d04', // Orange
        image: img1,
    },
    {
        id: 2,
        brand: 'Concept Lab',
        name: 'Fruit Flex',
        description: 'Juicy concepts straight from the future. Not for eating, just for flexing.',
        price: '$320',
        color: '#9d0208', // Deep Red
        image: img2,
    },
    {
        id: 3,
        brand: 'Nike x Concepts',
        name: 'Special Box',
        description: 'The ultimate collector\'s edition with exclusive packaging and accessories.',
        price: '$890',
        color: '#f48c06', // Lighter Orange
        image: img3,
    },
    {
        id: 4,
        brand: 'Nike SB',
        name: 'Classic Dunk',
        description: 'The silhouette that started it all, reimagined for modern skateboarding.',
        price: '$180',
        color: '#370617', // Dark Maroon
        image: img4,
    },
];

const ProductChart = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.product-card', {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleProductClick = (product: any) => {
        setSelectedProduct(product);
        // Disable body scroll when overlay is open
        document.body.style.overflow = 'hidden';
    };

    const handleCloseOverlay = () => {
        setSelectedProduct(null);
        // Re-enable body scroll
        document.body.style.overflow = 'auto';
    };

    return (
        <section ref={containerRef} className="py-32 px-6 bg-background min-h-screen flex flex-col items-center relative">
            <div className="text-center mb-20">
                <h2 className="text-6xl md:text-8xl font-bebas uppercase mb-4">Trending Heat</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    The most sought-after releases of the season. Cop them before they're gone.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto w-full">
                {products.map((product, index) => (
                    <div key={product.id} className="product-card">
                        <ProductCard
                            {...product}
                            delay={index * 0.1}
                            onClick={() => handleProductClick(product)}
                        />
                    </div>
                ))}
            </div>

            {/* Overlay */}
            {selectedProduct && (
                <ProductOverlay
                    product={selectedProduct}
                    onClose={handleCloseOverlay}
                    onAddToCart={() => { }} // Handled inside overlay now
                />
            )}
        </section>
    );
};

export default ProductChart;
