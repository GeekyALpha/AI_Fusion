import React, { useState } from 'react';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { generateAIAnalysis } from '../utils/gptApi';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      type: 'user' as const,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let response;
      if (input.toLowerCase().includes('generate insights')) {
        const mockData = {
          timestamp: new Date().toISOString(),
          location: 'Various city sectors',
        };

        const prompt = `
          Generate random but realistic insights about waste management. Include:
          1. Current pollution levels in different areas
          2. Waste collection efficiency metrics
          3. Resource utilization statistics
          4. Recommendations for improvement
          Make it detailed but concise, using bullet points where appropriate.
        `;

        response = await generateAIAnalysis(mockData, prompt);
      } else {
        response = "I'm your waste management assistant. You can ask me to 'generate insights' for an analysis of the current situation.";
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        type: 'bot' as const,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        type: 'bot' as const,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="h-6 w-6 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
      </div>

      <div className="h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center">
                <Loader2 className="h-5 w-5 animate-spin text-teal-500" />
                <span className="ml-2 text-gray-600">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'generate insights' or ask a question..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-500 text-white rounded-lg px-4 py-2 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}