import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { BlogPost } from '../types/blog';

export const sanityClient = createClient({
  projectId: '8uobuwdy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // fast cached reads for published content
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── GROQ Queries ────────────────────────────────────────────────────────────

const POST_FIELDS = `
  _id,
  title,
  slug,
  category,
  tags,
  coverImage { asset, alt },
  author-> { _id, name, role, avatar { asset, alt } },
  publishedAt,
  excerpt,
  featured,
  state
`;

export async function getAllPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "post" && defined(publishedAt) && publishedAt <= now()]
     | order(featured desc, publishedAt desc) {
       ${POST_FIELDS}
     }`
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
       ${POST_FIELDS},
       body
     }`,
    { slug }
  );
}

export async function getRelatedPosts(
  category: string,
  excludeSlug: string
): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "post" && category == $category && slug.current != $excludeSlug
       && defined(publishedAt) && publishedAt <= now()]
     | order(publishedAt desc)[0...3] {
       ${POST_FIELDS}
     }`,
    { category, excludeSlug }
  );
}
