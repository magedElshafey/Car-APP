import BannerSlider from "@/features/listings/components/banners/banner-slider/BannerSlider";
import BannerStaticSection from "@/features/listings/components/banners/banner-static-section/BannerStaticSection";
import HomeBrowseSection from "@/features/listings/components/browse/home-browse-section/HomeBrowseSection";
import BrowseByLocationSection from "@/features/listings/components/location/browse-by-location-section/BrowseByLocationSection";
import LatestCarNewsSection from "@/features/listings/components/news/latest-news-section/LatestNewsSection";
import ContactHelpSection from "@/features/listings/components/support/support-help-section/ContactHelpSection";
import useGetHeroSection from "@/features/home/api/useGetHeroSection";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import { useMemo } from "react";
import {
  mapSliderBannerResponse,
  mapUnknownBannerResponse,
} from "@/features/listings/components/banners/utils/banner.adapter";
import useGetSliders from "@/features/home/api/useGetSliders";
import useGetBlogs from "@/features/blogs/api/useGetBlogs";
import useGetUsedCars from "@/features/home/api/useGetUsedCars";
import UsedCarSection from "@/features/home/components/UsedCarSection";
import useGetNewCars from "@/features/home/api/useGetNewCars";
import NewsCarsSection from "@/features/home/components/NewsCarsSection";
const Home = () => {
  const heroQuery = useGetHeroSection();
  const slidersQuery = useGetSliders();
  console.log("sliders query", slidersQuery?.data?.data);
  const blogQuery = useGetBlogs();
  const heroItems = useMemo(() => {
    if (!heroQuery.data) return [];

    return mapUnknownBannerResponse(heroQuery.data, {
      variant: "full-hero",
      href: "/car-browse",
      ctaLabel: "shop now",
      imageAltPrefix: "Hero banner",
    });
  }, [heroQuery.data]);

  const sliderItems = useMemo(() => {
    if (!slidersQuery.data) return [];

    return mapSliderBannerResponse(slidersQuery.data, {
      variant: "full-hero",
      imageAltPrefix: "Promotional slider",
    });
  }, [slidersQuery.data]);
  console.log("sliderItems", sliderItems);
  const usedCarsQuery = useGetUsedCars();
  const newCarsQuery = useGetNewCars();
  return (
    <>
      <div className="mb-8 overflow-x-hidden md:mb-9 lg:mb-10 xl:mb-11 2xl:mb-12">
        <FetchHandler
          queryResult={heroQuery}
          skeletonType="banner"
          loadingType="skeleton"
        >
          <BannerStaticSection items={heroItems} />
        </FetchHandler>
      </div>
      <div className="space-y-8 app-container md:space-y-9 lg:space-y-10 xl:space-y-11 2xl:space-y-12">
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
        <FetchHandler queryResult={usedCarsQuery} skeletonType="car">
          <UsedCarSection data={usedCarsQuery?.data || []} />
        </FetchHandler>
        <BrowseByLocationSection title="Browse by most popular cities" />
        <FetchHandler queryResult={newCarsQuery} skeletonType="car">
          <NewsCarsSection data={newCarsQuery?.data || []} />
        </FetchHandler>
        <FetchHandler queryResult={blogQuery} skeletonType="blog-card">
          <LatestCarNewsSection data={blogQuery?.data || []} />
        </FetchHandler>
        <ContactHelpSection />
      </div>
    </>
  );
};

export default Home;
