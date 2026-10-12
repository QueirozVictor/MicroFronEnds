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

  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "cardapio",

        filename: "static/chunks/remoteEntry.js",

        exposes: {
          "./Cardapio": "./src/components/MicroCardapio",
          "./App": "./src/pages/_app.js",
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