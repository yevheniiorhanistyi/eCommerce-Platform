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
              <div className="relative flex items-center justify-center h-24 px-4">
                <div className="relative w-[100px] h-[80px]">
                  <Image
                    src={`/images/brands/${logo}`}
                    alt={logo.replace('.png', '')}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 100px"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default BrandCarousel;
