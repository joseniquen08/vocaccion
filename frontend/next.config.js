/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'platform-lookaside.fbsbx.com',
      'res.cloudinary.com'
    ],
  }
};
