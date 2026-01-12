'use client';

import { supabase } from '@/lib/supabase/client'

export default function LoginButton() {
  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
  );
}