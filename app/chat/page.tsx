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
    updateChatName,
    chatName,
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
      <ChatNavbar onClearChat={handleClearChat} onToggleSidebar={toggleSidebar} chatName={chatName} />
      <ChatWindow
        messages={chathistory}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleCloseSidebar}
        getChats={getChats}
        uploadChat={uploadChat}
        deleteChat={deleteChat}
        updateChatName={updateChatName}
        chats={chats}
      />
      <ChatForm onSendMessage={handleSendMessage} />
    </div>
  );
}

