/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export",
  distDir: "out",
  basePath: "/JokenP-",
  assetPrefix: "/JokenP-/",
}

export default nextConfig
