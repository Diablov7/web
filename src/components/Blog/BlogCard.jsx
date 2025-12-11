import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../../lib/sanity';
import { formatDate, formatRelativeDate, truncateText } from '../../utils/blog';
import { Eye } from 'lucide-react';

const BlogCard = ({ post, views = 0 }) => {
  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(600).height(400).url()
    : null;

  return (
    <Link 
      to={`/blog/${post.slug.current}`}
      className="group block"
    >
      <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1">
        {imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
            {post.categories && post.categories.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {post.categories[0].title}
              </span>
            )}
            <span className="text-gray-500">
              {formatDate(post.publishedAt)}
            </span>
            {post.readTime && (
              <span className="text-gray-500">
                {post.readTime} min de leitura
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors duration-300 font-orbitron">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-gray-300 mb-4 line-clamp-3">
              {truncateText(post.excerpt, 120)}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              {post.author && (
                <>
                  {post.author.image && (
                    <img
                      src={urlFor(post.author.image).width(32).height(32).url()}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <span>{post.author.name}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-1 text-sm text-emerald-400">
              <Eye className="w-4 h-4" />
              <span>{views.toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;

