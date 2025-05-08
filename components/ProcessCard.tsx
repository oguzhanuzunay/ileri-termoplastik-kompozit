'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProcessCardProps {
  step: number;
  title: string;
  desc: string;
  delay: number;
  active: boolean;
  onHover: () => void;
  onBlur: () => void;
}

export function ProcessCard({
  step,
  title,
  desc,
  delay,
  active,
  onHover,
  onBlur,
}: ProcessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.15, duration: 0.5 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 1.04 }}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
      onFocus={onHover}
      onBlur={onBlur}
      className="relative"
      style={{ zIndex: active ? 2 : 1 }}
    >
      <Card
        className={`relative overflow-visible border-2 rounded-2xl transition-all duration-300
          ${
            active
              ? 'border-sky-400 shadow-2xl bg-sky-50/60 dark:bg-slate-800/60'
              : 'border-white/40 shadow-md bg-white/80 dark:bg-slate-900/60 hover:border-sky-200'
          }
        `}
      >
        {/* Animated fill effect */}
        {active && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 bg-sky-100/60 dark:bg-slate-800/60 pointer-events-none z-0 origin-bottom"
            style={{ borderRadius: 16 }}
          />
        )}
        <div className="absolute top-0 left-0 w-16 h-16 bg-primary/10 rounded-br-2xl flex items-center justify-center z-10">
          <span className={`text-2xl font-bold ${active ? 'text-sky-500' : 'text-primary'}`}>
            {step}
          </span>
        </div>
        <CardHeader className="pt-16 flex flex-col items-center text-center relative z-10">
          <Image
            src={`/images/process-${step}.png`}
            alt={title}
            width={128}
            height={128}
            className="mb-4"
            style={{
              filter: active ? 'drop-shadow(0 4px 16px #38bdf8aa)' : 'none',
              transition: 'filter 0.3s',
            }}
          />
          <CardTitle
            className={`text-xl mb-2 font-bold ${active ? 'text-sky-700 dark:text-sky-300' : ''}`}
          >
            {title}
          </CardTitle>
          <CardDescription className="text-base">{desc}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
