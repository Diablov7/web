import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-space-dark py-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Wevolv3. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-gray-400 text-sm font-medium mr-4">Follow Us</span>
            <div className="flex items-center space-x-4">
              <a 
                href="https://x.com/wevolv3_media" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://wevolv3.hashnode.dev/?source=footer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Hashnode"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M22.351 8.019l-6.37-6.37a5.63 5.63 0 0 0-7.962 0l-6.37 6.37a5.63 5.63 0 0 0 0 7.962l6.37 6.37a5.63 5.63 0 0 0 7.962 0l6.37-6.37a5.63 5.63 0 0 0 0-7.962zM12 15.953a3.953 3.953 0 1 1 0-7.906 3.953 3.953 0 0 1 0 7.906z" />
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/wevolv3.growth/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              to="/privacy-policy" 
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              Privacy Policy
            </Link>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 