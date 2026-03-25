import BannerSlider from "@/features/listings/components/banners/banner-slider/BannerSlider";
import BannerStaticSection from "@/features/listings/components/banners/banner-static-section/BannerStaticSection";
import HomeBrowseSection from "@/features/listings/components/browse/home-browse-section/HomeBrowseSection";
import RecommendedDealersSection from "@/features/listings/components/dealers/recommended-dealers-section/RecommendedDealersSection";
import BrowseByLocationSection from "@/features/listings/components/location/browse-by-location-section/BrowseByLocationSection";
import LatestCarNewsSection from "@/features/listings/components/news/latest-news-section/LatestNewsSection";
import ContactHelpSection from "@/features/listings/components/support/support-help-section/supportHelpSection";
import useGetHeroSection from "@/features/home/api/useGetHeroSection";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import { useMemo } from "react";
import {
  mapSliderBannerResponse,
  mapUnknownBannerResponse,
} from "@/features/listings/components/banners/utils/banner.adapter";
import useGetSliders from "@/features/home/api/useGetSliders";
const Home = () => {
  const heroQuery = useGetHeroSection();
  const slidersQuery = useGetSliders();

  const heroItems = useMemo(() => {
    if (!heroQuery.data) return [];

    return mapUnknownBannerResponse(heroQuery.data, {
      variant: "full-hero",
      href: "/car-browse",
      ctaLabel: "ابدأ التصفح",
      titleFallback: "Find Your Perfect Car",
      imageAltPrefix: "Hero banner",
    });
  }, [heroQuery.data]);

  const sliderItems = useMemo(() => {
    if (!slidersQuery.data) return [];

    return mapSliderBannerResponse(slidersQuery.data, {
      variant: "full-hero",
      href: "/offers",
      ctaLabel: "شوف العروض",
      titleFallback: "Latest Offers",
      imageAltPrefix: "Promotional slider",
    });
  }, [slidersQuery.data]);

  return (
    <div className="space-y-12 app-container my-36">
      <FetchHandler
        queryResult={heroQuery}
        skeletonType="banner"
        loadingType="skeleton"
      >
        <BannerStaticSection items={heroItems} />
      </FetchHandler>
      <HomeBrowseSection />
      <FetchHandler
        queryResult={slidersQuery}
        skeletonType="banner"
        loadingType="skeleton"
      >
        <BannerSlider
          items={sliderItems}
          autoPlay
          autoPlayInterval={4500}
          showDots
          showArrows={false}
        />
      </FetchHandler>

      <RecommendedDealersSection />
      <BrowseByLocationSection title="تصفح حسب المدن الأكثر طلبًا" />
      <LatestCarNewsSection />
      <ContactHelpSection />
    </div>
  );
};

export default Home;
