import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundCubes from './components/BackgroundCubes';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ExternalRedirect from './components/ExternalRedirect';

// Blog external URL
const BLOG_URL = 'https://blogwevolv3.wordpress.com/';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-space-dark text-white overflow-x-hidden flex flex-col">
        <LoadingScreen isLoading={isLoading} />
        
        {/* Background Elements */}
        <BackgroundCubes />
        
        {/* Content */}
        <div className="relative z-10 flex-grow flex flex-col">
          <Header />
          
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<ExternalRedirect to={BLOG_URL} />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;