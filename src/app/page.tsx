import { ANNOUNCEMENT_TEXTS } from '@/constants/constants';
import AnnouncementBanner from '@/components/AnnouncementBanner/AnnouncementBanner';
import HeroSection from '@/components/HeroSection/HeroSection';
import BrandCarousel from '@/components/BrandCarousel/BrandCarousel';
import PopularCategories from '@/components/PopularCategories/PopularCategories';
import AllTimeFavorites from '@/components/AllTimeFavorites/AllTimeFavorites';

const Main = (): JSX.Element => {
  return (
    <div className="w-full">
      <AnnouncementBanner text={ANNOUNCEMENT_TEXTS.seasonalSale.text} />
      <HeroSection />
      <AnnouncementBanner
        label={ANNOUNCEMENT_TEXTS.heroPromo.label}
        text={ANNOUNCEMENT_TEXTS.heroPromo.text}
      />
      <BrandCarousel />
      <PopularCategories />
      <AnnouncementBanner
        label={ANNOUNCEMENT_TEXTS.socialCall.label}
        text={ANNOUNCEMENT_TEXTS.socialCall.text}
        socials={ANNOUNCEMENT_TEXTS.socialCall.socials}
      />
      <AllTimeFavorites />
    </div>
  );
};

export default Main;
