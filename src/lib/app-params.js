// Supabase configuration (replaces Base44 app params)
export const appParams = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '',
}
