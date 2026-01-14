'use client';

import { useEffect, useRef } from 'react';
import { ResponseMessage } from 'letschat-types';
import MessageComponent from './Message/Message';

interface ChatWindowProps {
  messages: ResponseMessage[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto pt-16 pb-24">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-zinc-500 dark:text-zinc-400">
            Start a conversation by sending a message
          </p>
        </div>
      ) : (
        <div className="flex flex-col py-4">
          {messages.map((message, index) => (
            <MessageComponent key={`${message.timestamp.getTime()}-${index}`} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}

