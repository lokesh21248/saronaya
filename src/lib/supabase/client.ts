import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fooshusrufgjbdrwzhti.supabase.co'
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_XmAHXagc764lrmDtMu23PQ_1AZRtjXi'
const supabaseServiceRole =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  supabaseAnonKey

// Client-side Supabase client (uses anon/publishable key - for RLS-protected queries)
export const supabase = createClient<any>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'saryonaya-web',
    },
  },
})

// Server-side Supabase client (uses service role key - for admin operations only)
export const supabaseAdmin = createClient<any>(supabaseUrl, supabaseServiceRole, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    headers: {
      'X-Client-Info': 'saryonaya-admin',
    },
  },
})

// Type guard for Supabase error handling
export function isSupabaseError(error: unknown): error is { status?: number; message: string } {
  return typeof (error as { status?: number })?.status === 'number'
}

export function handleSupabaseError(error: unknown, fallbackMessage = 'An unexpected error occurred'): string {
  if (isSupabaseError(error)) {
    const status = (error as { status?: number }).status
    if (status === 400 || status === 401 || status === 403) {
      return (error as { message: string }).message || fallbackMessage
    }
    if (status === 404) {
      return 'Resource not found.'
    }
    if (status === 409) {
      return 'A conflict occurred. Please try again.'
    }
    if (status === 429) {
      return 'Too many requests. Please wait a moment.'
    }
  }
  return fallbackMessage
}
