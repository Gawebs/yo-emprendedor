export type Database = {
  public: {
    Tables: {
      emprendedores: {
        Row: {
          id: string;
          nombre: string;
          nombre_tienda: string;
          email: string;
          telefono: string | null;
          ubicacion: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          emprendedor_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
};
