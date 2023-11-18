import { createClient } from '@supabase/supabase-js';

export const useSupabase = (() => {
  let client: ReturnType<typeof createClient>;
  return () => {
    if (!client) {
      client = createClient(
        'https://qowwpxzpvlwbocollgve.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvd3dweHpwdmx3Ym9jb2xsZ3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNDk0NTcsImV4cCI6MjAxNDkyNTQ1N30.z6rsbVWJKumNP4XSk7C4MOrcbEEQv2LNvSbGu7-Lr9Q'
      );
    }

    return client;
  };
})();
