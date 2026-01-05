import { useReducer } from 'react';
import { Message, Role } from '@/types/message';

export const ChatActionType = {
  AddMessage: 'ADD_MESSAGE',
  ClearChat: 'CLEAR_CHAT',
} as const;

export type ChatActionType = typeof ChatActionType[keyof typeof ChatActionType];

type ChatState = {
  chathistory: Message[];
};

type ChatAction =
  | { type: typeof ChatActionType.AddMessage; payload: Message }
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

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      message,
      role: Role.User,
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
    handleClearChat,
  };
}

