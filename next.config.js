const path = require('path')

const TOPFLIGHT_URL = process.env.NEXT_PUBLIC_TOPFLIGHT_URL || 'https://topflight.onrender.com'

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: `${TOPFLIGHT_URL}/:path*`,
            },
            {
                source: '/graphql',
                destination: `${TOPFLIGHT_URL}/graphql`,
            }
        ]
    },
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
            poll: 5000, // Check for changes every 5 second
        };
        return config;
    }
}

module.exports = nextConfig
