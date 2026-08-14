/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  /**
   * La tienda paso a la raiz y la landing de planes a /quiero-vender.
   * Estas rutas ya circularon (el link de Vercel se compartio), asi que se
   * redirigen en vez de devolver 404. Permanentes: la estructura nueva es la
   * definitiva, no una prueba.
   */
  async redirects() {
    return [
      { source: '/tienda', destination: '/', permanent: true },
      { source: '/tienda/:path*', destination: '/:path*', permanent: true },
      { source: '/productos', destination: '/', permanent: true },
      { source: '/productos/:id', destination: '/producto/:id', permanent: true },
    ];
  },
};

module.exports = nextConfig;
