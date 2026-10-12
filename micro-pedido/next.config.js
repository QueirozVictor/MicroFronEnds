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
  
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "pedido",

        filename: "static/chunks/remoteEntry.js",

        exposes: {
          "./Pedido": "./src/components/MicroPedido",
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