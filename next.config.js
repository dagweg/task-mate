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
    }
}

module.exports = nextConfig
