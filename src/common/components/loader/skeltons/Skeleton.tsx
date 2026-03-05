import ProductSkelton from "./ProductSkelton";
import SliderSkeleton from "./SliderSkelton";
import { SkeletonType } from "../../../../types/SkeltonType";
import BlogSkelton from "./BlogSkelton";
import HeroSkeleton from "./HeroSkeltion";
import FooterSkeleton from "./FooterSkeleton";
import ListSkeleton from "./ListSkeleton";
import PageSkeleton from "./PageSkeleton";
import CardSkeleton from "./CardSkeleton";
import ReviewSkeleton from "./ReviewSkeleton";
import AboutHeroSkeleton from "./AboutHeroSkeleton";
import VisionMissionSkeletonSection from "./VisionMissionSkeleton";
import { FounderProfileSkeleton } from "./FounderProfileSkeleton";
import ClosingStatementSkeleton from "./ClosingStatementSkeleton";
import HomeHeroSkeleton from "./HomeHeroSkeleton";
import FeaturedLeafletsSkeleton from "./FeaturedLeafletCardSkeleton";
import BrowseByBodySkeleton from "./BodySystemTileSkeleton";
import TrustSectionSkeleton from "./TrustSectionSkeleton";
import BlogCardSkeleton from "./BlogCardSkeleton";
import TestimonialsSkeleton from "./TestimonialCardSkeleton";
import ArticlePageSkeleton from "./ArticlePageSkeleton";

interface SkeltonProps {
  type: SkeletonType;
}
const Skeleton: React.FC<SkeltonProps> = ({ type }) => {
  switch (type) {
    case "hero":
      return <HeroSkeleton />;
    case "home-hero":
      return <HomeHeroSkeleton />;
    case "about-hero":
      return <AboutHeroSkeleton />;
    case "leaflet":
      return <ProductSkelton />;
    case "slider":
      return <SliderSkeleton />;
    case "blog":
      return <BlogSkelton />;
    case "list":
      return <ListSkeleton />;
    case "page":
      return <PageSkeleton />;
    case "card":
      return <CardSkeleton />;
    case "blog-card":
      return <BlogCardSkeleton />;
    case "article-page":
      return <ArticlePageSkeleton />;
    case "body-system":
      return <BrowseByBodySkeleton />;
    case "featured-leaflets-section":
      return <FeaturedLeafletsSkeleton />;
    case "vision-mission-skeleton":
      return <VisionMissionSkeletonSection />;
    case "rev":
      return <ReviewSkeleton />;
    case "close":
      return <ClosingStatementSkeleton />;
    case "trust":
      return <TrustSectionSkeleton />;
    case "testimonials":
      return <TestimonialsSkeleton />;
    case "founder-profile":
      return (
        <>
          <FounderProfileSkeleton />
          <FounderProfileSkeleton reverse />
        </>
      );
    case "footer":
      return <FooterSkeleton />;

    default:
      return null;
  }
};

export default Skeleton;
