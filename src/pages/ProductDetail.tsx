import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroParallax from '@/components/product/HeroParallax';
import ExplodedView from '@/components/product/ExplodedView';
import MaterialShowcase from '@/components/product/MaterialShowcase';
import Product360 from '@/components/product/Product360';
import { motion } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
            <Navbar />
            <HeroParallax />
            <ExplodedView />
            <Product360 />
            <MaterialShowcase />

            {/* Simple Footer for now */}
            <div className="h-screen flex items-center justify-center bg-black text-white">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-6xl font-bebas uppercase mb-8">Ready to Cop?</h2>
                    <button className="bg-white text-black px-12 py-4 font-bebas text-2xl uppercase hover:scale-105 transition-transform">
                        Add to Cart
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
