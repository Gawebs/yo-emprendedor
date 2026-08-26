// Constantes de contacto — definidas una sola vez, pasadas por props a componentes
export const CONTACTO = {
  nombre: 'Yo Emprendedor',
  direccion: '24 de Septiembre 734, San Miguel de Tucumán',
  email: 'info@yoemprendedortienda.com',
  telefono: '+54 381 214-6172',
  whatsapp: '+5438121461172', // Sin espacios ni caracteres especiales para URL
  instagram: 'https://instagram.com', // TODO: actualizar
  ubicacion_google: 'https://maps.google.com', // TODO: actualizar
};

// URLs de referencias
export const URLS = {
  loginUrl: '/auth/login',
  signupUrl: '/auth/signup',
  catalogoUrl: '/productos',
  dashboardUrl: '/dashboard',
  whatsappLink: `https://wa.me/${CONTACTO.whatsapp}?text=Hola, quiero vender en Yo Emprendedor`,
  emailLink: `mailto:${CONTACTO.email}`,
  telefonoLink: `tel:${CONTACTO.telefono}`,
};
