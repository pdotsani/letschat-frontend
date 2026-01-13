'use client';

import { supabase } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ChatNavbarProps {
  onClearChat: () => void;
}

export default function ChatNavbar({ onClearChat }: ChatNavbarProps) {
  const [avatar, setAvatar] = useState<string | null>(null);

  const getAvatarUrl = async () => {
    const { data: { session: { user } } } = await supabase.auth.getSession();
    return user?.user_metadata?.avatar_url;
  };

  useEffect(() => {
    getAvatarUrl().then((avatarUrl) => {
      setAvatar(avatarUrl);
    });
  }, []);

  const handleLogout = async() => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error logging out:', error);
    }

    redirect('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-end h-16 items-center border-b border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-black">
      <button
        onClick={onClearChat}
        className="flex items-center justify-center rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        aria-label="Clear chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 8.25v6.75m0 0l-3-3m3 3l3-3M3.375 21V4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v16.125c0 .621-.504 1.125-1.125 1.125h-4.5c-.621 0-1.125-.504-1.125-1.125z"
          />
        </svg>
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        aria-label="Logout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </button>
      {avatar && <div className="flex items-center justify-center">
        <img src={avatar} alt="avatar" className="rounded-full w-6 h-6" />
      </div>}
    </nav>
  );
}

