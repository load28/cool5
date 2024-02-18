import { OAuthResponse } from '@supabase/supabase-js';
import { ISupabaseUser } from './supabase-types.ts';
import useSupabaseClient from './useSupabaseClient.ts';

async function getSessionUser(): Promise<ISupabaseUser | undefined> {
  const supabase = useSupabaseClient();
  const { data } = await supabase.auth.getSession();

  return data.session?.user || undefined;
}

async function signInWithKaKao(): Promise<OAuthResponse> {
  const supabase = useSupabaseClient();
  return await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: 'http://localhost:5173/auth/callback',
    },
  });
}

export { getSessionUser, signInWithKaKao };
