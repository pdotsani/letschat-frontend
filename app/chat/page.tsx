'use client';

import ChatNavbar from '@/components/ChatNavbar';
import ChatWindow from '@/components/ChatWindow';
import ChatForm from '@/components/ChatForm';
import { chatPageHook } from '@/hooks/chatPageHook';

export default function ChatPage() {
  const { chathistory, handleSendMessage, handleClearChat } = chatPageHook();

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-black">
      <ChatNavbar onClearChat={handleClearChat} />
      <ChatWindow messages={chathistory} />
      <ChatForm onSendMessage={handleSendMessage} />
    </div>
  );
}

