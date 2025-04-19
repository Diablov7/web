import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="max-w-4xl mx-auto bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">1. Introduction</h2>
            <p>
              Welcome to our Privacy Policy. This document explains how we collect, use, 
              store, and protect your personal information when you use our website 
              and related services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">2. Information We Collect</h2>
            <p>
              We may collect the following information:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Personal identification information (name, email, phone)</li>
              <li>Usage and browsing data</li>
              <li>Device and browser information</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">3. How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide and improve our services</li>
              <li>Communicate with you</li>
              <li>Personalize your experience</li>
              <li>Ensure the security of our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">4. Information Sharing</h2>
            <p>
              We do not sell your personal information to third parties. We may share information 
              with trusted service providers who help us operate our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to the processing of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-white">6. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us 
              via email at: privacy@w3website.com
            </p>
          </section>
        </div>

        <div className="mt-8 text-sm text-gray-500 text-center">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy; 