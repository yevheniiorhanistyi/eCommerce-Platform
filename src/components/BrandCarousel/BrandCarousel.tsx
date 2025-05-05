'use client';

import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

import { brandLogos } from '@/constants/brands';

const BrandCarousel = (): JSX.Element => {
  return (
    <section className="w-full flex items-center justify-center">
      <Carousel
        opts={{
          align: 'center',
          loop: true
        }}
        plugins={[Autoplay({ delay: 3000 })]}
        className="w-full max-w-6xl"
      >
        <CarouselContent>
          {brandLogos.map((logo, index) => (
            <CarouselItem key={index} className="basis-1/3 md:basis-1/5">
              <div className="flex items-center justify-center h-24 px-4">
                <Image
                  src={`/images/brands/${logo}`}
                  alt={logo.replace('.png', '')}
                  width={100}
                  height={80}
                  className="object-contain max-h-16 grayscale hover:grayscale-0 transition"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default BrandCarousel;
