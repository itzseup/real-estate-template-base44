import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Only create a real Supabase client if properly configured
// Fallback to a mock client that returns empty data to prevent crashes
let supabase

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Mock client for development without Supabase
  const mockResponse = { data: null, error: null }
  const mockQuery = {
    select: () => mockQuery,
    order: () => mockQuery,
    limit: () => Promise.resolve({ data: [], error: null }),
    eq: () => mockQuery,
    single: () => Promise.resolve({ data: null, error: null }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ error: null }),
    count: () => Promise.resolve({ count: 0, error: null }),
    head: true,
  }
  
  supabase = {
    from: () => mockQuery,
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({ error: null }),
      signUp: async () => ({ error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  }
}

export { supabase }
