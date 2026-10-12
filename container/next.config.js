const NextFederationPlugin = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
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

    config.plugins.push(
      new NextFederationPlugin({
        name: "container",

        filename: "static/chunks/remoteEntry.js",

        remotes: {
          cardapio: `cardapio@http://localhost:3001/_next/static/${
            isServer ? "ssr/" : "chunks/"
          }remoteEntry.js`,

          pedido: `pedido@http://localhost:3002/_next/static/${
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