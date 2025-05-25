/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      unoptimized: true,
    },
    // Para repositório de organização, ajuste o nome do repositório aqui
    basePath: "/jokenpo",
    assetPrefix: "/jokenpo/",
  }
  
module.exports = nextConfig