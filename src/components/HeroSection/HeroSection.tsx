import Link from 'next/link';
import { Button } from '../ui/button';

const HeroSection = (): JSX.Element => {
  return (
    <section className="px-4 sm:px-10 py-5 relative w-full overflow-hidden">
      <div className="relative flex flex-col items-center justify-between gap-6 xl:gap-0 w-full h-full max-w-[1440px] min-h-[65vh] md:min-h-[80vh] mx-auto z-10">
        <div className="max-w-[280px] pt-10 self-start">
          <div className="flex flex-col gap-2 md:gap-3 mb-0 md:mb-4">
            {['Run', 'Jump', 'Live', 'Step Up'].map((word) => (
              <span className="text-6xl md:text-7xl font-bold" key={word}>
                {word}
              </span>
            ))}
          </div>
          <Button asChild size="lg" className="mt-4 w-full cursor-pointer py-6">
            <Link href="/catalog">Shop Now</Link>
          </Button>
        </div>
        <h2 className="text-base md:text-xl font-bold self-end text-shadow-2xs">
          Step into comfort. Stay in style.
        </h2>
      </div>
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] md:w-[1100px] md:h-[800px] -translate-x-1/2 md:-translate-x-1/3 -translate-y-1/2 bg-[url('/images/hero-poster.png')] bg-center bg-cover bg-no-repeat z-0"
        data-testid="hero-background"
      />
    </section>
  );
};

export default HeroSection;
