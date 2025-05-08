'use client';

import { useLocale } from '@/hooks/useLocale';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function extractStatParts(str: string) {
  // %35 gibi ifadeleri de yakalar
  const match = str.match(/([^\d-]*)(-?\d+[\d.,]*)(.*)/);
  if (!match) return { prefix: '', number: 0, unit: str };
  return {
    prefix: match[1] || '',
    number: Number(match[2].replace(/,/g, '.')),
    unit: match[3].trim(),
  };
}

function animateValue(target: number, setValue: (v: number) => void, duration = 1200) {
  const frameRate = 60;
  const totalFrames = Math.round((duration / 1000) * frameRate);
  let frame = 0;
  function animate() {
    frame++;
    const progress = Math.min(frame / totalFrames, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    setValue(Math.round(target * eased));
    if (frame < totalFrames) {
      requestAnimationFrame(animate);
    } else {
      setValue(target);
    }
  }
  animate();
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { stats } = useLocale();
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (isInView && stats?.sections) {
      stats.sections.forEach((stat) => {
        const parts = extractStatParts(stat.value);
        if (parts.number) {
          animateValue(parts.number, (value) => {
            setAnimatedValues((prev) => ({ ...prev, [stat.label]: value }));
          });
        }
      });
    }
  }, [isInView, stats?.sections]);

  if (!stats?.sections) {
    return null;
  }

  return (
    <section
      ref={ref}
      className="w-full py-24 bg-gradient-to-b from-slate-950 to-slate-900 text-white"
    >
      <div className="container mx-auto px-6 lg:px-24">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Teknolojik Üstünlükler
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.sections.map((stat, index) => {
            const parts = extractStatParts(stat.value);
            return (
              <motion.div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-xl p-3">
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl md:text-4xl font-bold text-primary">
                        {parts.prefix}
                        {animatedValues[stat.label] || 0}
                      </span>
                      <span className="text-xl text-primary/80">{parts.unit}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mt-2">{stat.label}</h3>
                    <p className="text-slate-400 mt-1 text-sm">{stat.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
