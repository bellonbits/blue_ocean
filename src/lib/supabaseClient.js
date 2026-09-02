import { createClient } from '@supabase/supabase-js';

// Last-resort fallback path when the FastAPI backend itself is
// unreachable (not just its database — see backend/app/db/session.py
// for that case) — the frontend queries Supabase's REST API directly
// for read-only content. Null when not configured, so every call site
// must check before using this and the app behaves identically whether
// or not the fallback is set up.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = (SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  : null;
