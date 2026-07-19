"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";

interface Initiative {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface InitiativesCarouselProps {
  initiatives: Initiative[];
}

const ITEM_WIDTH = 200; // pixels to drag to shift one item
const RADIUS_X = 350; // horizontal radius of the ellipse

export default function InitiativesCarousel({ initiatives }: InitiativesCarouselProps) {
  const dragX = useMotionValue(0);
  const numItems = initiatives.length;
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active dot navigation based on drag position
  useMotionValueEvent(dragX, "change", (latest) => {
    // When dragX is positive, we shift cards to the right (index goes down)
    // When dragX is negative, we shift cards left (index goes up)
    const exactIndex = -latest / ITEM_WIDTH;
    const roundedIndex = Math.round(exactIndex);
    // Wrap around correctly
    const wrappedIndex = ((roundedIndex % numItems) + numItems) % numItems;
    setActiveIndex(wrappedIndex);
  });

  return (
    <div className="relative w-full max-w-6xl mx-auto h-[450px] md:h-[550px] flex flex-col items-center justify-center overflow-hidden">
      
      {/* 
        This is the actual draggable container. 
        It moves physically, providing perfect momentum and physics snapping. 
      */}
      <motion.div
        drag="x"
        style={{ x: dragX }}
        dragConstraints={{ left: -100000, right: 100000 }}
        dragTransition={{
          power: 0.2, // standard momentum
          timeConstant: 250,
          modifyTarget: (target) => Math.round(target / ITEM_WIDTH) * ITEM_WIDTH,
        }}
        className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {initiatives.map((item, idx) => {
          return (
            <CarouselCard 
              key={idx} 
              idx={idx} 
              item={item} 
              dragX={dragX} 
              numItems={numItems} 
            />
          );
        })}
      </motion.div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {initiatives.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
                // To do this properly without breaking physics, we use animate
                import("framer-motion").then(({ animate }) => {
                    const currentExactIndex = -dragX.get() / ITEM_WIDTH;
                    let diff = idx - (currentExactIndex % numItems);
                    // Shortest path logic
                    if (diff > numItems / 2) diff -= numItems;
                    if (diff < -numItems / 2) diff += numItems;
                    const targetX = -(currentExactIndex + diff) * ITEM_WIDTH;
                    
                    animate(dragX, targetX, {
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                    });
                });
            }}
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

function CarouselCard({ item, idx, dragX, numItems }: any) {
  // We use useTransform to derive all visual properties dynamically 
  // from the continuous drag position.

  // 1. Calculate the angle for this specific card
  const angle = useTransform(dragX, (x) => {
    // When dragX is positive (dragged right), the carousel spins right.
    const globalOffset = (x / ITEM_WIDTH);
    const localOffset = globalOffset + idx;
    return (localOffset / numItems) * 2 * Math.PI;
  });

  // 2. Map angle to depth (cos) and horizontal position (sin)
  const depth = useTransform(angle, (a) => Math.cos(a)); // 1 is front, -1 is back
  const horizontal = useTransform(angle, (a) => Math.sin(a)); // 1 is right, -1 is left

  // 3. Derive scale, opacity, and zIndex from depth
  const scale = useTransform(depth, (d) => 0.7 + 0.3 * d); // 0.4 at back, 1.0 at front
  const opacity = useTransform(depth, (d) => Math.max(0, 0.3 + 0.7 * d)); // -0.4 to 1.0
  const zIndex = useTransform(depth, (d) => Math.round(d * 100));

  // 4. Calculate X translation. 
  // IMPORTANT: We subtract dragX to cancel out the physical movement of the parent container,
  // keeping the entire carousel perfectly centered on the screen while it spins!
  const cardX = useTransform([dragX, horizontal], ([containerX, h]: any) => {
    // Check if mobile to reduce radius
    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : RADIUS_X;
    const circleX = h * radius;
    return circleX - containerX;
  });

  // Derived state for purely cosmetic coloring of the "front-most" card
  // This uses state because tailwind classes can't be driven by framer motion values natively
  const [isActive, setIsActive] = useState(false);
  
  useMotionValueEvent(depth, "change", (latest) => {
    // If it's very close to the front (depth ~ 1.0), it's active
    setIsActive(latest > 0.95);
  });

  return (
    <motion.div
      style={{
        x: cardX,
        scale,
        opacity,
        zIndex,
        // No rotateY here! Cards remain perfectly "billboarded" and flat.
      }}
      className={`absolute w-full max-w-[320px] md:max-w-[400px] bg-zinc-900/60 backdrop-blur-xl border rounded-2xl p-10 shadow-xl transition-colors duration-300 ${
        isActive 
          ? "shadow-[0_0_30px_rgba(139,92,246,0.3)] border-purple-500/60 bg-zinc-900/90" 
          : "shadow-none border-white/10"
      }`}
    >
      <div className="flex flex-col items-center text-center h-full pointer-events-none">
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
}
