import CategoryPill from "./CategoryPill";
import type { Articles } from "../types/blog.types";
import HeroLayout from "@/common/layout/hero-layout/HeroLayout";

const BlogHeader: React.FC<{ post: Articles }> = ({ post }) => {
  return (
    <HeroLayout minHeight="min-h-[30vh]">
      <header>
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:gap-3 lg:gap-4 lg:items-center">
          <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
            {post.category && <CategoryPill label={post.category.name} />}

            <h1 className="text-2xl font-bold md:text-3xl text-text-main">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="max-w-3xl text-text-muted">{post.excerpt}</p>
            )}
          </div>
        </div>
      </header>
    </HeroLayout>
  );
};

export default BlogHeader;
