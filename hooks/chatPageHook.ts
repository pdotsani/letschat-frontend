import { useReducer } from 'react';
import { ResponseMessage, RoleTypes } from 'letschat-types';
import { supabase } from '@/lib/supabase/client';

const SYSTEM_URL = process.env.NEXT_PUBLIC_SERVER;

export const ChatActionType = {
  AddMessage: 'ADD_MESSAGE',
  ClearChat: 'CLEAR_CHAT',
  RemoveLastMessage: 'REMOVE_LAST_MESSAGE',
} as const;

export type ChatActionType = typeof ChatActionType[keyof typeof ChatActionType];

type ChatState = {
  chathistory: ResponseMessage[];
};

type ChatAction =
  | { type: typeof ChatActionType.AddMessage; payload: ResponseMessage }
  | { type: typeof ChatActionType.ClearChat }
  | { type: typeof ChatActionType.RemoveLastMessage };

const initialState: ChatState = {
  chathistory: [],
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case ChatActionType.AddMessage:
      return {
        ...state,
        chathistory: [...state.chathistory, action.payload],
      };
    case ChatActionType.ClearChat:
      return {
        ...state,
        chathistory: [],
      };
    case ChatActionType.RemoveLastMessage:
      return {
        ...state,
        chathistory: state.chathistory.slice(0, -1),
      };
    default:
      return state;
  }
}

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

    dispatch({ type: ChatActionType.RemoveLastMessage });

    dispatch({ type: ChatActionType.AddMessage, payload: assistantMessage });
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

  const removeLastMessage = () => {
    dispatch({ type: ChatActionType.RemoveLastMessage });
  };

  return {
    chathistory: state.chathistory,
    handleSendMessage,
    handleAddSystemMessage,
    handleClearChat,
  };
}

