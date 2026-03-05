import { LeafletType } from "@/features/leaflets/types/leaflets.types";

export interface SimpleArticle {
  title: string;
  slug: string;
  excerpt: string;
}
export interface Articles extends SimpleArticle {
  id: number;
  is_active: boolean;
  description: string;
  content: {
    heading: string;
    content: string;
  }[];
  images: string[];
  published_at: string;
  reading_time: number;
  views_count: number;
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  author?: {
    name: string;
    affiliation: string;
    image: string
  };
  author_name?: string;
  related_leaflets?: LeafletType[]
}

export interface BlogCategories {
  name: string
  description: string
  slug: string
  blogs_count: number
}