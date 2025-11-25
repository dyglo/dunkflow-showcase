import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { itemCount } = useCart();

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-foreground">
                <Link to="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-2xl font-bebas tracking-tighter flex items-center gap-2 cursor-pointer"
                    >
                        <svg className="h-8 w-auto fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 5.8c-2.2 1.4-5.7 3.3-9.7 4.7-4.4 1.6-6.8 1.8-8.7 1.8-4.1 0-7.5-2.2-5.6-9C.4 1.9 1.7.5 3.6.5c1.5 0 3.4.6 6.1 2.1 1.9 1 5.1 3.1 5.1 3.1s-2.6-1.7-5.3-2.9c-2.6-1.2-5-1.4-6.5-1.4-1.3 0-1.9.5-2.3 1.2C-.7 6.6 3.9 9 7.1 9c1.8 0 4-.3 8.2-1.9C19.1 5.7 22.2 3.9 24 2.6v3.2z" />
                        </svg>
                        SB DUNK
                    </motion.div>
                </Link>

                <div className="hidden md:flex gap-8 font-bold tracking-wide text-sm uppercase">
                    {['New Arrivals', 'Men', 'Women', 'Skate', 'Launch'].map((item, i) => (
                        <motion.a
                            key={item}
                            href="#"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="hover:text-accent transition-colors"
                        >
                            {item}
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-6"
                >
                    <Search className="w-6 h-6 cursor-pointer hover:text-accent transition-colors" />
                    <Link to="/cart" className="relative cursor-pointer hover:text-accent transition-colors group">
                        <ShoppingBag className="w-6 h-6" />
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </motion.div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden"
                >
                    {['New Arrivals', 'Men', 'Women', 'Skate', 'Launch'].map((item) => (
                        <a key={item} href="#" className="text-3xl font-bebas uppercase hover:text-accent">{item}</a>
                    ))}
                </motion.div>
            )}
        </>
    );
};

export default Navbar;
