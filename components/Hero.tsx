'use client';

import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/useLocale';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function Hero() {
  const { hero } = useLocale();

  const titleWords = hero.title.split(' ');

  // Scroll to process section
  const handleScroll = () => {
    const el = document.getElementById('process-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/rastgele-serpme-sistemi.mp4"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-white z-10" />
      </div>

      {/* Hero content */}
      <div className="relative z-20 container mx-auto px-6 lg:px-24 py-24 text-center flex-1 flex flex-col justify-center">
        <div className="flex flex-col gap-8">
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {hero.title}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-200 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {hero.subtitle}
          </motion.p>

          {/* Highlight Cards */}
          {hero.highlights && hero.highlights.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {hero.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left hover:bg-white/20 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{highlight.title}</h3>
                  <p className="text-slate-300">{highlight.description}</p>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8"
          >
            <Button
              size="lg"
              className="text-lg bg-blue-600 hover:bg-blue-700 text-white px-8 py-6"
              onClick={() => {
                document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {hero.cta}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Arrow */}
      <motion.button
        type="button"
        onClick={handleScroll}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center group"
        aria-label="Aşağı kaydır"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Image
          src="/images/arrow-down.svg"
          alt="Aşağı kaydır"
          width={40}
          height={40}
          className="animate-bounce group-hover:scale-110 transition"
        />
        <span className="sr-only">Aşağı kaydır</span>
      </motion.button>
    </section>
  );
}
