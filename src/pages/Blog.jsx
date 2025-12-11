import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getAllPosts } from '../lib/sanity';
import { getAllPostViews } from '../lib/supabase';
import BlogCard from '../components/Blog/BlogCard';
import { trackPageView } from '../lib/analytics';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [viewsMap, setViewsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar posts e visualizações em paralelo
        const [postsData, viewsData] = await Promise.all([
          getAllPosts(),
          getAllPostViews(),
        ]);

        setPosts(postsData);

        // Criar mapa de visualizações
        const views = {};
        viewsData.data.forEach((item) => {
          views[item.post_id] = item.views;
        });
        setViewsMap(views);

        // Trackear visualização da página
        trackPageView('/blog');
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando posts...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog | Wevolv3 - Digital Reality</title>
        <meta
          name="description"
          content="Descubra os últimos insights em Web3, marketing digital e soluções inovadoras. Artigos sobre tecnologia, negócios e tendências do mercado."
        />
        <meta property="og:title" content="Blog | Wevolv3" />
        <meta
          property="og:description"
          content="Descubra os últimos insights em Web3, marketing digital e soluções inovadoras."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wevolv3.com/blog" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-orbitron">
              Blog Wevolv3
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Descubra os últimos insights em Web3, marketing digital e soluções inovadoras
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                Nenhum post encontrado. Em breve teremos conteúdo incrível para você!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  views={viewsMap[post._id] || 0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;

