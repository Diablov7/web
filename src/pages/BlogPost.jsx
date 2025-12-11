import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug, getRelatedPosts, urlFor } from '../lib/sanity';
import { incrementPostViews, getPostViews } from '../lib/supabase';
import BlockContent from '../components/Blog/BlockContent';
import PostViews from '../components/Blog/PostViews';
import BlogCard from '../components/Blog/BlogCard';
import { formatDate, formatRelativeDate } from '../utils/blog';
import { trackPageView, trackPostView } from '../lib/analytics';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [relatedPostsViews, setRelatedPostsViews] = useState({});
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const postData = await getPostBySlug(slug);

        if (!postData) {
          setLoading(false);
          return;
        }

        setPost(postData);

        // Buscar posts relacionados
        const related = await getRelatedPosts(
          postData._id,
          postData.categories,
          3
        );
        setRelatedPosts(related);

        // Buscar visualizações dos posts relacionados
        const relatedViews = {};
        for (const relatedPost of related) {
          const { views: relatedViewsCount } = await getPostViews(relatedPost._id);
          relatedViews[relatedPost._id] = relatedViewsCount || 0;
        }
        setRelatedPostsViews(relatedViews);

        // Incrementar visualizações
        const { views: postViews } = await incrementPostViews(postData._id);
        setViews(postViews);

        // Buscar visualizações atualizadas
        const { views: updatedViews } = await getPostViews(postData._id);
        setViews(updatedViews);

        // Trackear visualização
        trackPageView(`/blog/${slug}`);
        trackPostView(postData._id, postData.title);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post não encontrado</h1>
          <p className="text-gray-400 mb-8">O post que você está procurando não existe.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o blog
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : null;

  return (
    <>
      <Helmet>
        <title>{post.title} | Wevolv3 Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://wevolv3.com/blog/${slug}`} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta name="article:published_time" content={post.publishedAt} />
        {post.author && <meta name="article:author" content={post.author.name} />}
        {post.categories && post.categories.length > 0 && (
          <meta name="article:tag" content={post.categories.map(c => c.title).join(', ')} />
        )}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt || post.title,
            image: imageUrl,
            datePublished: post.publishedAt,
            author: {
              '@type': 'Person',
              name: post.author?.name || 'Wevolv3',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Wevolv3',
              logo: {
                '@type': 'ImageObject',
                url: 'https://wevolv3.com/logo.png',
              },
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Header com imagem */}
        {imageUrl && (
          <div className="relative h-96 overflow-hidden">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Botão voltar */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o blog
          </Link>

          {/* Cabeçalho do post */}
          <header className="mb-8">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category.slug.current}
                    className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-orbitron">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-gray-300 mb-6">{post.excerpt}</p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <img
                      src={urlFor(post.author.image).width(40).height(40).url()}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author.name}
                  </span>
                </div>
              )}

              {post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt, 'dd MMM yyyy')}
                </span>
              )}

              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min de leitura
                </span>
              )}

              <PostViews postId={post._id} />
            </div>
          </header>

          {/* Conteúdo do post */}
          <article className="prose prose-invert prose-lg max-w-none mb-12">
            <BlockContent blocks={post.body} />
          </article>

          {/* Posts relacionados */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-700">
              <h2 className="text-3xl font-bold mb-8 text-white font-orbitron">
                Posts Relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard
                    key={relatedPost._id}
                    post={relatedPost}
                    views={relatedPostsViews[relatedPost._id] || 0}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPost;

