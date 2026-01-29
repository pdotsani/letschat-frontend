'use client';

import { useEffect, useRef } from 'react';
import { ResponseMessage } from 'letschat-types';
import MessageComponent from './Message/Message';
import Sidebar from './Sidebar/sidebar';
import { Chat } from '@/hooks/chatPageHook';

interface ChatWindowProps {
  messages: ResponseMessage[];
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
  getChats: () => Promise<void>;
  uploadChat: (chatId: string) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
  updateChatName: (name: string) => void;
  chats: Chat[];
}

export default function ChatWindow({ 
  messages, 
  isSidebarOpen, 
  onCloseSidebar,
  getChats, 
  uploadChat, 
  deleteChat,
  updateChatName,
  chats 
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-row h-full w-full overflow-y-auto">
      {isSidebarOpen && (
        <Sidebar
          onCloseSidebar={onCloseSidebar}
          getChats={getChats}
          uploadChat={uploadChat}
          deleteChat={deleteChat}
          updateChatName={updateChatName}
          chats={chats}
        />
      )}
      <div className="flex-1 flex-col overflow-y-auto pt-16 pb-24">
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
    </div>
  );
}

