import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * ADMIN CLIENT — service role key
 * ⚠️ ONLY for cron jobs, webhooks, and system tasks
 * ⚠️ NEVER import this in src/app or use from client components
 * ⚠️ ONLY in: src/app/api/cron/*, webhooks, scripts
 */
export const adminClient = createClient(supabaseUrl, supabaseServiceRole, {
  auth: {
    persistSession: false,
  },
});
