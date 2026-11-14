import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fooshusrufgjbdrwzhti.supabase.co'
const supabaseServiceRole =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_XmAHXagc764lrmDtMu23PQ_1AZRtjXi'

export const supabaseAdmin = createClient<any>(supabaseUrl, supabaseServiceRole, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    headers: {
      'X-Client-Info': 'saryonaya-admin',
      apikey: supabaseServiceRole,
    },
  },
})

export function getSupabaseServerClient() {
  return supabaseAdmin
}
