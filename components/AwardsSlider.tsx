'use client';

import { useLocale } from '@/hooks/useLocale';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function AwardsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { awards } = useLocale();

  // Eğer awards verisi yoksa bileşeni gösterme
  if (!awards || !Array.isArray(awards) || awards.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % awards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + awards.length) % awards.length);
  };

  return (
    <section className="w-full py-24 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Ödül görseli ve başlık */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 drop-shadow-xl">
            <Image
              src="/images/award.png"
              alt="RePlast Eurasia 2025 Birincilik Ödülü"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="mt-6 text-2xl md:text-3xl font-bold text-slate-800 text-center">
            RePlast Eurasia 2025 Birincilik Ödülü
          </h1>
          <p className="mt-2 text-base md:text-lg text-slate-600 text-center max-w-xl">
            TPC-SMC ürünü ve üretim yöntemiyle RePlast Eurasia 2025 İnovasyon ve Teknoloji
            Birincilik Ödülü.
          </p>
        </div>
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Başarılarımız ve Ödüllerimiz
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Teknolojimizin ulusal ve uluslararası platformlarda kazandığı başarılar
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Slider Container */}
          <div className="relative h-[500px] overflow-hidden rounded-xl">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  x: currentSlide === index ? 0 : 100,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-full h-full">
                  {award.type === 'video' ? (
                    <video
                      className="w-full h-full object-cover"
                      src={award.mediaUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={award.mediaUrl}
                      alt={award.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{award.title}</h3>
                    <p className="text-lg">{award.description}</p>
                    <p className="text-sm mt-2">{award.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            aria-label="Önceki"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            aria-label="Sonraki"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-4">
            {awards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-primary w-8' : 'bg-primary/20'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
