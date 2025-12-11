import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import PortableText from '@/components/blog/PortableText'
import PreviewBanner from '@/components/blog/PreviewBanner'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params, searchParams }) {
  const post = await getPostBySlug(params.slug, !!searchParams.preview)
  
  if (!post) {
    return {
      title: 'Post Not Found | Wevolv3 Blog',
    }
  }

  const imageUrl = post.mainImage ? urlFor(post.mainImage)?.url() : 'https://wevolv3.com/logo.png'
  const excerpt = post.excerpt || post.title || 'Read the latest insights from Wevolv3'

  return {
    title: `${post.title} | Wevolv3 Blog`,
    description: excerpt,
    openGraph: {
      title: post.title,
      description: excerpt,
      url: `https://wevolv3.com/blog/${params.slug}`,
      images: [imageUrl],
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt,
      images: [imageUrl],
    },
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

export default async function BlogPostPage({ params, searchParams }) {
  const isPreview = !!searchParams.preview
  const documentId = searchParams.id || null
  const post = await getPostBySlug(params.slug, isPreview, documentId)
  
  if (!post) {
    notFound()
  }

  const isDraft = post._id?.startsWith('drafts.')
  const isUnpublished = !post.published
  const imageUrl = post.mainImage ? urlFor(post.mainImage)?.url() : null
  const relatedPosts = await getRelatedPosts(post._id, post.categories || [])

  return (
    <div className="min-h-screen bg-black">
      {/* Preview Banner */}
      {isPreview && <PreviewBanner isDraft={isDraft} isUnpublished={isUnpublished} />}

      {/* Header */}
      <header className={`border-b border-white/10 py-6 px-4 ${isPreview ? 'mt-12' : ''}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            Wevolv3
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[95%] lg:max-w-[1400px] mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{post.title}</span>
        </nav>

        {/* Article */}
        <article>
          {/* Title */}
          <h1 className="text-5xl font-bold mb-6 gradient-text">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-8 text-gray-400 text-sm">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </>
            )}
            {post.categories && post.categories.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-2">
                  {post.categories.map((cat, idx) => (
                    <span key={idx} className="text-primary">
                      {cat.title}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Featured Image */}
          {imageUrl && (
            <div className="mb-12">
              <img 
                src={imageUrl} 
                alt={post.title}
                className="w-full rounded-[20px] shadow-2xl"
              />
            </div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-300 mb-8 italic">
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none break-words overflow-wrap-anywhere">
            <PortableText blocks={post.body} />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-white/10">
            <h2 className="text-3xl font-bold mb-8 gradient-text">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => {
                const relatedImageUrl = relatedPost.mainImage ? urlFor(relatedPost.mainImage)?.url() : null
                const relatedSlug = relatedPost.slug?.current || relatedPost.slug
                
                return (
                  <Link 
                    key={relatedPost._id}
                    href={`/blog/${relatedSlug}`}
                    className="group"
                  >
                    <article className="bg-surface/50 border border-white/10 rounded-[20px] overflow-hidden hover:border-primary/50 transition-all">
                      {relatedImageUrl && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={relatedImageUrl} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        {relatedPost.excerpt && (
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        )}
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <p className="text-gray-500">&copy; 2024 Wevolv3. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms</Link>
              <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

