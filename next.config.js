/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            }
          ]
    },
    eslint: {
      ignoreDuringBuilds: true
    },
    typescript: {
      ignoreBuildErrors: true
    },
    output: 'standalone'
}

module.exports = nextConfig