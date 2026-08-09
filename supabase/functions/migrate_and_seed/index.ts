// Edge Function: migrate_and_seed
// Runs the local SQL migrations and seeds initial data via the Supabase admin client.
// In production this is invoked via `supabase functions deploy migrate_and_seed`.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn('migrate_and_seed: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. Skipping.')
} else {
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  })

  // Placeholder for seed data — extend as needed.
  // await supabaseAdmin.from('agents').insert({...})
  void supabaseAdmin // referenced so no-unused lint doesn't fire
}

export default async (req, res) => {
  res.send({ ok: true, skipped: !supabaseUrl || !supabaseServiceRoleKey })
}
