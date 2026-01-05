'use client';

import { Message as MessageType, Role } from '@/types/message';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === Role.User;

  return (
    <div
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} px-4 py-2`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser
            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black'
            : 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.message}
        </p>
        <span
          className={`mt-1 block text-xs ${
            isUser
              ? 'text-zinc-400 dark:text-zinc-600'
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}

