import { OAuthResponse } from '@supabase/supabase-js';
import { ISupabaseUser } from './supabase-types';
import supabaseClient from './supabaseClient.ts';

async function getSessionUser(): Promise<ISupabaseUser | undefined> {
  const supabase = supabaseClient();
  const { data } = await supabase.auth.getSession();

  return data.session?.user || undefined;
}

async function signInWithKaKao(): Promise<OAuthResponse> {
  const supabase = supabaseClient();
  return await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: 'http://localhost:5173/auth/callback',
    },
  });
}

export { getSessionUser, signInWithKaKao };
