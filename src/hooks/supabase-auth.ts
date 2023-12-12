import { OAuthResponse } from '@supabase/supabase-js';
import { ISupabaseUser } from './supabase-types';
import useSupabaseClient from './useSupabaseClient';

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
      redirectTo: '/auth/callback',
    },
  });
}

export { getSessionUser, signInWithKaKao };
