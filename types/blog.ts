export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string; // URL or path to image
  tags: string[];
  category?: string;
  date: string; // ISO date string
}

export type Posts = BlogPost[];
