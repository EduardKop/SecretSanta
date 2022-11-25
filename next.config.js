/** @type {import('next').NextConfig} */

const nextConfig  = {
  reactStrictMode: true,
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false,  path: true    };

  //   return config;
  // },
  // webpack: (config, { isServer }) => {
  //   // Fixes npm packages that depend on `fs` module
  //   if (!isServer) {
  //     config.node = {
  //       fs: "empty"
  //     };
  //   }
  //   return config;
  // },
};

module.exports = nextConfig

