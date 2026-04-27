import { Timestamp } from 'firebase/firestore';

export interface Thread {
  id: string;
  title: string;
  body: string;
  tag: string;
  authorEmail: string;
  authorUsername: string;
  createdAt: Timestamp;
  replyCount: number;
  pinned: boolean;
}

export interface Reply {
  id: string;
  body: string;
  authorEmail: string;
  authorUsername: string;
  createdAt: Timestamp;
}

export interface Post {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
}

export interface Corper {
  id: string;
  name: string;
  state: string;
  ppa: string;
  story: string;
  image: string;
  date: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}
