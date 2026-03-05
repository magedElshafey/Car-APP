// src/features/blogs/pages/BlogDetailsPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import ArticleDocPage from "./ArticleDocPage";
import useGetBlogDetails from "../api/useGetBlogDetails";

const BlogDetailsPage: React.FC = () => {
  const { slug } = useParams();

  const useQueryHook = () => useGetBlogDetails(slug || "");

  return (
    <ArticleDocPage
      useQueryHook={useQueryHook}
      skeletonType="article-page"
      seoType="blog" // ✅ مهم
    />
  );
};

export default BlogDetailsPage;
