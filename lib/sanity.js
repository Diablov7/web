import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'sszuldy6'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_READ_TOKEN || process.env.VITE_SANITY_TOKEN

// Client for published content (public)
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Client for drafts (authenticated)
export const sanityClientWithToken = token
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
      perspective: 'previewDrafts',
    })
  : sanityClient

// Image URL builder
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source) => {
  if (!source) return null
  return builder.image(source)
}

// Query to get all published posts
export async function getAllPosts() {
  const query = `*[_type == "post" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    categories[]->{
      title,
      slug
    },
    body,
    "readTime": round(length(pt::text(body)) / 5 / 180)
  }`

  try {
    const posts = await sanityClient.fetch(query)
    return posts || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Query to get a single post by slug
export async function getPostBySlug(slug, preview = false, documentId = null) {
  const client = preview ? sanityClientWithToken : sanityClient
  
  let query
  
  if (preview && documentId) {
    // Se tiver documentId em preview, buscar pelo ID específico (pode ser draft)
    query = `*[_id == $documentId][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      _updatedAt,
      mainImage,
      categories[]->{
        title,
        slug
      },
      body,
      published,
      "readTime": round(length(pt::text(body)) / 5 / 180)
    }`
    
    try {
      const post = await client.fetch(query, { documentId })
      return post || null
    } catch (error) {
      console.error('Error fetching post by ID:', error)
      // Fallback para busca por slug
    }
  }
  
  // Busca normal por slug (funciona para published e drafts se preview=true)
  query = `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    _updatedAt,
    mainImage,
    categories[]->{
      title,
      slug
    },
    body,
    published,
    "readTime": round(length(pt::text(body)) / 5 / 180)
  }`

  try {
    const post = await client.fetch(query, { slug })
    return post || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Query to get related posts
export async function getRelatedPosts(currentPostId, categories, limit = 3) {
  const categorySlugs = categories?.map(cat => cat.slug?.current || cat.slug) || []
  
  const query = `*[_type == "post" && published == true && _id != $currentPostId && count(categories[@->slug.current in $categorySlugs]) > 0] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "readTime": round(length(pt::text(body)) / 5 / 180)
  }`

  try {
    const posts = await sanityClient.fetch(query, { 
      currentPostId, 
      categorySlugs,
      limit 
    })
    return posts || []
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

// Get all post slugs for static generation
export async function getAllPostSlugs() {
  const query = `*[_type == "post" && published == true] {
    "slug": slug.current
  }`

  try {
    const posts = await sanityClient.fetch(query)
    return posts.map(post => post.slug).filter(Boolean)
  } catch (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }
}

