const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    devIndicators: {
        autoPrerender: false,
    },
    webpack: (config) => {
        config.watchOptions = {
            poll: 1000, // Check for changes every second
        };
        return config;
    }
}

module.exports = nextConfig
