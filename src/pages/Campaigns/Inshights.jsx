import React from 'react';
import { ArrowLeft, Download, RefreshCw, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Insights = ({ handleLogout }) => {
  const navigate = useNavigate();

  // Sample data for charts
  const shareOfVoiceData = [
    { name: 'Brand', value: 62, color: '#3b82f6' },
    { name: 'Competitors', value: 38, color: '#ef4444' }
  ];

  const sentimentData = [
    { name: 'Positive', value: 45, color: '#10b981' },
    { name: 'Neutral', value: 30, color: '#6b7280' },
    { name: 'Negative', value: 25, color: '#ef4444' }
  ];

  const reachOverTimeData = [
    { date: 'Week 1', mentions: 300000 },
    { date: 'Week 2', mentions: 450000 },
    { date: 'Week 3', mentions: 600000 },
    { date: 'Week 4', mentions: 520000 },
    { date: 'Week 5', mentions: 700000 },
    { date: 'Week 6', mentions: 850000 },
    { date: 'Week 7', mentions: 780000 }
  ];

  const marketDistributionData = [
    { region: 'US', value: 45 },
    { region: 'CA', value: 25 },
    { region: 'UK', value: 15 },
    { region: 'AU', value: 10 },
    { region: 'Others', value: 5 }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1">
        {/* Custom Header for Insights */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/campaigns')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium cursor-pointer">Back to Campaigns</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span className="font-medium">Refresh</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span className="font-medium">Export Report</span>
              </button>
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">US Prospecting Spring Push</h1>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Brand keywords:</span> athletic wear, running shoes · <span className="font-medium">Competitors:</span> Nike, Puma
            </p>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Mentions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Total Mentions</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">2,431,120</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+11% last 7 days</span>
              </div>
            </div>

            {/* Share of Voice */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Share of Voice</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">62%</div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Brand</span>
                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                  Competitors 38%
                </span>
              </div>
            </div>

            {/* Sentiment Score */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Sentiment Score</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">Negative</div>
              <div className="text-2xl font-bold text-red-600 mb-3">10%</div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Positive</span>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Neutral</span>
                <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">Negative</span>
              </div>
            </div>

            {/* Ad Equivalent Value */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Ad Equivalent Value</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$1,284,500</div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-1">📅</span>
                <span>This month</span>
              </div>
            </div>
          </div>

          {/* Performance Bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Pickup Rate */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-900 mb-3">Pickup Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">72%</div>
            </div>

            {/* Engagement Rate */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-900 mb-3">Engagement Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '54%' }}></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">54%</div>
            </div>

            {/* Tier-1 Publication % */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-900 mb-3">Tier-1 Publication %</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '31%' }}></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">31%</div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Share of Voice Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Share of Voice</h3>
                <span className="text-sm text-gray-500">Brand vs Competitors</span>
              </div>
              <div className="flex items-center justify-center h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={shareOfVoiceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {shareOfVoiceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Brand (62%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Competitors (38%)</span>
                </div>
              </div>
            </div>

            {/* Sentiment Breakdown */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Sentiment Breakdown</h3>
                <span className="text-sm text-gray-500">Positive / Neutral / Negative</span>
              </div>
              <div className="flex items-center justify-center h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sentimentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reach Over Time */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Reach Over Time</h3>
                <span className="text-sm text-gray-500">Mentions vs Time</span>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reachOverTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="mentions" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Market Distribution */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Market Distribution</h3>
                <span className="text-sm text-gray-500">Regions</span>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketDistributionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" />
                    <YAxis dataKey="region" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;