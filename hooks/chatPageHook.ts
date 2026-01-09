import { useReducer } from 'react';
import { ResponseMessage, RoleTypes } from '@Types/letschat';

const SYSTEM_URL = process.env.NEXT_PUBLIC_SERVER;

export const ChatActionType = {
  AddMessage: 'ADD_MESSAGE',
  ClearChat: 'CLEAR_CHAT',
} as const;

export type ChatActionType = typeof ChatActionType[keyof typeof ChatActionType];

type ChatState = {
  chathistory: ResponseMessage[];
};

type ChatAction =
  | { type: typeof ChatActionType.AddMessage; payload: ResponseMessage }
  | { type: typeof ChatActionType.ClearChat };

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
    default:
      return state;
  }
}

export function chatPageHook() {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const sendMessage = async (content: string, model: string) => {
    const response = await fetch(`${SYSTEM_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        history: state.chathistory,
        model,
      }),
    });

    return response.json();
  }

  const handleSendMessage = async (content: string, model: string) => {
    const newMessage: ResponseMessage = {
      content,
      messageRole: RoleTypes.User,
      timestamp: new Date(),
    };
    
    dispatch({ type: ChatActionType.AddMessage, payload: newMessage });

    const systemResponse = await sendMessage(content, model);

    const assistantMessage: ResponseMessage = {
      content: systemResponse.content,
      messageRole: RoleTypes.Assistant,
      timestamp: new Date(systemResponse.timestamp),
    };

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

  return {
    chathistory: state.chathistory,
    handleSendMessage,
    handleAddSystemMessage,
    handleClearChat,
  };
}

