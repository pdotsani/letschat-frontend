import { useReducer } from 'react';
import { Message, Role } from '@/types/message';

type ChatState = {
  chathistory: Message[];
};

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'CLEAR_CHAT' };

const initialState: ChatState = {
  chathistory: [],
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        chathistory: [...state.chathistory, action.payload],
      };
    case 'CLEAR_CHAT':
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
    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
  };

  const handleClearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  return {
    chathistory: state.chathistory,
    handleSendMessage,
    handleClearChat,
  };
}

