// frontend/src/components/Mentor/MessageBubble.tsx
import React from 'react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: {
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  };
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
          <span className="text-green-600 text-sm">🤖</span>
        </div>
      )}
      
      <div className={`max-w-[70%] ${isUser ? 'order-1' : 'order-2'}`}>
        <div className={`
          rounded-2xl px-4 py-2
          ${isUser 
            ? 'bg-green-600 text-white rounded-br-none' 
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
          }
        `}>
          <ReactMarkdown className="prose prose-sm max-w-none">
            {message.content}
          </ReactMarkdown>
        </div>
        <div className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {format(message.timestamp, 'HH:mm')}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0">
          <span className="text-gray-600 text-sm">👤</span>
        </div>
      )}
    </div>
  );
};