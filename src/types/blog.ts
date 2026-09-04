export interface BlogAuthor {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  avatar?: {
    asset: { _ref: string };
    alt?: string;
  };
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  category: 'Guides' | 'News' | 'Stories' | 'State Guides' | 'Tips' | 'Photos';
  tags?: string[];
  coverImage?: {
    asset: { _ref: string };
    alt?: string;
  };
  author: BlogAuthor;
  publishedAt?: string;
  excerpt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  featured?: boolean;
  state?: string;
}

export interface BlogReaction {
  postSlug: string;
  emoji: string;
  count: number;
}

export interface BlogComment {
  id?: string;
  postSlug: string;
  name: string;
  body: string;
  createdAt: string;
  approved: boolean;
}
