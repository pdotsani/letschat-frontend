'use client';

import Image from 'next/image';

interface ChatNavbarProps {
  onClearChat: () => void;
}

export default function ChatNavbar({ onClearChat }: ChatNavbarProps) {
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
      <div className="h-8 w-8 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <Image
          src="/next.svg"
          alt="Avatar"
          width={32}
          height={32}
          className="h-full w-full object-cover dark:invert"
        />
      </div>
    </nav>
  );
}

