import React, { useEffect } from 'react';

interface ExternalRedirectProps {
  to: string;
}

const ExternalRedirect: React.FC<ExternalRedirectProps> = ({ to }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-space-dark bg-opacity-70 p-8 rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="mb-6">
          You are being redirected to our blog. If you are not redirected automatically, please click the link below:
        </p>
        <a 
          href={to}
          className="text-[#00FFE1] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {to}
        </a>
      </div>
    </div>
  );
};

export default ExternalRedirect; 