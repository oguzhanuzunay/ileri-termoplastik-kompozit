'use client';

import { useLocale } from '@/hooks/useLocale';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ProcessCard } from './ProcessCard';

export function ProcessSection() {
  const { process } = useLocale();
  const [active, setActive] = useState<number | null>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Safety check for process array
  if (!process || !Array.isArray(process) || process.length === 0) {
    return null;
  }

  // Auto-play: advance active card every 3s
  useEffect(() => {
    if (active === null) return undefined;
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActive((prev) => (prev === null ? 0 : (prev + 1) % process.length));
    }, 3000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, process.length]);

  // On hover/focus, pause auto-play; on leave/blur, resume
  const handleHover = (idx: number) => {
    timerRef.current && clearTimeout(timerRef.current);
    setActive(idx);
  };
  const handleBlur = () => {
    timerRef.current && clearTimeout(timerRef.current);
    setActive((prev) => (prev === null ? 0 : prev));
  };

  return (
    <section
      id="process-section"
      ref={ref}
      className="w-full py-24 bg-background"
    >
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Üretim Süreci
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Termoplastik kompozit malzemelerin üretim sürecinde her adım titizlikle kontrol edilir
          </motion.p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {process.map((item, index) => (
            <div
              key={item.title}
              className="relative"
            >
              <ProcessCard
                step={index + 1}
                title={item.title}
                desc={item.desc}
                delay={index}
                active={active === index}
                onHover={() => handleHover(index)}
                onBlur={handleBlur}
              />

              {/* Flow arrows between cards */}
              {index < process.length - 1 && (
                <motion.div
                  className="hidden lg:flex absolute top-1/2 -right-4 z-10 transform -translate-y-1/2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <ArrowRight
                    className={`w-8 h-8 ${
                      active === index ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Process indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {process.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                active === index ? 'bg-primary w-8' : 'bg-primary/20'
              }`}
              onClick={() => handleHover(index)}
              aria-label={`Adım ${index + 1}'e git`}
              title={`Adım ${index + 1}: ${process[index].title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
