'use client';

import { events } from '@/data/events';
import { notFound } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

export default function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { scrollY } = useScroll();
  const planetGlowOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  const planetGlowScale = useTransform(scrollY, [0, 200], [0.8, 1.2]);
  
  const event = events.find(e => e.slug === resolvedParams.slug);

  if (!event) {
    notFound();
  }

  let floatingImages = [event.image, ...event.gallery];
  floatingImages = Array.from(new Set(floatingImages)).filter(Boolean);

  if (floatingImages.length < 4) {
    while (floatingImages.length < 4 && floatingImages.length > 0) {
      floatingImages.push(floatingImages[0]);
    }
  }

  floatingImages = floatingImages.slice(0, 4);

  return (
    <main className="min-h-screen text-foreground overflow-hidden font-sans relative">
      <motion.div 
        style={{ opacity: planetGlowOpacity, scale: planetGlowScale }}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)]"
      >
        {/* Dynamic Eclipse Glow */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[160vw] h-[160vw] md:w-[110vw] md:h-[110vw] rounded-[100%] bg-primary/30 blur-[120px]" />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-primary/20 blur-[100px] rounded-full" />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[200vw] h-[200vw] md:w-[150vw] md:h-[150vw] rounded-[100%] bg-gradient-to-b from-background/70 to-transparent border-t border-primary/40 shadow-[0_0_120px_rgba(139,92,246,0.3)_inset]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.1 }} />
      </motion.div>

      <div className="h-24"></div>

      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 z-10">

        {floatingImages.map((src, idx) => {
          const positions = [
            { top: '15%', left: '8%', rotate: -12, delay: 0.1 },
            { top: '25%', right: '8%', rotate: 14, delay: 0.3 },
            { bottom: '5%', left: '18%', rotate: 8, delay: 0.5 },
            { bottom: '10%', right: '15%', rotate: -10, delay: 0.7 },
          ];
          const pos = positions[idx % positions.length];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: pos.delay, type: "spring", bounce: 0.4 }}
              className="hidden lg:block absolute w-64 h-40 xl:w-80 xl:h-48 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-border/50 z-10"
              style={{ ...pos, transformPerspective: 1000 }}
            >
              <Image src={src} alt="" fill className="object-cover object-[center_30%] transition-transform duration-700 hover:scale-110" unoptimized />
              <div className="absolute inset-0 bg-background/20 mix-blend-overlay pointer-events-none" />
            </motion.div>
          )
        })}

        <div className="relative z-0 text-center max-w-4xl mx-auto backdrop-blur-sm p-8 rounded-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 40, rotateX: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.9, type: "spring", bounce: 0.4 }}
            style={{ transformPerspective: 1200 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70 drop-shadow-2xl"
          >
            {event.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-light text-muted-foreground mb-2"
          >
            {event.date}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl font-light text-primary mb-12"
          >
            {event.location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link href="#details" className="inline-block text-primary hover:text-foreground transition-colors duration-300">
              <p className="mb-2 font-medium tracking-widest uppercase text-sm">Explore Details</p>
              <svg className="w-6 h-6 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </Link>
          </motion.div>
        </div>

      </section>

      <section id="details" className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16">
        {event.subtitle && (
          <h3 className="text-2xl md:text-3xl font-medium mb-8 text-center text-foreground">{event.subtitle}</h3>
        )}
        <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
          {event.description.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </section>

      {event.gallery.length > 0 && (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Event Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {event.gallery.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                className="relative aspect-video rounded-xl overflow-hidden group shadow-lg border border-border"
              >
                <Image src={src} alt={`Highlight ${idx}`} fill className="object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-110" unoptimized />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <div className="text-center pb-24 pt-12 relative z-10">
        <Link href="/#our-work" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-card backdrop-blur-md hover:bg-muted text-foreground font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 border border-border">
          &larr; Back to Events
        </Link>
      </div>

    </main>
  );
}
