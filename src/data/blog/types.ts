export interface BlogSection {
  title: string;
  content: string;
  subsections?: {
    title: string;
    content: string;
  }[];
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
  content: string;
  sections: BlogSection[];
  imageAlt?: string;
  keywords?: string[];
}
