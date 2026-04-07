import React, { useState, useRef, useEffect } from 'react';
import ApiClient from '../services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: input.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await ApiClient.post('/api/chatbot/message', {
        message: userMsg.content,
        conversationId,
      });

      const data = res.data;
      if (data.conversationId) setConversationId(data.conversationId);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply || data.response || 'I couldn\'t generate a response.',
        timestamp: new Date(),
      }]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    'What career suits my interests?',
    'How to become a software developer?',
    'What skills are in demand?',
    'Compare data science vs web development',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider">AI Career Advisor</h1>
        <p className="text-gray-500 text-sm mt-1">Ask anything about careers, skills, and your future</p>
      </div>

      {/* Messages area */}
      <div className="flex-grow overflow-y-auto space-y-4 pb-4 pr-2 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className="text-center">
              <span className="text-6xl block mb-4">🤖</span>
              <h2 className="text-white font-bold text-lg mb-2">Career Soulmate AI</h2>
              <p className="text-gray-400 text-sm max-w-sm">
                I can help you explore careers, understand skill requirements, and plan your career path.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
              {suggestedQuestions.map((q) => (
                <button key={q} onClick={() => { setInput(q); }}
                  className="text-left px-4 py-3 bg-[#0a0a0a] border border-white/5 rounded-xl text-gray-400 text-xs hover:text-white hover:border-white/10 transition-all">
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-[#0a0a0a] border border-white/5 text-gray-300 rounded-bl-md'
              }`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                <p className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-blue-200/50' : 'text-gray-600'}`}>
                  {msg.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl rounded-bl-md px-5 py-4">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-3 flex items-end gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about careers, skills, or your career path..."
          rows={1}
          className="flex-grow bg-transparent text-white text-sm placeholder:text-gray-600 outline-none resize-none max-h-32"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shrink-0"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
