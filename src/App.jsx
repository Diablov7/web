import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Analytics from './pages/Admin/Analytics';
import BlogEditor from './pages/Admin/BlogEditor';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="App">
              <h1>Wevolv3 - Digital Reality</h1>
              <p>Site em desenvolvimento...</p>
              <div className="mt-8">
                <a 
                  href="/blog" 
                  className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                >
                  Ver Blog
                </a>
              </div>
            </div>
          } />
          {/* Blog routes removed - using static blog.html instead */}
          {/* <Route path="/blog" element={<Blog />} /> */}
          {/* <Route path="/blog/:slug" element={<BlogPost />} /> */}
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/blog-editor" element={<BlogEditor />} />
          <Route path="*" element={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">404 - Página não encontrada</h1>
                <p className="text-gray-400 mb-6">A página que você procura não existe.</p>
                <a href="/" className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors">
                  Voltar para Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
