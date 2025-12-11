import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getAllPostViews } from '../../lib/supabase';
import { getAllPosts } from '../../lib/sanity';
import { BarChart3, Eye, TrendingUp, FileText } from 'lucide-react';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalViews: 0,
    totalPosts: 0,
    posts: [],
  });
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  // Senha simples (em produção, usar autenticação adequada)
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'wevolv3admin2025';

  useEffect(() => {
    // Verificar se já está autenticado
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    if (isAuth) {
      setAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      fetchData();
    } else {
      alert('Senha incorreta');
    }
  };

  const fetchData = async () => {
    try {
      const [viewsData, postsData] = await Promise.all([
        getAllPostViews(),
        getAllPosts(),
      ]);

      // Criar mapa de visualizações
      const viewsMap = {};
      let totalViews = 0;
      viewsData.data.forEach((item) => {
        viewsMap[item.post_id] = item.views;
        totalViews += item.views;
      });

      // Combinar posts com visualizações
      const postsWithViews = postsData.map((post) => ({
        ...post,
        views: viewsMap[post._id] || 0,
      }));

      // Ordenar por visualizações
      postsWithViews.sort((a, b) => b.views - a.views);

      setStats({
        totalViews,
        totalPosts: postsData.length,
        posts: postsWithViews,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
              Admin Analytics
            </h1>
            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Digite a senha"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Analytics | Wevolv3 Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
              Dashboard de Analytics
            </h1>
            <p className="text-gray-400">Estatísticas do blog e visualizações</p>
          </div>

          {/* Cards de estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">Total de Visualizações</h3>
                <Eye className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-bold text-white">{stats.totalViews.toLocaleString('pt-BR')}</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">Total de Posts</h3>
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-white">{stats.totalPosts}</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">Média por Post</h3>
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white">
                {stats.totalPosts > 0
                  ? Math.round(stats.totalViews / stats.totalPosts).toLocaleString('pt-BR')
                  : 0}
              </p>
            </div>
          </div>

          {/* Tabela de posts */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white font-orbitron">Posts por Visualização</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Post</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Categoria</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Visualizações</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.posts.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                        Nenhum post encontrado
                      </td>
                    </tr>
                  ) : (
                    stats.posts.map((post) => (
                      <tr
                        key={post._id}
                        className="border-b border-gray-700/50 hover:bg-gray-900/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="text-white font-medium">{post.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          {post.categories && post.categories.length > 0 ? (
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs border border-emerald-500/30">
                              {post.categories[0].title}
                            </span>
                          ) : (
                            <span className="text-gray-500 text-sm">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-emerald-400 font-semibold">
                            {post.views.toLocaleString('pt-BR')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString('pt-BR')
                            : '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;

