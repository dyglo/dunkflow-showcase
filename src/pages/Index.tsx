import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Menu, Search, ArrowRight, Flame, X } from 'lucide-react';
import ScrollSection from '@/components/ScrollSection';
import DetailSection from '@/components/DetailSection';
import Navbar from '@/components/Navbar';
import ProductChart from '@/components/ProductChart';
import Footer from '@/components/Footer';

const Index = () => {

  return (
    <>
      <div className="relative w-full min-h-screen bg-background text-foreground overflow-hidden selection:bg-accent selection:text-accent-foreground">

        <Navbar />

        {/* Video Background Layer */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80 z-10" />
          <div className="absolute inset-0 bg-background/20 z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/nike-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-20 flex flex-col justify-between min-h-screen px-6 pb-12 pt-32 md:pt-0 md:justify-center">

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

            {/* Left Content: Text */}
            <div className="md:col-span-7 flex flex-col gap-2 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm md:text-base"
              >
                <Flame className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
                <span>Heat Check • Vol. 1</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[10rem] lg:text-[12rem] font-bebas uppercase italic tracking-tighter leading-[0.85] md:leading-[0.8]"
              >
                Ignite <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-muted-foreground to-muted">The Streets</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-muted-foreground text-sm md:text-xl font-medium max-w-md mt-4 leading-relaxed"
              >
                The new Dunk Low 'Magma' brings the heat. Premium suede meets volcanic aesthetics in our most explosive drop yet.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col md:flex-row gap-4 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/product/1'}
                  className="bg-accent text-accent-foreground px-8 py-4 font-bebas text-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Shop The Drop <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-foreground/30 backdrop-blur-sm text-foreground px-8 py-4 font-bebas text-lg uppercase tracking-wider hover:border-foreground transition-colors"
                >
                  View Lookbook
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content: Abstract Decorative Elements */}
            <div className="hidden md:block md:col-span-5 h-full relative">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute right-0 bottom-0 text-right"
              >
                <div className="text-[10rem] font-bebas leading-none text-foreground/5 select-none pointer-events-none">
                  '85
                </div>
                <div className="text-muted-foreground font-mono text-sm mt-[-2rem] mr-4">
                  ORIGINAL<br />DESIGN
                </div>
              </motion.div>
            </div>

          </div>

          {/* Footer / Scroller */}
          <div className="w-full flex justify-between items-end border-t border-border pt-6 mt-auto md:mt-0">
            <div className="flex gap-8 text-xs md:text-sm font-bold tracking-widest uppercase text-muted-foreground">
              <span>01 // Intro</span>
              <span>02 // Details</span>
              <span>03 // Gallery</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              SCROLL TO EXPLORE
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-[1px] h-8 bg-muted-foreground ml-2"
              />
            </div>
          </div>

        </div>

        {/* Decorative Gradients */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-accent/20 to-transparent pointer-events-none z-10" />
      </div>

      {/* GSAP Scroll Section */}
      <ScrollSection />

      {/* Detail Section */}
      <DetailSection />

      {/* Product Chart Section */}
      <ProductChart />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Index;
