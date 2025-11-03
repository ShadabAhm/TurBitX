import React, { useState, useRef, useEffect } from 'react';
import { Send, LayoutDashboard, MessageSquare, TrendingUp, BarChart3, PieChart } from 'lucide-react';

export default function Dashboard() {
  const [viewMode, setViewMode] = useState('chat'); // 'chat' or 'dashboard'
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello Alex! 👋 Welcome to TrubitX Analytics. I can help you understand your PR campaign metrics. Try asking me about your sentiment score, share of voice, or any other metrics!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('sentiment')) {
      return {
        type: 'bot',
        content: 'Here\'s your sentiment analysis:',
        chart: 'sentiment',
        data: {
          positive: 50,
          neutral: 40,
          negative: 10
        },
        text: 'Your sentiment score is **3.9/5**, which is quite positive! 50% of mentions are positive, 40% are neutral, and only 10% are negative. This indicates strong brand perception.',
        timestamp: new Date()
      };
    } else if (lowerQuery.includes('share of voice') || lowerQuery.includes('sov')) {
      return {
        type: 'bot',
        content: 'Here\'s your Share of Voice breakdown:',
        chart: 'shareOfVoice',
        data: {
          brand: 40,
          competitor1: 55,
          competitor2: 15
        },
        text: 'Your brand holds **40% share of voice** with 10.7K mentions. You\'re performing well, but there\'s room to grow against competitors.',
        timestamp: new Date()
      };
    } else if (lowerQuery.includes('reach') || lowerQuery.includes('time')) {
      return {
        type: 'bot',
        content: 'Here\'s your reach over time:',
        chart: 'reach',
        text: 'Your reach has been steadily growing over the past 30 days, showing a positive trend in campaign visibility. The growth rate has been consistent, reaching peak performance around day 30.',
        timestamp: new Date()
      };
    } else if (lowerQuery.includes('engagement')) {
      return {
        type: 'bot',
        content: 'Here are your engagement metrics:',
        chart: 'engagement',
        data: {
          pickupRate: 68,
          engagementRate: 23,
          tier1Publication: 41
        },
        text: '**Engagement Overview:**\n- Pickup Rate: 68% - Excellent coverage pickup\n- Engagement Rate: 23% - Good audience interaction\n- Tier-1 Publication: 41% - Strong media quality',
        timestamp: new Date()
      };
    } else if (lowerQuery.includes('mentions')) {
      return {
        type: 'bot',
        content: 'Your campaign has received **1,284 mentions** across various channels. This is a strong indicator of campaign reach and awareness.',
        timestamp: new Date()
      };
    } else if (lowerQuery.includes('ad equivalent') || lowerQuery.includes('aev')) {
      return {
        type: 'bot',
        content: 'Your Ad Equivalent Value (AEV) is **₹76.2L**. This represents the estimated value of the earned media coverage if you had to pay for equivalent advertising space.',
        timestamp: new Date()
      };
    } else {
      return {
        type: 'bot',
        content: 'I can help you with:\n\n• Sentiment Score\n• Share of Voice\n• Reach Over Time\n• Engagement Metrics\n• Mentions Count\n• Ad Equivalent Value\n\nWhat would you like to know?',
        timestamp: new Date()
      };
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderChart = (chartType, data) => {
    if (chartType === 'sentiment') {
      return (
        <div className="bg-white rounded-lg p-4 my-3 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Sentiment Distribution</h4>
          <div className="flex items-end justify-center gap-4 h-48">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 bg-green-500 rounded-t-lg transition-all" style={{ height: `${data.positive * 1.8}px` }}></div>
              <span className="text-sm font-medium text-gray-700">Positive</span>
              <span className="text-xs text-gray-500">{data.positive}%</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 bg-gray-400 rounded-t-lg transition-all" style={{ height: `${data.neutral * 1.8}px` }}></div>
              <span className="text-sm font-medium text-gray-700">Neutral</span>
              <span className="text-xs text-gray-500">{data.neutral}%</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 bg-red-500 rounded-t-lg transition-all" style={{ height: `${data.negative * 1.8}px` }}></div>
              <span className="text-sm font-medium text-gray-700">Negative</span>
              <span className="text-xs text-gray-500">{data.negative}%</span>
            </div>
          </div>
        </div>
      );
    } else if (chartType === 'shareOfVoice') {
      return (
        <div className="bg-white rounded-lg p-4 my-3 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Share of Voice</h4>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20"
                  strokeDasharray={`${data.brand * 2.51} 251`} strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20"
                  strokeDasharray={`${data.competitor1 * 2.51} 251`}
                  strokeDashoffset={`-${data.brand * 2.51}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">10.7K</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Your Brand</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{data.brand}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Competitor</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{data.competitor1}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-700">Others</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{data.competitor2}%</span>
            </div>
          </div>
        </div>
      );
    } else if (chartType === 'reach') {
      return (
        <div className="bg-white rounded-lg p-4 my-3 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Reach Over Time</h4>
          <div className="h-40 flex items-end justify-between gap-1">
            {[20, 30, 45, 40, 55, 60, 70, 75, 85, 90, 95, 100].map((height, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                style={{ height: `${height}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>0d</span>
            <span>15d</span>
            <span>30d</span>
          </div>
        </div>
      );
    } else if (chartType === 'engagement') {
      return (
        <div className="bg-white rounded-lg p-4 my-3 border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">Engagement Metrics</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Pickup Rate</span>
                <span className="font-semibold text-blue-600">{data.pickupRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${data.pickupRate}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Engagement Rate</span>
                <span className="font-semibold text-cyan-600">{data.engagementRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full transition-all" style={{ width: `${data.engagementRate}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">Tier-1 Publication</span>
                <span className="font-semibold text-red-600">{data.tier1Publication}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full transition-all" style={{ width: `${data.tier1Publication}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  if (viewMode === 'dashboard') {
    return (
      <div className="min-h-full bg-gray-50 px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, Alex! Here's what you can track with out <span className="text-primary">TrubitX</span> Platform
            </h1>
            <p className="text-gray-600 mt-2 flex items-start gap-2">
              <span className="text-blue-500 mt-1">ℹ️</span>
              <span>Good morning Alex. Below is the different PR campaign metrics to measure it's success (Please note that we have use demo data to showcase the platform capabilities.)</span>
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setViewMode('chat')}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Chat View
            </button>
          </div>
        </div>

        <div>
          {/* Demo Data Badge */}
          <div className="mb-4 flex justify-end">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"> Demo Data </span>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm mb-1">Mentions Count</p>
              <p className="text-3xl font-bold text-gray-900">1284</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm mb-1">Share of Voice</p>
              <p className="text-3xl font-bold text-gray-900">40% Brand</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm mb-1">Sentiment Score (avg)</p>
              <p className="text-3xl font-bold text-gray-900">3.9 / 5</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm mb-1">Ad Equivalent Value</p>
              <p className="text-3xl font-bold text-gray-900">₹ 76.2L</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-4">Share of Voice</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20"
                      strokeDasharray="100 251" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20"
                      strokeDasharray="138 251" strokeDashoffset="-100" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">10.7K</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>55%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>40%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span>15%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-4">Sentiment</h3>
              <div className="flex items-end justify-center gap-4 h-48">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 bg-green-500 rounded-t-lg" style={{ height: '90px' }}></div>
                  <span className="text-xs text-gray-600">Positive</span>
                  <span className="text-xs font-semibold">~50%</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 bg-gray-400 rounded-t-lg" style={{ height: '72px' }}></div>
                  <span className="text-xs text-gray-600">Neutral</span>
                  <span className="text-xs font-semibold">~40%</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 bg-red-500 rounded-t-lg" style={{ height: '36px' }}></div>
                  <span className="text-xs text-gray-600">Negative</span>
                  <span className="text-xs font-semibold">~10%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 mb-4">Reach Over Time</h3>
              <div className="h-48 flex items-end justify-between gap-1">
                {[20, 30, 45, 40, 55, 60, 70, 75, 85, 90, 95, 100].map((height, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                    style={{ height: `${height}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>0d</span>
                <span>15d</span>
                <span>30d</span>
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Pickup Rate</span>
                  <span className="text-sm font-semibold">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Engagement Rate</span>
                  <span className="text-sm font-semibold">23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">Tier-1 Publication</span>
                  <span className="text-sm font-semibold">41%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '41%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-br from-gray-100 to-gray-150">
      {/* Header */}
      <div className=" border-b border-gray-200 flex justify-end items-center">
        <button
          onClick={() => setViewMode('dashboard')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <LayoutDashboard className="w-4 h-4" />
          Switch View
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-2">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                {message.type === 'bot' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">AI</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">TrubitX Assistant</span>
                  </div>
                )}
                <div className={`rounded-2xl px-5 py-3 ${message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-200'
                  }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.chart && renderChart(message.chart, message.data)}
                  {message.text && (
                    <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text.split('**').map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                      )}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your PR metrics... (e.g., 'What's my sentiment score?')"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-primary text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          {/* <p className="text-xs text-gray-500 mt-2 text-center">
            Try asking: "Show me sentiment analysis" or "What's my share of voice?"
          </p> */}
        </div>
      </div>

    </div>
  );
}