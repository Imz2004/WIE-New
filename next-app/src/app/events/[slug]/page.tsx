'use client';

import { events } from '@/data/events';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

export default function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
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
    <main className="min-h-screen bg-[#030207] text-purple-50 overflow-hidden font-sans relative">
      <div className="absolute top-0 left-0 w-full h-[150vh] overflow-hidden pointer-events-none z-0 [mask-image:linear-gradient(to_bottom,white_60%,transparent_100%)]">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[200vw] h-[200vw] md:w-[150vw] md:h-[150vw] rounded-[100%] bg-gradient-to-b from-[#1a0830] to-[#030207] border-t border-purple-900/50 shadow-[0_0_100px_rgba(139,92,246,0.15)_inset]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px', opacity: 0.1 }} />
      </div>

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
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: pos.delay, type: "spring" }}
              className="hidden lg:block absolute w-64 h-40 xl:w-80 xl:h-48 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-purple-600/30 z-10"
              style={{ ...pos }}
            >
              <Image src={src} alt="" fill className="object-cover object-[center_30%] transition-transform duration-700 hover:scale-110" unoptimized />
              <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay pointer-events-none" />
            </motion.div>
          )
        })}

        <div className="relative z-0 text-center max-w-4xl mx-auto backdrop-blur-sm p-8 rounded-2xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-400 drop-shadow-2xl"
          >
            {event.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-light text-purple-300 mb-2"
          >
            {event.date}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl font-light text-purple-400 mb-12"
          >
            {event.location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link href="#details" className="inline-block text-purple-400 hover:text-foreground transition-colors duration-300">
              <p className="mb-2 font-medium tracking-widest uppercase text-sm">Explore Details</p>
              <svg className="w-6 h-6 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </Link>
          </motion.div>
        </div>

      </section>

      <section id="details" className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16">
        {event.subtitle && (
          <h3 className="text-2xl md:text-3xl font-medium mb-8 text-center text-purple-400">{event.subtitle}</h3>
        )}
        <div className="space-y-6 text-lg md:text-xl text-purple-300 leading-relaxed font-light">
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
                className="relative aspect-video rounded-xl overflow-hidden group shadow-lg border border-purple-700/50"
              >
                <Image src={src} alt={`Highlight ${idx}`} fill className="object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-110" unoptimized />
                <div className="absolute inset-0 bg-purple-900/30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <div className="text-center pb-24 pt-12 relative z-10">
        <Link href="/#our-work" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-900/40 hover:bg-purple-900/60 text-foreground font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 border border-purple-800/50">
          &larr; Back to Events
        </Link>
      </div>

    </main>
  );
}
