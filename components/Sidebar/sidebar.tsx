'use client';

import { Chat } from '@/hooks/chatPageHook';
import { useEffect } from 'react';

interface SidebarProps {
  onCloseSidebar: () => void;
  getChats: () => Promise<void>;
  uploadChat: (chatId: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
  chats: Chat[];
}

export default function Sidebar({ onCloseSidebar, getChats, uploadChat, deleteChat, chats }: SidebarProps) {

  useEffect(() => {
    getChats();
  }, []);

  const handleDeleteChat = (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the parent click handler
    deleteChat(chatId);
  };

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
              <div key={index} className="group cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-between" onClick={() => uploadChat(chat.id)}>
                <span>{chat.name}</span>
                <button
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                  className="opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg p-1.5 cursor-pointer text-red-600 transition-all hover:bg-red-100 dark:text-red-500 dark:hover:bg-red-950/30"
                  aria-label="Delete chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))
          }
        </div>    
  );
}