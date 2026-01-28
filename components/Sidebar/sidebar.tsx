'use client';

import { chatPageHook } from '@/hooks/chatPageHook';
import { useEffect } from 'react';

interface SidebarProps {
  onCloseSidebar: () => void;
}

export default function Sidebar({ onCloseSidebar }: SidebarProps) {
  const { getChats, chats } = chatPageHook();

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="sticky top-0 z-1000 w-full lg:w-1/4 h-full flex flex-col bg-black border-b border-zinc-200 px-4 dark:border-zinc-800 dark:bg-black">
          <div className="flex justify-end pt-4">
            <button
              onClick={onCloseSidebar}
              className="flex items-center justify-center rounded-lg p-2 cursor-pointer text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
              aria-label="Close sidebar"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {
            chats.map((chat, index) => (
              <div key={index}>
                {chat.name}
              </div>
            ))
          }
        </div>    
  );
}