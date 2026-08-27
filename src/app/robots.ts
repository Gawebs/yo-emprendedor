import type { MetadataRoute } from 'next';
import { SITIO_INDEXABLE, SITIO_URL } from '@/constants/sitio';

/**
 * Mientras la tienda sea una maqueta —productos inventados, fotos que son
 * rectangulos grises, checkout que no cobra— Google no tiene que verla. Si la
 * indexa ahora, eso es lo que aparece cuando alguien busca "Yo Emprendedor
 * Tucuman", y sacarlo despues lleva semanas.
 *
 * El dia del lanzamiento se pone SITIO_INDEXABLE en true y listo.
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITIO_INDEXABLE) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // El panel y el checkout no aportan nada en un buscador.
      { userAgent: '*', disallow: ['/dashboard/', '/checkout', '/carrito', '/auth/'] },
    ],
    sitemap: `${SITIO_URL}/sitemap.xml`,
  };
}
