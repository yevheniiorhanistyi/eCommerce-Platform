import AnnouncementBanner from '@/components/AnnouncementBanner/AnnouncementBanner';
import HeroSection from '@/components/HeroSection/HeroSection';
import BrandCarousel from '@/components/BrandCarousel/BrandCarousel';
import PopularCategories from '@/components/PopularCategories/PopularCategories';

const Main = (): JSX.Element => {
  return (
    <div className="w-full">
      <AnnouncementBanner
        text={['Seasonal savings are here! Shop our bestsellers before they are gone!']}
      />
      <HeroSection />
      <AnnouncementBanner
        label="Your shoes say a lot about you — and at StepUp, we help you say it louder."
        text={[
          'Explore a curated selection of sneakers that reflect your energy, ambitions, and personal style.',
          'From bold colors to sleek silhouettes, every pair in our store is chosen to support your individuality, performance, and everyday comfort.'
        ]}
      />
      <BrandCarousel />
      <PopularCategories />
    </div>
  );
};

export default Main;
