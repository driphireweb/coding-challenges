/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize production builds
  reactStrictMode: true,
  swcMinify: true,
  
  // Add explicit SWC configuration
  compiler: {
    // You can add specific SWC options here if needed
    styledComponents: false, // enable if you're using styled-components
  },
  
  // Improve production performance
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    domains: [], // Add any external image domains you need
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  
  // Bundle analyzer if needed
  ...(process.env.ANALYZE === 'true' && {
    webpack(config) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      )
      return config
    },
  }),

  // Environment configuration
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },

  // Redirects if needed
  async redirects() {
    return [
      // Add your redirects here
    ]
  },

  // Rewrites for API proxying if needed
  async rewrites() {
    return [
      // Add your rewrites here
    ]
  },

  // Update deprecated turbo config
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    turbo: {
      rules: {
        '*.svg': ['@svgr/webpack'], // Updated from loaders to rules
      },
    },
  },
};

export default nextConfig;
