import { getAllPosts } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'

export const metadata = {
  title: 'Wevolv3 Blog | Web3 & Crypto Marketing',
  description: 'Insights, strategies, and cutting-edge knowledge from the world of Web3 marketing and growth.',
  openGraph: {
    title: 'Wevolv3 Blog | Web3 & Crypto Marketing',
    description: 'Insights, strategies, and cutting-edge knowledge from the world of Web3 marketing and growth.',
    url: 'https://wevolv3.com/blog',
    images: ['https://wevolv3.com/logo.png'],
  },
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            Wevolv3
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/blog" className="text-primary">Blog</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Wevolv3 Blog
          </h1>
          <p className="text-gray-400 text-lg">
            Web3 & Crypto Marketing Insights
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const imageUrl = post.mainImage ? urlFor(post.mainImage)?.url() : null
              const slug = post.slug?.current || post.slug
              
              return (
                <Link 
                  key={post._id} 
                  href={`/blog/${slug}`}
                  className="group"
                >
                  <article className="bg-surface/50 border border-white/10 rounded-[20px] overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    {imageUrl && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={imageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                        {post.readTime && (
                          <span>{post.readTime} min read</span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
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

// Note: generateStaticParams is not needed for page.tsx in App Router
// Next.js automatically generates static pages for all routes

