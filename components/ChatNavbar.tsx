'use client';

import Image from "next/image";
import { supabase } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ChatNavbarProps {
  onClearChat: () => void;
}

export default function ChatNavbar({ onClearChat }: ChatNavbarProps) {
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
        <Image src="/file.svg" alt="New chat" width={24} height={24} />
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

