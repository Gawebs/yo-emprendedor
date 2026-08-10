export interface CreateProductoInput {
  nombre: string;
  categoria_id: string;
  precio_original: number;
  precio_oferta?: number;
  stock: number;
  descripcion?: string;
  foto_urls?: string[];
}

export interface UpdateProductoInput extends CreateProductoInput {
  id: string;
}

export interface ProductoResult {
  data?: any;
  error?: string;
}
