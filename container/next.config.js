const NextFederationPlugin = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'micro-fron-ends.vercel.app/',
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
          cardapio: `cardapio@https://micro-fron-ends.vercel.app/_next/static/${
            isServer ? "ssr/" : "chunks/"
          }remoteEntry.js`,

          pedido: `pedido@https://micro-pedido-khaki.vercel.app/_next/static/${
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