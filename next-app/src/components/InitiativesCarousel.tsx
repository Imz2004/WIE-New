"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Initiative {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface InitiativesCarouselProps {
  initiatives: Initiative[];
}

export default function InitiativesCarousel({ initiatives }: InitiativesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      setActiveIndex((prev) => (prev === 0 ? initiatives.length - 1 : prev - 1));
    } else if (info.offset.x < -swipeThreshold) {
      setActiveIndex((prev) => (prev + 1) % initiatives.length);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[450px] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full h-[300px] md:h-[350px] flex items-center justify-center">
        <AnimatePresence>
          {initiatives.map((item, idx) => {
            // Calculate relative position based on distance from active index
            let offset = idx - activeIndex;
            // Handle wrapping for infinite loop effect
            if (offset < -1) offset += initiatives.length;
            if (offset > 1) offset -= initiatives.length;

            // Ensure we only show -1, 0, 1 to keep it clean (others are hidden)
            const isVisible = Math.abs(offset) <= 1 || initiatives.length <= 3;
            if (!isVisible) return null;

            // State values based on position
            const isActive = offset === 0;
            const zIndex = isActive ? 10 : 5 - Math.abs(offset);
            const scale = isActive ? 1 : 0.85;
            const x = offset * 110; // offset in percentage/pixels
            const opacity = isActive ? 1 : 0.9;
            const rotateY = offset * -15; // slight rotation for coverflow effect

            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  x: `${x}%`,
                  scale,
                  zIndex,
                  opacity,
                  rotateY,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className={`absolute w-full max-w-[280px] md:max-w-[320px] bg-zinc-900/60 backdrop-blur-xl border rounded-2xl p-8 shadow-xl transition-colors duration-300 ${
                  isActive ? "shadow-[0_0_30px_rgba(139,92,246,0.3)] border-purple-500/60 bg-zinc-900/90" : "shadow-none border-white/10"
                }`}
                style={{
                  transformOrigin: "center center",
                  perspective: "1000px",
                }}
                onClick={() => setActiveIndex(idx)}
              >
                <div className="flex flex-col items-center text-center h-full cursor-pointer">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${isActive ? 'bg-primary/10' : 'bg-muted'}`}>
                    <item.icon className={`w-8 h-8 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-foreground">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {initiatives.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === idx
                ? "bg-primary scale-125 ring-4 ring-primary/30"
                : "bg-border hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
