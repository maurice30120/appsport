/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "default",
    domains: ["localhost"],
  },
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
})

// module.exports = { nextConfig, withMDX }

const plugins=[withMDX]
// next.config.js
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([...plugins], nextConfig);