const NextFederationPlugin = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'micro-cardapio-frontend.vercel.app',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**'
      }
    ]
  },

  webpack(config, options) {
    const { isServer } = options;
    const local = process.env.LOCAL_MICROFRONTS === "true";

    const cardapioUrl = local
      ? "http://localhost:3001"
      : "https://micro-cardapio-frontend.vercel.app";

    const pedidoUrl = local
      ? "http://localhost:3002"
      : "https://micro-pedido-khaki.vercel.app";


    config.plugins.push(
      new NextFederationPlugin({
        name: "container",

        filename: "static/chunks/remoteEntry.js",

        remotes: {
          cardapio: `cardapio@${cardapioUrl}/_next/static/${
            isServer ? "ssr/" : "chunks/"
          }remoteEntry.js`,

          pedido: `pedido@${pedidoUrl}/_next/static/${
            isServer ? "ssr/" : "chunks/"
          }remoteEntry.js`,
        },

        shared: {},

        extraOptions: {
          exposePages: true,
          enableImageLoaderFix: true,
          enableUrlLoaderFix: true,
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;