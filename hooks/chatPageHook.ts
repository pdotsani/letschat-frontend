import { useReducer } from 'react';
import { ResponseMessage, RoleTypes } from 'letschat-types';
import { supabase } from '@/lib/supabase/client';
import { time } from 'console';

const SYSTEM_URL = process.env.NEXT_PUBLIC_SERVER;

export const ChatActionType = {
  AddMessage: 'ADD_MESSAGE',
  UploadChat: 'UPLOAD_CHAT',
  ClearChat: 'CLEAR_CHAT',
  RemoveLastMessage: 'REMOVE_LAST_MESSAGE',
  UpdateChats: 'UPDATE_CHATS',
  ClearChats: 'CLEAR_CHATS',
  UpdateChatId: 'UPDATE_CHAT_ID',
  UpdateChatName: 'UPDATE_CHAT_NAME',
} as const;

export type ChatActionType = typeof ChatActionType[keyof typeof ChatActionType];

export interface Chat {
  id: string;
  name: string;
  updatedAt: Date;
}

type ChatState = {
  chathistory: ResponseMessage[];
  chats: Chat[];
  chatId: string | null;
  chatName: string | null;
};

type ChatAction =
  | { type: typeof ChatActionType.UploadChat; payload: ResponseMessage[] }
  | { type: typeof ChatActionType.AddMessage; payload: ResponseMessage }
  | { type: typeof ChatActionType.ClearChat }
  | { type: typeof ChatActionType.RemoveLastMessage }
  | { type: typeof ChatActionType.UpdateChats; payload: Chat[] }
  | { type: typeof ChatActionType.ClearChats; }
  | { type: typeof ChatActionType.UpdateChatId; payload: string }
  | { type: typeof ChatActionType.UpdateChatName; payload: string };

const initialState: ChatState = {
  chathistory: [],
  chats: [],
  chatId: null,
  chatName: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case ChatActionType.UpdateChatName:
      return {
        ...state,
        chatName: action.payload,
      };
    case ChatActionType.UpdateChatId:
      return {
        ...state,
        chatId: action.payload,
      };
    case ChatActionType.UploadChat:
      return {
        ...state,
        chathistory: [...action.payload],
      };
    case ChatActionType.AddMessage:
      return {
        ...state,
        chathistory: [...state.chathistory, action.payload],
      };
    case ChatActionType.ClearChat:
      return {
        ...state,
        chathistory: [],
        chatId: null,
        chatName: null,
      };
    case ChatActionType.RemoveLastMessage:
      return {
        ...state,
        chathistory: state.chathistory.slice(0, -1),
      };
    case ChatActionType.UpdateChats:
      return {
        ...state,
        chats: action.payload,
      };
    case ChatActionType.ClearChats:
      return {
        ...state,
        chats: [],
      };
    default:
      return state;
  }
}

/**
 * chaPageHook
 * 
 * This hook manages chat data and functionality. A reducer is used to manage the state of the chat.
 * 
 * @returns chathistory, handleSendMessage, handleAddSystemMessage, handleClearChat
 */
export function chatPageHook() {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const sendMessage = async (content: string, model: string) => {
    try {
      // Get the auth token from the session to access the server
      const { data: { session } } = await supabase.auth.getSession();
      const authToken = session?.access_token;
  
      const response = await fetch(`${SYSTEM_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          content,
          history: state.chathistory,
          model,
          chatId: state.chatId,
        }),
      })
  
      return response.json();

    } catch (error) {
      console.error('Error sending message:', error);
      return { error: 'Error sending message' };
    }
  }

  const handleSendMessage = async (content: string, model: string) => {
    const newMessage: ResponseMessage = {
      content,
      messageRole: RoleTypes.User,
      timestamp: new Date(),
    };

    const thinkingMessage: ResponseMessage = {
      content: 'thinking...',
      messageRole: RoleTypes.Assistant,
      timestamp: new Date(),
    }
    
    dispatch({ type: ChatActionType.AddMessage, payload: newMessage });

    dispatch({ type: ChatActionType.AddMessage, payload: thinkingMessage })

    const systemResponse = await sendMessage(content, model);

    const assistantMessage: ResponseMessage = {
      content: systemResponse.content ? 
        systemResponse.content : 
        'Error sending message or no content available',
      messageRole: RoleTypes.Assistant,
      timestamp: systemResponse.timestamp
        ? new Date(systemResponse.timestamp)
        : new Date(),
    };

    const chat = await getChat(systemResponse.chatId);

    dispatch({ type: ChatActionType.RemoveLastMessage });

    dispatch({ type: ChatActionType.AddMessage, payload: assistantMessage });

    if (state.chatId == null) {
      dispatch({ type: ChatActionType.UpdateChatId, payload: systemResponse.chatId });
      dispatch({ type: ChatActionType.UpdateChatName, payload: chat[0].name });
    }
  };

  const handleAddSystemMessage = (message: string) => {
    const newMessage: ResponseMessage = {
      content: message,
      messageRole: RoleTypes.System,
      timestamp: new Date(),
    };
    dispatch({ type: ChatActionType.AddMessage, payload: newMessage });
  };

  const handleClearChat = () => {
    dispatch({ type: ChatActionType.ClearChat });
  };

  const getChats = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const authToken = session?.access_token;

    const response = await fetch(`${SYSTEM_URL}/api/chats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })

    const chats: Chat[] = await response.json();

    dispatch({ type: ChatActionType.UpdateChats, payload: chats });
  };

  const uploadChat = async (chatId: string)  => {
    const { data: { session } } = await supabase.auth.getSession();
    const authToken = session?.access_token;

    const response = await fetch(`${SYSTEM_URL}/api/chat/${chatId}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })

    const data = await response.json();

    const chathistory: ResponseMessage[] = data.messages.map((message: any) => {
      return {
        content: message.content,
        messageRole: message.messageRole,
        timestamp: new Date(message.timestamp),
      };
    });

    dispatch({ type: ChatActionType.UpdateChatId, payload: data.chatId });
    dispatch({ type: ChatActionType.UploadChat, payload: chathistory });
  };

  const deleteChat = async (chatId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    const authToken = session?.access_token;
    
    const response = await fetch(`${SYSTEM_URL}/api/chat/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })

    getChats();
    
    return response.json();
  }

  const getChat = async (chatId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    const authToken = session?.access_token;

    const response = await fetch(`${SYSTEM_URL}/api/chat/${chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    return data;
  };

  const updateChatName = async (name: string) => {
    dispatch({ type: ChatActionType.UpdateChatName, payload: name });
  }

  return {
    chathistory: state.chathistory,
    chats: state.chats,
    chatName: state.chatName,
    handleSendMessage,
    handleAddSystemMessage,
    handleClearChat,
    getChats,
    uploadChat,
    deleteChat,
    updateChatName
  };
}

