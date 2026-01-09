'use client';

import { useState, FormEvent } from 'react';

interface ChatFormProps {
  onSendMessage: (content: string, model: string) => void;
}

export default function ChatForm({ onSendMessage }: ChatFormProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim(), 'gemma3');
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-black"
    >
      <div className="mx-auto flex max-w-4xl items-end gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Send
        </button>
      </div>
    </form>
  );
}

