// components/ChatInterface.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';

// Define message structure
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface Conversation {
  id: string;
  topic: string;
  messages: Message[];
  timestamp: number;
}

// API key config (better to store in environment variables)
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

const ChatInterface: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>(GEMINI_API_KEY);
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load API key from localStorage if available
  useEffect(() => {
    const savedApiKey = localStorage.getItem('geminiApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
      // Show modal to enter API key if not provided
      setShowApiKeyModal(true);
    }
  }, []);

  // Load conversations from localStorage on initial render
  useEffect(() => {
    const savedConversations = localStorage.getItem('networkChatConversations');
    if (savedConversations) {
      const parsedConversations = JSON.parse(savedConversations);
      setConversations(parsedConversations);
      
      // Find the most recent conversation if any
      if (parsedConversations.length > 0) {
        const mostRecent = parsedConversations.sort((a: Conversation, b: Conversation) => 
          b.timestamp - a.timestamp
        )[0];
        setCurrentConversationId(mostRecent.id);
        setMessages(mostRecent.messages);
      }
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('networkChatConversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save API key to localStorage
  const saveApiKey = (key: string) => {
    localStorage.setItem('geminiApiKey', key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  // Generate a topic summary from the conversation
  const generateTopicSummary = (messages: Message[]): string => {
    if (messages.length === 0) return "New Conversation";
    
    // Use the first user message as a base for the topic
    const firstUserMessage = messages.find(m => m.role === 'user')?.content || '';
    
    // Extract key topic (first 30 chars or first sentence)
    const topic = firstUserMessage
      .split('.')[0]
      .slice(0, 30)
      .trim();
      
    return topic + (topic.length === 30 ? '...' : '');
  };

  // Function to create a new conversation
  const startNewConversation = () => {
    const newId = `conv-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newConversation: Conversation = {
      id: newId,
      topic: "New Conversation",
      messages: [],
      timestamp: Date.now()
    };
    
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newId);
    setMessages([]);
  };

  // Select a conversation
  const selectConversation = (id: string) => {
    setCurrentConversationId(id);
    const conversation = conversations.find(conv => conv.id === id);
    if (conversation) {
      setMessages(conversation.messages);
    }
  };

  // Update the current conversation in the conversations list
  const updateCurrentConversation = (updatedMessages: Message[]) => {
    if (!currentConversationId) return;
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === currentConversationId) {
        return {
          ...conv,
          messages: updatedMessages,
          topic: generateTopicSummary(updatedMessages),
          timestamp: Date.now()
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
  };

  // Prepare chat history for context
  const prepareChatHistory = (messages: Message[]) => {
    // Return the last few messages to maintain context, limiting to keep request size reasonable
    return messages.slice(-10).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
  };

  // Function to call Gemini API
  const callGeminiAPI = async (userMessage: string) => {
    try {
      setIsLoading(true);
      
      // Check if API key is available
      if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
        setShowApiKeyModal(true);
        return "Please enter your Gemini API key to continue.";
      }

      // Prepare context for the model
      const systemPrompt = 
        "You are an expert Network Security Assistant specializing in networking concepts, protocols, " +
        "cybersecurity, and network architecture. Provide detailed, technically accurate responses " +
        "to questions about networking and security topics. Include practical examples where relevant. " +
        "If you don't know the answer to a networking or security question, admit it rather than providing " +
        "incorrect information. Always maintain context from the prior conversation and ask relevant " +
        "follow-up questions to help the user deepen their understanding.";

      // Get chat history for context
      const chatHistory = prepareChatHistory(messages);
      
      // Build the request payload
      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: systemPrompt }]
          },
          ...chatHistory,
          {
            role: "user",
            parts: [{ text: userMessage }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      // Make the API call
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API error:", errorData);
        throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      // Extract the text from the response
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "I couldn't process your request. Please try again.";
        
      return responseText;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I'm having trouble connecting to my knowledge base right now. Please check your API key and network connection, then try again.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Create user message
    const userMessage: Message = {
      role: 'user',
      content: inputText,
      timestamp: Date.now()
    };

    // Add user message to the chat
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');

    // Create conversation if none exists
    if (!currentConversationId) {
      const newId = `conv-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newConversation: Conversation = {
        id: newId,
        topic: generateTopicSummary([userMessage]),
        messages: [userMessage],
        timestamp: Date.now()
      };
      
      setConversations([newConversation, ...conversations]);
      setCurrentConversationId(newId);
    } else {
      // Update current conversation with user message
      updateCurrentConversation(updatedMessages);
    }

    // Get response from Gemini
    const response = await callGeminiAPI(inputText);
    
    // Add assistant message
    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: Date.now()
    };
    
    const finalMessages = [...updatedMessages, assistantMessage];
    setMessages(finalMessages);
    
    // Update conversation with assistant response
    updateCurrentConversation(finalMessages);
  };

  // Format time for display
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for conversation groups
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  // Group conversations by date
  const groupedConversations = conversations.reduce((groups, conversation) => {
    const date = formatDate(conversation.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(conversation);
    return groups;
  }, {} as Record<string, Conversation[]>);

  return (
    <div className="flex justify-center items-center min-h-screen mt-16 p-2 sm:p-4">
  {/* API Key Modal */}
  {showApiKeyModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        <h2 className="text-lg sm:text-xl font-bold mb-3">Enter Gemini API Key</h2>
        <p className="mb-3 text-sm text-gray-600">
          To use this chat interface, you need a Gemini API key from Google AI Studio. Your key will be stored locally on your device.
        </p>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const key = formData.get('apiKey') as string;
          if (key) saveApiKey(key);
        }}>
          <input
            type="text"
            name="apiKey"
            placeholder="Enter your Gemini API key"
            className="w-full p-2 border border-gray-300 rounded mb-3 text-sm"
            defaultValue={apiKey !== 'YOUR_GEMINI_API_KEY' ? apiKey : ''}
            required
          />
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <button
              type="button"
              className="bg-gray-200 px-4 py-2 rounded text-sm"
              onClick={() => setShowApiKeyModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
            >
              Save API Key
            </button>
          </div>
        </form>
        <div className="mt-4 text-xs text-gray-500">
          <p>{`Don't have an API key?`}</p>
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Get one from Google AI Studio
          </a>
        </div>
      </div>
    </div>
  )}

  <div className="w-full max-w-full sm:max-w-6xl border-2 border-gray-300 rounded-lg p-2">
    <div className="flex justify-between items-center mb-2 px-2">
      <h1 className="text-lg sm:text-xl font-bold text-center sm:text-left w-full">Network Security Assistant</h1>
    </div>

    <div className="flex flex-col md:flex-row gap-2 h-[600px]">
      {/* Left Panel */}
      <div className="w-full md:w-1/3 border border-gray-300 rounded-lg h-full flex flex-col">
        <div className="p-3 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-sm sm:text-base font-semibold">Conversations</h2>
          <button 
            onClick={startNewConversation}
            className="bg-white border border-gray-300 rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm hover:bg-gray-50"
          >
            New Chat
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-2 text-sm">
          {Object.entries(groupedConversations).map(([date, dateConversations]) => (
            <div key={date} className="mb-3">
              <div className="text-xs text-gray-500 mb-1">{date}</div>
              {dateConversations.map(conversation => (
                <div 
                  key={conversation.id}
                  onClick={() => selectConversation(conversation.id)}
                  className={`p-2 mb-1 rounded-lg cursor-pointer bg-white text-black hover:bg-yellow-100 text-sm ${
                    currentConversationId === conversation.id ? 'bg-gray-200' : ''
                  }`}
                >
                  <div className="font-medium truncate">{conversation.topic}</div>
                  <div className="text-xs text-gray-500">{formatTime(conversation.timestamp)}</div>
                </div>
              ))}
            </div>
          ))}
          {conversations.length === 0 && (
            <div className="text-center text-gray-500 mt-4 text-sm">
              No conversations yet
            </div>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div className="w-full md:w-2/3 flex flex-col gap-2 h-full">
        <div className="border border-gray-300 rounded-lg flex-grow p-2 overflow-y-auto text-sm">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-2 sm:p-4">
              <h3 className="text-base font-semibold mb-2">Network Security Assistant</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Ask me anything about networking, cybersecurity, protocols, or network architecture.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
                {["How do firewalls work?", "Explain TCP vs UDP", "What is a VPN?", "How to prevent DDoS attacks"].map((s, i) => (
                  <button
                    key={i}
                    className="bg-gray-50 hover:bg-gray-100 text-sm p-2 rounded-lg border border-gray-200"
                    onClick={() => setInputText(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 p-2 rounded-lg text-sm ${
                  msg.role === 'user' ? 'bg-gray-100' : 'bg-blue-50'
                }`}
              >
                <div className="font-semibold mb-1">
                  {msg.role === 'user' ? 'You' : 'Network Assistant'}
                </div>
                <div className="whitespace-pre-line">{msg.content}</div>
                <div className="text-xs text-gray-500 text-right mt-1">
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-center p-2 bg-blue-50 rounded-lg text-sm">
              <div className="mr-2">Network Assistant is typing</div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg p-2 text-sm"
              placeholder="Ask about networking or security..."
              disabled={isLoading}
            />
            <button 
              type="submit"
              className={`border border-gray-300 rounded-full px-4 py-2 text-sm ${
                isLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-green-300 hover:bg-blue-300'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Ask'}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ChatInterface;