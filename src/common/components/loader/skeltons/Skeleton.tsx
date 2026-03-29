import { SkeletonType } from "../../../../types/SkeltonType";
import BlogSkelton from "./BlogSkelton";

import BlogCardSkeleton from "./BlogCardSkeleton";
import BannerSkeleton from "@/common/components/loader/skeltons/BannerSkeleton";
import BrowseCarsSkeleton from "@/features/browse/components/browse-cars-skeleton";
interface SkeltonProps {
  type: SkeletonType;
}
const Skeleton: React.FC<SkeltonProps> = ({ type }) => {
  switch (type) {
    case "car":
      return <BrowseCarsSkeleton />;

    case "blog":
      return <BlogSkelton />;

    case "blog-card":
      return <BlogCardSkeleton />;

    case "banner":
      return <BannerSkeleton variant="single" itemVariant="full-hero" />;

    default:
      return null;
  }
};

export default Skeleton;
