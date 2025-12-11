import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// Configuração do cliente Sanity
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Builder para URLs de imagens
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source) => {
  if (!source) return null;
  return builder.image(source);
};

// Query para buscar todos os posts
export const getAllPosts = async () => {
  const query = `*[_type == "post" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author->{
      name,
      image
    },
    mainImage,
    categories[]->{
      title,
      slug
    },
    body,
    "readTime": round(length(body) / 5 / 180)
  }`;

  try {
    const posts = await sanityClient.fetch(query);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Query para buscar um post específico por slug
export const getPostBySlug = async (slug) => {
  const query = `*[_type == "post" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author->{
      name,
      image
    },
    mainImage,
    categories[]->{
      title,
      slug
    },
    body,
    "readTime": round(length(body) / 5 / 180)
  }`;

  try {
    const post = await sanityClient.fetch(query, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// Query para buscar posts relacionados
export const getRelatedPosts = async (currentPostId, categories, limit = 3) => {
  const categorySlugs = categories?.map(cat => cat.slug.current) || [];
  
  const query = `*[_type == "post" && published == true && _id != $currentPostId && count(categories[@->slug.current in $categorySlugs]) > 0] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "readTime": round(length(body) / 5 / 180)
  }`;

  try {
    const posts = await sanityClient.fetch(query, { 
      currentPostId, 
      categorySlugs,
      limit 
    });
    return posts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};

