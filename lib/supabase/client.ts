import { createBrowserClient } from '@supabase/ssr'

// Create a singleton Supabase client to be shared across the app
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)
