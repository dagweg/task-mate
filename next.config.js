/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ["avatars.githubusercontent.com", "wallpapershome.com", 'i.imgur.com', 'flagcdn.com']
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
