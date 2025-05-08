'use client';

import { useLocale } from '@/hooks/useLocale';
import { motion } from 'framer-motion';

export function LeadForm() {
  const { lead } = useLocale();

  return (
    <section
      id="lead"
      className="w-full py-24 bg-slate-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-6 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{lead.heading}</h2>
            <p className="text-lg text-muted-foreground">{lead.subheading}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden"
          >
            <iframe
              src="https://forms.gle/zzRkNy77G5PxEMWL6"
              className="w-full min-h-[800px] border-0"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Yükleniyor...
            </iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
