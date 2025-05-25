/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/JokenP-',
  assetPrefix: '/JokenP-/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig 