'use server';

import { createClient } from '@/lib/supabase/server';
import { CreateProductoInput, UpdateProductoInput, ProductoResult } from '@/types/productos';

export async function crearProducto(input: CreateProductoInput): Promise<ProductoResult> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autenticado' };
    }

    // Validación básica
    if (!input.nombre || !input.categoria_id || input.precio_original <= 0) {
      return { error: 'Campos requeridos inválidos' };
    }

    // Obtener emprendedor_id del usuario
    const { data: profile } = await supabase
      .from('profiles')
      .select('emprendedor_id')
      .eq('id', user.id)
      .single();

    if (!profile?.emprendedor_id) {
      return { error: 'Usuario no vinculado a emprendedor' };
    }

    // Insertar producto
    const { error } = await supabase
      .from('productos')
      .insert({
        emprendedor_id: profile.emprendedor_id,
        nombre: input.nombre,
        categoria_id: input.categoria_id,
        precio_original: input.precio_original,
        precio_oferta: input.precio_oferta,
        stock: input.stock,
        descripcion: input.descripcion,
        foto_urls: input.foto_urls || [],
      });

    if (error) {
      return { error: error.message };
    }

    return { data: { success: true } };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Error desconocido' };
  }
}

export async function actualizarProducto(input: UpdateProductoInput): Promise<ProductoResult> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autenticado' };
    }

    // Validación básica
    if (!input.id || !input.nombre || !input.categoria_id || input.precio_original <= 0) {
      return { error: 'Campos requeridos inválidos' };
    }

    // RLS protege que solo el emprendedor dueño pueda editar
    const { error } = await supabase
      .from('productos')
      .update({
        nombre: input.nombre,
        categoria_id: input.categoria_id,
        precio_original: input.precio_original,
        precio_oferta: input.precio_oferta,
        stock: input.stock,
        descripcion: input.descripcion,
        foto_urls: input.foto_urls || [],
      })
      .eq('id', input.id);

    if (error) {
      return { error: error.message };
    }

    return { data: { success: true } };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Error desconocido' };
  }
}

export async function eliminarProducto(id: string): Promise<ProductoResult> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: 'No autenticado' };
    }

    // RLS protege que solo el emprendedor dueño pueda eliminar
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    return { data: { success: true } };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Error desconocido' };
  }
}
