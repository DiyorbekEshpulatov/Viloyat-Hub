// frontend/src/pages/MentorPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import { MessageBubble } from '../components/Mentor/MessageBubble';
import { TypingIndicator } from '../components/Mentor/TypingIndicator';
import { SuggestedQuestions } from '../components/Mentor/SuggestedQuestions';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const MentorPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { data: chatHistory } = useQuery({
    queryKey: ['chat-history'],
    queryFn: () => api.getChatHistory(),
  });
  
  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => api.sendMessage(content),
    onSuccess: (response) => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: response.id,
        content: response.content,
        role: 'assistant',
        timestamp: new Date(),
      }]);
    },
    onError: () => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: "Kechirasiz, hozir javob bera olmayman. Iltimos, keyinroq urinib ko'ring.",
        role: 'assistant',
        timestamp: new Date(),
      }]);
    }
  });
  
  useEffect(() => {
    if (chatHistory) {
      setMessages(chatHistory);
    }
  }, [chatHistory]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    sendMessageMutation.mutate(inputValue);
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSend(), 100);
  };
  
  return (
    <div className="mentor-page flex flex-col h-screen max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-green-600 text-xl">🤖</span>
          </div>
          <div>
            <h1 className="font-semibold">AI Mentor</h1>
            <p className="text-sm text-green-100">24/7 onlayn</p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Assalomu alaykum!
            </h2>
            <p className="text-gray-500 mb-8">
              Men ViloyatHub AI Mentori. Sizga tadbirkorlik masalalarida yordam beraman.
            </p>
            <SuggestedQuestions onSelect={handleSuggestedQuestion} />
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Savolingizni yozing..."
            className="flex-1 border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="bg-green-600 text-white px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Yuborish
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          ViloyatHub AI Mentor sizga 24/7 yordam beradi
        </p>
      </div>
    </div>
  );
};