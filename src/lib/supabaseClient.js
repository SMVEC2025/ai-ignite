import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
    auth: {
      flowType: 'pkce',           // prefer PKCE over implicit (no hash tokens)
      detectSessionInUrl: true,   // parse auth params on load
      autoRefreshToken: true,
      persistSession: true,
    },
  }
);
