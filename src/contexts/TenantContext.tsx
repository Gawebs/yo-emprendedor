'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/database.types';

type Emprendedor = Database['public']['Tables']['emprendedores']['Row'];

interface TenantContextType {
  emprendedorId: string | null;
  emprendedor: Emprendedor | null;
  loading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [emprendedorId, setEmprendedorId] = useState<string | null>(null);
  const [emprendedor, setEmprendedor] = useState<Emprendedor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function loadTenant() {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        // Get emprendedor linked to this user
        const { data: profile } = await supabase
          .from('profiles')
          .select('emprendedor_id')
          .eq('id', user.id)
          .single();

        if (!profile?.emprendedor_id) {
          setLoading(false);
          return;
        }

        setEmprendedorId(profile.emprendedor_id);

        // Get emprendedor details
        const { data: emp, error: empError } = await supabase
          .from('emprendedores')
          .select('*')
          .eq('id', profile.emprendedor_id)
          .single();

        if (empError) throw empError;
        setEmprendedor(emp);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading tenant');
      } finally {
        setLoading(false);
      }
    }

    loadTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ emprendedorId, emprendedor, loading, error }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
}
