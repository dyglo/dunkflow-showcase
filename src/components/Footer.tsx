import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import nikeBg from '@/assets/nike-footer-bg.png';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const footer = footerRef.current;
        const bg = bgRef.current;
        const content = contentRef.current;

        if (!footer || !bg || !content) return;

        // Parallax background effect
        gsap.fromTo(
            bg,
            { y: -50 },
            {
                y: 50,
                scrollTrigger: {
                    trigger: footer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        );

        // Content fade-in animation
        gsap.fromTo(
            content.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 80%',
                },
            }
        );
    }, []);

    return (
        <footer ref={footerRef} className="relative w-full text-white overflow-hidden bg-black py-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    <img
                        src={nikeBg}
                        alt="Nike Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
            </div>

            {/* Content */}
            <div ref={contentRef} className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand Column */}
                <div className="md:col-span-1 space-y-6">
                    <h2 className="text-4xl font-bebas tracking-wider uppercase">DunkFlow</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Elevating sneaker culture through premium design and exclusive drops. Stay ahead of the game.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                            <Youtube className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Links Column 1 */}
                <div className="space-y-6">
                    <h3 className="font-bold uppercase tracking-widest text-sm">Shop</h3>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Upcoming Drops</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div className="space-y-6">
                    <h3 className="font-bold uppercase tracking-widest text-sm">Support</h3>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div className="space-y-6">
                    <h3 className="font-bold uppercase tracking-widest text-sm">Stay in the Loop</h3>
                    <p className="text-gray-400 text-sm">
                        Subscribe for exclusive access to drops and special offers.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-gray-600"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-accent transition-colors">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-600">
                            By subscribing you agree to our Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>&copy; 2024 DunkFlow. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
