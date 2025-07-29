'use client';

import { useState, useEffect } from 'react';

interface ChatFormData {
  developerMessage: string;
  userMessage: string;
  model: string;
  apiKey: string;
}

interface ApiStatus {
  isOnline: boolean;
  checking: boolean;
}

export default function ChatPage() {
  const [formData, setFormData] = useState<ChatFormData>({
    developerMessage: '',
    userMessage: '',
    model: 'gpt-4.1-mini',
    apiKey: '',
  });
  
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    isOnline: false,
    checking: true,
  });

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    setApiStatus({ isOnline: false, checking: true });
    try {
      console.log('Checking API health...');
      const response = await fetch('/api/health', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      console.log('API health response:', response.status, response.ok);
      setApiStatus({ isOnline: response.ok, checking: false });
    } catch (error) {
      console.error('API health check failed:', error);
      setApiStatus({ isOnline: false, checking: false });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.developerMessage || !formData.userMessage || !formData.apiKey) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          developer_message: formData.developerMessage,
          user_message: formData.userMessage,
          model: formData.model,
          api_key: formData.apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          setResponse(prev => prev + chunk);
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setResponse('');
    setError('');
    setFormData(prev => ({
      ...prev,
      developerMessage: '',
      userMessage: '',
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          OpenAI Chat Interface
        </h1>
        <p className="text-lg text-gray-600">
          Interactive chat interface with streaming responses
        </p>
        
        {/* API Status Indicator */}
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                apiStatus.checking
                  ? 'bg-yellow-500 animate-pulse'
                  : apiStatus.isOnline
                  ? 'bg-green-500'
                  : 'bg-red-500'
              }`}
            />
            <span className="text-sm text-gray-600">
              {apiStatus.checking
                ? 'Checking API...'
                : apiStatus.isOnline
                ? 'API Online'
                : 'API Offline'}
            </span>
            <button
              onClick={checkApiHealth}
              className="text-xs text-primary-600 hover:text-primary-700 underline"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chat Form */}
        <div className="chat-card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Chat Configuration
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Developer Message */}
            <div>
              <label
                htmlFor="developerMessage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Developer Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="developerMessage"
                name="developerMessage"
                value={formData.developerMessage}
                onChange={handleInputChange}
                placeholder="Enter the system/developer message..."
                className="chat-input h-24 resize-none"
                required
              />
            </div>

            {/* User Message */}
            <div>
              <label
                htmlFor="userMessage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                User Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="userMessage"
                name="userMessage"
                value={formData.userMessage}
                onChange={handleInputChange}
                placeholder="Enter the user message..."
                className="chat-input h-24 resize-none"
                required
              />
            </div>

            {/* Model Selection */}
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Model
              </label>
              <select
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="chat-input"
              >
                <option value="gpt-4.1-mini">GPT-4.1 Mini</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
              </select>
            </div>

            {/* API Key */}
            <div>
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                OpenAI API Key <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="apiKey"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleInputChange}
                placeholder="sk-..."
                className="chat-input"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Your API key is not stored and only used for this request
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isLoading || !apiStatus.isOnline}
                className="chat-button flex-1"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
              
              <button
                type="button"
                onClick={clearChat}
                className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Response Display */}
        <div className="chat-card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            AI Response
          </h2>
          
          <div className="bg-gray-50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                <strong>Error:</strong> {error}
              </div>
            )}
            
            {response ? (
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {response}
              </div>
            ) : (
              <div className="text-gray-500 italic text-center">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mr-2" />
                    Waiting for response...
                  </div>
                ) : (
                  'Response will appear here...'
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 