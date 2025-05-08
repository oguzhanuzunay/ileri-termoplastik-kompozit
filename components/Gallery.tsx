'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const GALLERY_IMAGES = [
  {
    src: '/images/gallery/drone.jpg',
    alt: 'Drone frame made with recycled carbon panels',
    title: 'Drone Frame',
    description: 'Lightweight and durable drone frame utilizing recycled carbon panels',
    width: 600,
    height: 400,
  },
  {
    src: '/images/gallery/seat-back.jpg',
    alt: 'Automotive seat back using recycled carbon panels',
    title: 'Automotive Seat',
    description: 'High-performance automotive seat back with superior strength-to-weight ratio',
    width: 600,
    height: 400,
  },
  {
    src: '/images/gallery/e-bike.jpg',
    alt: 'E-bike frame constructed with recycled carbon panels',
    title: 'E-Bike Frame',
    description: 'Advanced e-bike frame design combining sustainability with performance',
    width: 600,
    height: 400,
  },
  {
    src: '/images/gallery/speaker.jpg',
    alt: 'High-end speaker enclosure using recycled carbon panels',
    title: 'Speaker Enclosure',
    description: 'Premium audio enclosure featuring exceptional acoustic properties',
    width: 600,
    height: 400,
  },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [thumbnailRef, thumbnailApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !thumbnailApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, thumbnailApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi || !thumbnailApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    thumbnailApi.scrollTo(emblaApi.selectedScrollSnap());
  }, [emblaApi, thumbnailApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full py-24 bg-background relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Main Carousel */}
          <div
            className="overflow-hidden"
            ref={emblaRef}
          >
            <div className="flex">
              {GALLERY_IMAGES.map((image, index) => (
                <div
                  key={index}
                  className="relative flex-[0_0_100%] min-w-0 cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="relative aspect-[16/9] mx-4">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover rounded-xl"
                      sizes="(max-width: 1400px) 100vw, 1400px"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-xl">
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-2xl font-semibold mb-2 text-white">{image.title}</h3>
                        <p className="text-lg text-slate-200">{image.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div
            className="mt-4 overflow-hidden"
            ref={thumbnailRef}
          >
            <div className="flex gap-4 px-4">
              {GALLERY_IMAGES.map((image, index) => (
                <button
                  key={index}
                  onClick={() => onThumbClick(index)}
                  className={`relative flex-[0_0_150px] min-w-0 transition-opacity ${
                    index === selectedIndex ? 'opacity-100' : 'opacity-50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover rounded-lg"
                      sizes="150px"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for enlarged image view */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[95vw] max-w-7xl aspect-[16/9]">
            <Image
              src={GALLERY_IMAGES[selectedImage].src}
              alt={GALLERY_IMAGES[selectedImage].alt}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
