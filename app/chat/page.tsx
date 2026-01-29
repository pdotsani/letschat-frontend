'use client';

import { useState } from 'react';
import ChatNavbar from '@/components/ChatNavbar';
import ChatWindow from '@/components/ChatWindow';
import ChatForm from '@/components/ChatForm';
import { chatPageHook } from '@/hooks/chatPageHook';

export default function ChatPage() {
  const { 
    chathistory, 
    handleSendMessage, 
    handleClearChat, 
    getChats, 
    uploadChat,
    deleteChat, 
    chats 
  } = chatPageHook();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen flex-col bg-white dark:bg-black">
      <ChatNavbar onClearChat={handleClearChat} onToggleSidebar={toggleSidebar} />
      <ChatWindow
        messages={chathistory}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleCloseSidebar}
        getChats={getChats}
        uploadChat={uploadChat}
        deleteChat={deleteChat}
        chats={chats}
      />
      <ChatForm onSendMessage={handleSendMessage} />
    </div>
  );
}

