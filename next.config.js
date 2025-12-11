/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for Netlify
  distDir: 'out', // Output directory
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable server-side features for static export
  reactStrictMode: true,
}

export default nextConfig

