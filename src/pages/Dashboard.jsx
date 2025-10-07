import React, { useState, useRef, useEffect } from 'react';
import { Plus, Mic, Send, User, Bot, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ handleLogout }) => {
  const user = JSON.parse(localStorage.getItem('trubitx_user') || '{}');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const metrics = {
    mentionsCount: 1284,
    shareOfVoice: '40% Brand',
    sentimentScore: '3.9 / 5',
    adEquivalentValue: '₹ 76.2L'
  };

  const engagementMetrics = [
    { label: 'Pickup Rate', value: 68, color: 'bg-blue-500' },
    { label: 'Engagement Rate', value: 23, color: 'bg-blue-500' },
    { label: 'Tier-1 Publication', value: 41, color: 'bg-red-500' }
  ];

  const topMentions = [
    {
      publisher: 'TechCrunch',
      headline: 'TRUBITX launches AI-driven PR analytics Suite',
      date: 'Sep 18',
      reach: 89,
      sentiment: 'Positive',
      icon: '🔴'
    },
    {
      publisher: 'The Verge',
      headline: 'How TRUBITX compares across SOV in fintech',
      date: 'Sep 17',
      reach: 75,
      sentiment: 'Neutral',
      icon: '⚫'
    },
    {
      publisher: 'Reuters',
      headline: 'Market reacts to TRUBITX partnership announcement',
      date: 'Sep 16',
      reach: 93,
      sentiment: 'Negative',
      icon: '🔴'
    }
  ];

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const generateResponse = (userQuery) => {
    const lowerQuery = userQuery.toLowerCase();

    if (lowerQuery.includes('share of voice') || lowerQuery.includes('sov')) {
      return {
        text: `Your Share of Voice is currently ${metrics.shareOfVoice}, with competitors holding 55% and the remaining 15% distributed among others. Total mentions tracked: 10.7K.`,
        chartType: 'sov'
      };
    } else if (lowerQuery.includes('sentiment')) {
      return {
        text: `Your current sentiment score is ${metrics.sentimentScore}. The breakdown shows 50% positive, 40% neutral, and 10% negative mentions.`,
        chartType: 'sentiment'
      };
    } else if (lowerQuery.includes('reach')) {
      return {
        text: `Your reach has been trending upward over the past 30 days.`,
        chartType: 'reach'
      };
    } else if (lowerQuery.includes('engagement')) {
      return {
        text: `Your engagement metrics show: Pickup Rate at 68%, Engagement Rate at 23%, and Tier-1 Publications at 41%.`,
        chartType: 'engagement'
      };
    } else if (lowerQuery.includes('mention')) {
      return {
        text: `You have ${metrics.mentionsCount} total mentions across top publications.`,
      };
    } else {
      return {
        text: `Helo, I'm here to he you! I can show charts for Share of Voice, Sentiment, Reach, and Engagement. Try asking for any of these.`
      };
    }
  };


  const handleSend = () => {
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: query,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setQuery('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const { text, chartType } = generateResponse(query);
      const botMessage = {
        id: Date.now() + 1,
        text,
        chartType: chartType || null,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);

  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome, {user.name || 'Alex'}! Here's what you can track with out TrubitX Platform
            </h1>
            <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
              <span className="inline-block w-4 h-4">ℹ️</span>
              Good morning Alex. Below is the different PR campaign metrics to measure it's success (Please note that we have use demo data to showcase the platform capabilities.)
            </p>
          </div>
          <button
            onClick={() => {
              const user = JSON.parse(localStorage.getItem("trubitx_user"));
              if (!user?.plan) {
                // 🚨 If user has no plan, navigate to Plans page
                navigate("/plans?redirect=campaign");
              } else {
                // ✅ If user already has a plan, go to Campaign page with wizard open
                navigate("/campaign?wizard=1");
              }
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            New Campaign
          </button>

        </div>

        {/* Demo Data Badge */}
        <div className="mb-4 flex justify-end">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            Demo Data
          </span>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Mentions Count</div>
            <div className="text-3xl font-bold text-gray-900">{metrics.mentionsCount}</div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Share of Voice</div>
            <div className="text-3xl font-bold text-gray-900">{metrics.shareOfVoice}</div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Sentiment Score (avg)</div>
            <div className="text-3xl font-bold text-gray-900">{metrics.sentimentScore}</div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Ad Equivalent Value</div>
            <div className="text-3xl font-bold text-gray-900">{metrics.adEquivalentValue}</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Share of Voice */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share of Voice</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="60" stroke="#E5E7EB" strokeWidth="20" fill="none" />
                  <circle cx="80" cy="80" r="60" stroke="#3B82F6" strokeWidth="20" fill="none"
                    strokeDasharray="251.2" strokeDashoffset="75.36" strokeLinecap="round" />
                  <circle cx="80" cy="80" r="60" stroke="#EF4444" strokeWidth="20" fill="none"
                    strokeDasharray="251.2" strokeDashoffset="-75.36" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">10.7K</span>
                </div>
              </div>
              <div className="ml-8 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-sm text-gray-600">55%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-sm text-gray-600">40%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                  <span className="text-sm text-gray-600">15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sentiment */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment</h3>
            <div className="flex items-end justify-center gap-4 h-40">
              <div className="flex flex-col items-center">
                <div className="w-16 bg-green-500 rounded-t" style={{ height: '120px' }}></div>
                <span className="text-xs text-gray-600 mt-2">Positive</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 bg-gray-400 rounded-t" style={{ height: '80px' }}></div>
                <span className="text-xs text-gray-600 mt-2">Neutral</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 bg-red-500 rounded-t" style={{ height: '40px' }}></div>
                <span className="text-xs text-gray-600 mt-2">Negative</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-red-500">*</span>
                <span className="text-gray-600">50%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-red-500">*</span>
                <span className="text-gray-600">40%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-red-500">*</span>
                <span className="text-gray-600">10%</span>
              </div>
            </div>
          </div>

          {/* Reach Over Time */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reach Over Time</h3>
            <div className="relative h-40">
              <svg className="w-full h-full" viewBox="0 0 300 160">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.05 }} />
                  </linearGradient>
                </defs>
                <path d="M 0 120 Q 50 100, 100 90 T 200 70 T 300 50 L 300 160 L 0 160 Z" fill="url(#grad)" />
                <path d="M 0 120 Q 50 100, 100 90 T 200 70 T 300 50" stroke="#3B82F6" strokeWidth="2" fill="none" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-2">
                <span>0d</span>
                <span>15d</span>
                <span>30d</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Engagement Metrics</h3>
          <div className="space-y-6">
            {engagementMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${metric.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Mentions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Mentions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Publisher</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Headline</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Reach Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {topMentions.map((mention, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{mention.icon}</span>
                        <span className="text-sm font-medium text-gray-900">{mention.publisher}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-700">{mention.headline}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{mention.date}</td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{mention.reach}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${mention.sentiment === 'Positive' ? 'bg-green-100 text-green-700' :
                        mention.sentiment === 'Neutral' ? 'bg-gray-100 text-gray-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                        {mention.sentiment}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Card */}
        {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Create your first campaign to start tracking real insights.</h4>
              <p className="text-sm text-gray-600">You're viewing demo data. Set up a campaign to pull live coverage and metrics.</p>
            </div>
          </div>
          <button
            onClick={() => {
              const user = JSON.parse(localStorage.getItem("trubitx_user"));
              if (!user?.plan) {
                // 🚨 If user has no plan, navigate to Plans page
                navigate("/plans?redirect=campaign");
              } else {
                // ✅ If user already has a plan, go to Campaign page with wizard open
                navigate("/campaign?wizard=1");
              }
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            New Campaign
          </button>
        </div> */}

        {/* Query Input */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Bot size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">Start a conversation by asking about your metrics</p>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => setQuery('What is my sentiment score?')}
                    className="block w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-700"
                  >
                    What is my sentiment score?
                  </button>
                  <button
                    onClick={() => setQuery('Tell me about my share of voice')}
                    className="block w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-700"
                  >
                    Tell me about my share of voice
                  </button>
                  <button
                    onClick={() => setQuery('How many mentions do I have?')}
                    className="block w-full text-left px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-700"
                  >
                    How many mentions do I have?
                  </button>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-2xl rounded-lg px-4 py-3 ${message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
                  }`}
              >
                <p className="text-sm leading-relaxed mb-2">{message.text}</p>

                {/* If message contains a chartType, render the mini chart */}
                {message.chartType === 'sov' && (
                  <div className="flex justify-center my-3">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="48" stroke="#E5E7EB" strokeWidth="16" fill="none" />
                      <circle cx="64" cy="64" r="48" stroke="#3B82F6" strokeWidth="16" fill="none"
                        strokeDasharray="301.6" strokeDashoffset="90" strokeLinecap="round" />
                      <circle cx="64" cy="64" r="48" stroke="#EF4444" strokeWidth="16" fill="none"
                        strokeDasharray="301.6" strokeDashoffset="-90" strokeLinecap="round" />
                    </svg>
                  </div>
                )}

                {message.chartType === 'sentiment' && (
                  <div className="flex justify-center gap-3 my-3 h-24">
                    <div className="flex flex-col items-center">
                      <div className="w-10 bg-green-500 rounded-t" style={{ height: '60px' }}></div>
                      <span className="text-xs text-gray-600 mt-1">Positive</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 bg-gray-400 rounded-t" style={{ height: '40px' }}></div>
                      <span className="text-xs text-gray-600 mt-1">Neutral</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 bg-red-500 rounded-t" style={{ height: '20px' }}></div>
                      <span className="text-xs text-gray-600 mt-1">Negative</span>
                    </div>
                  </div>
                )}

                {message.chartType === 'reach' && (
                  <div className="my-3">
                    <svg className="w-full h-24" viewBox="0 0 300 120">
                      <defs>
                        <linearGradient id="gradChat" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.3 }} />
                          <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.05 }} />
                        </linearGradient>
                      </defs>
                      <path d="M 0 100 Q 50 80, 100 70 T 200 50 T 300 30 L 300 120 L 0 120 Z" fill="url(#gradChat)" />
                      <path d="M 0 100 Q 50 80, 100 70 T 200 50 T 300 30" stroke="#3B82F6" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                )}

                {message.chartType === 'engagement' && (
                  <div className="space-y-2 my-3">
                    {engagementMetrics.map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-gray-700">{metric.label}</span>
                          <span className="text-xs font-semibold text-gray-900">{metric.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`${metric.color} h-1.5 rounded-full transition-all duration-500`}
                            style={{ width: `${metric.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {message.timestamp}
                </span>
              </div>
              {message.sender === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-end gap-3">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about mentions, Share of Voice, sentiment..."
              rows="1"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button
              onClick={toggleVoiceInput}
              className={`p-3 rounded-lg transition ${isListening
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button
              onClick={handleSend}
              disabled={!query.trim()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${query.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              Send
              <Send size={18} />
            </button>
          </div>
          {isListening && (
            <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              Listening...
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;