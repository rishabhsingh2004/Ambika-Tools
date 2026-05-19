// src/lib/supabase.js
// Supabase client — used for Google OAuth authentication

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Returns null if env vars not configured (safe fallback)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ── Google OAuth ──────────────────────────────────────────
export const signInWithGoogle = async () => {
  if (!supabase) {
    console.warn('Supabase not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env');
    return { error: { message: 'Supabase not configured' } };
  }
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/admin/dashboard`,
    },
  });
  return { data, error };
};

// ── Sign out ──────────────────────────────────────────────
export const signOut = async () => {
  if (!supabase) return;
  await supabase.auth.signOut();
};

// ── Get current session ───────────────────────────────────
export const getSession = async () => {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data?.session ?? null;
};

// ── Get current user ──────────────────────────────────────
export const getCurrentUser = async () => {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
};
