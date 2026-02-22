import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _admin: SupabaseClient | null = null;

/** Lazy-initialized admin client so build (e.g. Vercel) doesn't require env vars at load time. */
export function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("supabaseUrl and SUPABASE_SERVICE_ROLE_KEY are required.");
    }
    _admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return _admin;
}
