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
      <AnnouncementBanner
        label="Let’s Get Social!"
        text={[
          'Sneaker inspo, styling tips, and cool community vibes — connect with us on your favorite platforms.'
        ]}
        socials={true}
      />
    </div>
  );
};

export default Main;
