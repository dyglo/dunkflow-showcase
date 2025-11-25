import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import shoeLeft from '@/assets/shoe-left.png';
import shoeCenter from '@/assets/shoe-center.png';
import shoeRight from '@/assets/shoe-right.png';
import rightSide from '@/assets/right-side.png';

const angles = [
    { id: 0, src: shoeLeft, label: 'Left Profile' },
    { id: 1, src: shoeCenter, label: 'Front View' },
    { id: 2, src: rightSide, label: 'Right Profile' },
    { id: 3, src: shoeRight, label: 'Rear View' },
];

const Product360 = () => {
    const [currentAngle, setCurrentAngle] = useState(1); // Start at Front View
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const startX = useRef(0);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;

        const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const diff = startX.current - currentX;
        const threshold = 50; // Pixels to drag to switch angle

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Dragged Left -> Next Angle
                setCurrentAngle((prev) => (prev + 1) % angles.length);
            } else {
                // Dragged Right -> Prev Angle
                setCurrentAngle((prev) => (prev - 1 + angles.length) % angles.length);
            }
            startX.current = currentX; // Reset start to prevent rapid spinning
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleMouseMove);
            window.addEventListener('touchend', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="w-full h-screen bg-zinc-100 flex flex-col items-center justify-center relative overflow-hidden select-none cursor-grab active:cursor-grabbing">

            {/* Background Text */}
            <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bebas text-white leading-none z-0">
                360°
            </h2>

            {/* Main Viewer */}
            <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                className="relative z-10 w-full max-w-4xl aspect-square md:aspect-video flex items-center justify-center"
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentAngle}
                        src={angles[currentAngle].src}
                        alt={angles[currentAngle].label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full object-contain drop-shadow-2xl pointer-events-none"
                        draggable="false"
                    />
                </AnimatePresence>

                {/* Interaction Hint */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400">
                    <div className="w-12 h-12 rounded-full border-2 border-zinc-300 flex items-center justify-center animate-pulse">
                        <div className="w-1 h-1 bg-zinc-400 rounded-full" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Drag to Rotate</span>
                </div>

                {/* Angle Indicators */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-2">
                    {angles.map((angle, index) => (
                        <div
                            key={angle.id}
                            className={`w-2 h-2 rounded-full transition-colors ${index === currentAngle ? 'bg-orange-500' : 'bg-zinc-300'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product360;
