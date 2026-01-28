'use client';

import { supabase } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ChatNavbarProps {
  onClearChat: () => void;
  onToggleSidebar: () => void;
}

export default function ChatNavbar({ onClearChat, onToggleSidebar }: ChatNavbarProps) {
  const [avatar, setAvatar] = useState<string | null>(null);

  const getAvatarUrl = async () => {
    const { data: { user } } = await supabase.auth.getUser();
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
        className="flex items-center justify-center rounded-lg p-2 cursor-pointer text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        aria-label="Clear chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </button>
      <button
        onClick={onToggleSidebar}
        className="flex items-center justify-center rounded-lg p-2 cursor-pointer text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        aria-label="Toggle chat sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          />
        </svg>
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center rounded-lg p-2 cursor-pointer text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
        aria-label="Logout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </button>
      {avatar && <div className="flex items-center justify-center pl-2">
        <img src={avatar} alt="avatar" className="rounded-full w-6 h-6" />
      </div>}
    </nav>
  );
}

