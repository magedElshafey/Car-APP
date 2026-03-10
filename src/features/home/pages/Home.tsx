import BannerSlider from "@/features/listings/components/banners/banner-slider/BannerSlider";
import BannerStaticSection from "@/features/listings/components/banners/banner-static-section/BannerStaticSection";
import HomeBrowseSection from "@/features/listings/components/browse/home-browse-section/HomeBrowseSection";
import RecommendedDealersSection from "@/features/listings/components/dealers/recommended-dealers-section/RecommendedDealersSection";
import BrowseByLocationSection from "@/features/listings/components/location/browse-by-location-section/BrowseByLocationSection";
import LatestCarNewsSection from "@/features/listings/components/news/latest-news-section/LatestNewsSection";
import ContactHelpSection from "@/features/listings/components/support/support-help-section/supportHelpSection";
import { promoBanners } from "@/features/listings/data/promoBanners.data";
import {
  dualStaticBanners,
  singleStaticBanner,
} from "@/features/listings/data/staticPromoBanners.data";

const Home = () => {
  return (
    <div className="space-y-12 app-container my-36">
      <BannerStaticSection items={singleStaticBanner} />
      <HomeBrowseSection />
      <BannerSlider
        items={promoBanners}
        autoPlay
        autoPlayInterval={4500}
        showDots
        showArrows={false}
      />
      <RecommendedDealersSection />
      <BannerStaticSection items={dualStaticBanners} />
      <BrowseByLocationSection title="تصفح حسب المدن الأكثر طلبًا" />
      <LatestCarNewsSection />
      <ContactHelpSection />
    </div>
  );
};

export default Home;
