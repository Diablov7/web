import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN || '', // Você precisará criar um token
});

const BlogEditor = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Campos do post
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [published, setPublished] = useState(false);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'wevolv3admin2025';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem('blog_editor_authenticated', 'true');
    } else {
      alert('Senha incorreta');
    }
  };

  // Converter HTML para blocos do Sanity
  const htmlToSanityBlocks = (html) => {
    if (!html || !html.trim()) {
      return [{
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: '',
          marks: []
        }]
      }];
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body;
    const blocks = [];

    // Função para processar nós recursivamente
    const processNode = (node) => {
      if (node.nodeType === 1) { // Element node
        const tagName = node.tagName.toLowerCase();
        
        if (tagName === 'h1') {
          blocks.push({
            _type: 'block',
            style: 'h1',
            children: [{
              _type: 'span',
              text: node.textContent || '',
              marks: []
            }]
          });
        } else if (tagName === 'h2') {
          blocks.push({
            _type: 'block',
            style: 'h2',
            children: [{
              _type: 'span',
              text: node.textContent || '',
              marks: []
            }]
          });
        } else if (tagName === 'h3') {
          blocks.push({
            _type: 'block',
            style: 'h3',
            children: [{
              _type: 'span',
              text: node.textContent || '',
              marks: []
            }]
          });
        } else if (tagName === 'p') {
          const text = node.textContent || '';
          if (text.trim()) {
            blocks.push({
              _type: 'block',
              style: 'normal',
              children: [{
                _type: 'span',
                text: text.trim(),
                marks: []
              }]
            });
          }
        } else if (tagName === 'ul' || tagName === 'ol') {
          // Processar listas
          Array.from(node.children).forEach((li) => {
            if (li.tagName.toLowerCase() === 'li') {
              blocks.push({
                _type: 'block',
                style: 'normal',
                children: [{
                  _type: 'span',
                  text: `• ${li.textContent || ''}`,
                  marks: []
                }]
              });
            }
          });
        } else if (tagName === 'div' || tagName === 'section' || tagName === 'article') {
          // Processar filhos recursivamente
          Array.from(node.childNodes).forEach(processNode);
        } else {
          // Para outros elementos, extrair texto
          const text = node.textContent || '';
          if (text.trim()) {
            blocks.push({
              _type: 'block',
              style: 'normal',
              children: [{
                _type: 'span',
                text: text.trim(),
                marks: []
              }]
            });
          }
        }
      } else if (node.nodeType === 3) { // Text node
        const text = node.textContent || '';
        if (text.trim() && text.trim().length > 0) {
          // Só adicionar se não for apenas espaços
          const trimmed = text.trim();
          if (trimmed) {
            blocks.push({
              _type: 'block',
              style: 'normal',
              children: [{
                _type: 'span',
                text: trimmed,
                marks: []
              }]
            });
          }
        }
      }
    };

    // Processar todos os nós do body
    Array.from(body.childNodes).forEach(processNode);

    // Se não gerou nenhum bloco, criar um vazio
    if (blocks.length === 0) {
      const plainText = html.replace(/<[^>]*>/g, '').trim();
      if (plainText) {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: plainText,
            marks: []
          }]
        });
      } else {
        blocks.push({
          _type: 'block',
          style: 'normal',
          children: [{
            _type: 'span',
            text: '',
            marks: []
          }]
        });
      }
    }

    return blocks;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, preencha o título');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Gerar slug do título
      const slug = title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Converter HTML para blocos do Sanity
      const body = htmlToSanityBlocks(htmlContent || '<p>Conteúdo do post</p>');

      // Criar o post
      const post = {
        _type: 'post',
        title: title,
        slug: {
          _type: 'slug',
          current: slug
        },
        excerpt: excerpt || title,
        body: body,
        publishedAt: new Date().toISOString(),
        published: published,
        // Autor e categorias são opcionais
        // author: null,
        // categories: []
      };

      const result = await sanityClient.create(post);
      
      setMessage('✅ Post criado com sucesso!');
      setTitle('');
      setExcerpt('');
      setHtmlContent('');
      setPublished(false);
      
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setMessage('❌ Erro ao criar post: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isAuth = sessionStorage.getItem('blog_editor_authenticated') === 'true';
    if (isAuth) {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8">
            <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
              Editor de Blog
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

  return (
    <>
      <Helmet>
        <title>Editor de Blog | Wevolv3 Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-orbitron">
              Editor de Blog
            </h1>
            <p className="text-gray-400">Cole seu HTML e publique automaticamente</p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('✅') 
                ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' 
                : 'bg-red-500/20 border border-red-500/50 text-red-400'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-8">
            <div className="space-y-6">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Título do Post *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Digite o título do post"
                  required
                />
              </div>

              {/* Resumo */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Resumo (aparece na listagem)
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Breve descrição do post"
                  rows="3"
                />
              </div>

              {/* HTML Content */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Conteúdo HTML *
                </label>
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono text-sm"
                  placeholder="Cole seu HTML aqui... Exemplo: <h1>Título</h1><p>Parágrafo...</p>"
                  rows="15"
                  required
                />
                <p className="mt-2 text-xs text-gray-500">
                  Cole o HTML completo do artigo. O sistema formatará automaticamente.
                </p>
              </div>

              {/* Publicado */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-700 bg-gray-900/50 text-emerald-500 focus:ring-emerald-500"
                />
                <label htmlFor="published" className="text-gray-300">
                  Publicar imediatamente
                </label>
              </div>

              {/* Botão Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Publicando...' : 'Publicar Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogEditor;

