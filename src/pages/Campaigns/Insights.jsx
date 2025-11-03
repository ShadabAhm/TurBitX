import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, RefreshCw, TrendingUp } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { campaignService } from '../../services/campaignService';

const Insights = ({ handleLogout }) => {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const [campaignData, setCampaignData] = useState(null);
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        setLoading(true);
        console.log('Fetching campaign data for ID:', campaignId);

        const [resultsData, infoData] = await Promise.all([
          campaignService.getCampaignResults(campaignId),
          campaignService.getCampaign(campaignId)
        ]);

        console.log('Campaign results:', resultsData);
        console.log('Campaign info:', infoData);

        setCampaignData(resultsData);
        setCampaignInfo(infoData);
        setError(null);
      } catch (err) {
        console.error('Error fetching campaign data:', err);

        // Handle different error cases specifically
        if (err.response?.status === 400) {
          const errorDetail = err.response.data?.detail || 'Campaign data not available';

          if (errorDetail.includes('No data available')) {
            setError('No data available yet. The campaign is either still processing or waiting for its first run to complete.');
          } else if (errorDetail.includes('still processing')) {
            setError('Campaign is still processing. Please check back in a few minutes.');
          } else if (errorDetail.includes('Campaign not completed')) {
            setError('Campaign processing is not yet complete. Results will be available soon.');
          } else {
            setError(errorDetail);
          }
        } else if (err.response?.status === 404) {
          setError('Campaign not found. Please check the campaign ID.');
        } else if (err.response?.status === 403) {
          setError('You are not authorized to view this campaign.');
        } else {
          setError('Failed to load campaign data. Please ensure the backend server is running and try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchCampaignData();
    }
  }, [campaignId]);

  // Add retry mechanism for processing campaigns
  useEffect(() => {
    let retryInterval;

    if (error && error.includes('still processing') && campaignId) {
      retryInterval = setInterval(() => {
        console.log('Retrying to fetch campaign data...');
        fetchCampaignData();
      }, 30000); // Retry every 30 seconds
    }

    return () => {
      if (retryInterval) {
        clearInterval(retryInterval);
      }
    };
  }, [error, campaignId]);

  const handleDownloadReport = async () => {
    try {
      setDownloading(true);
      await campaignService.downloadCampaignReport(campaignId);
    } catch (err) {
      console.error('Error downloading report:', err);
      alert('Failed to download report. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaign insights...</p>
        </div>
      </div>
    );
  }

  if (error || !campaignData) {
    const isProcessing = error?.includes('processing') || error?.includes('No data available');

    return (
      <div className="flex h-screen bg-gray-50 justify-center items-center">
        <div className="text-center max-w-md">
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600 mb-2">Campaign is processing</p>
              <p className="text-sm text-gray-500 mb-4">
                {error}. We'll automatically check for updates every 30 seconds.
              </p>
            </>
          ) : (
            <>
              <p className="text-red-600 mb-4">{error || 'Campaign not found'}</p>
            </>
          )}
          <button
            onClick={() => navigate('/campaign')}
            className="text-primary hover:underline"
          >
            Back to Campaigns
          </button>
          {!isProcessing && (
            <button
              onClick={() => fetchCampaignData()}
              className="ml-4 px-4 py-2 bg-primary text-white rounded-lg"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  // Calculate metrics from API data
  const totalMentions = campaignData.brand_kpis?.reduce((sum, brand) => sum + brand.mentions, 0) || 0;
  const totalReach = campaignData.brand_kpis?.reduce((sum, brand) => sum + brand.weighted_reach, 0) || 0;
  const avgSentiment = campaignData.brand_kpis?.reduce((sum, brand) => sum + brand.avg_sentiment, 0) / (campaignData.brand_kpis?.length || 1);
  const totalAdValue = campaignData.brand_kpis?.reduce((sum, brand) => sum + brand.ad_equivalent_value_inr, 0) || 0;

  // Share of Voice data
  const shareOfVoiceData = campaignData.brand_kpis?.map(brand => ({
    name: brand.brand,
    value: brand.share_of_voice,
    color: brand.brand === campaignInfo?.brand_keyword ? '#8AC539' : '#ef4444'
  })) || [];

  // Sentiment calculation (simplified - you may want to fetch actual sentiment breakdown)
  const sentimentData = [
    { name: 'Positive', value: Math.max(0, avgSentiment * 100), color: '#10b981' },
    { name: 'Neutral', value: 50, color: '#6b7280' },
    { name: 'Negative', value: Math.max(0, -avgSentiment * 100 + 50), color: '#ef4444' }
  ];

  // Publication tier distribution
  const tier1Count = campaignData.publication_kpis?.filter(p => p.tier === 'tier1').length || 0;
  const tier2Count = campaignData.publication_kpis?.filter(p => p.tier === 'tier2').length || 0;
  const totalPublications = tier1Count + tier2Count || 1;
  const tier1Percentage = (tier1Count / totalPublications) * 100;

  // Publication distribution by domain
  const publicationData = campaignData.publication_kpis?.slice(0, 5).map(pub => ({
    domain: pub.domain,
    mentions: pub.mentions,
    reach: pub.weighted_reach
  })) || [];

  // Top publications for market distribution chart
  const marketDistributionData = campaignData.publication_kpis?.slice(0, 5).map(pub => ({
    region: pub.domain.replace('.com', '').replace('.org', ''),
    value: pub.mentions
  })) || [];

  // Mock reach over time data (you may need to add this to your API)
  const reachOverTimeData = [
    { date: 'Week 1', mentions: totalMentions * 0.4 },
    { date: 'Week 2', mentions: totalMentions * 0.6 },
    { date: 'Week 3', mentions: totalMentions * 0.8 },
    { date: 'Week 4', mentions: totalMentions }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1">
        {/* Custom Header for Insights */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/campaign')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium cursor-pointer">Back to Campaigns</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="font-medium">Refresh</span>
              </button>
              <button
                onClick={handleDownloadReport}
                disabled={downloading}
                className="flex items-center gap-2 px-4 py-2 text-white bg-primary rounded-lg cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="font-medium">Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span className="font-medium">Download Report</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{campaignInfo?.name || 'Campaign Insights'}</h1>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Brand keywords:</span> {campaignInfo?.brand_keyword || 'N/A'} · <span className="font-medium">Competitors:</span> {campaignInfo?.competitors?.join(', ') || 'N/A'}
            </p>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Mentions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Total Mentions</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalMentions.toLocaleString()}</div>
              <div className="flex items-center text-sm text-gray-600">
                <span>Across all brands</span>
              </div>
            </div>

            {/* Share of Voice */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {(() => {
                const brandSOV = shareOfVoiceData[0]?.value || 0;
                const competitorSOV = shareOfVoiceData[1]?.value || 0;

                let brandBg = 'bg-gray-100 text-gray-700';
                let competitorBg = 'bg-gray-100 text-gray-700';

                if (brandSOV > competitorSOV) {
                  brandBg = 'bg-green-100 text-green-700';
                  competitorBg = 'bg-red-100 text-red-700';
                } else if (brandSOV < competitorSOV) {
                  brandBg = 'bg-red-100 text-red-700';
                  competitorBg = 'bg-green-100 text-green-700';
                }

                return (
                  <>
                    {/* Title with colored brand name */}
                    <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <span>Share of Voice:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${brandBg}`}>
                        {shareOfVoiceData[0]?.name || 'Brand'}
                      </span>
                    </div>

                    {/* Brand score */}
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {brandSOV.toFixed(1)}%
                    </div>

                    {/* Competitor scores */}
                    <div className="flex flex-wrap items-center gap-2">
                      {shareOfVoiceData.slice(1).map((comp, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 text-xs font-medium rounded-full ${brandSOV > comp.value
                            ? 'bg-red-100 text-red-700'
                            : brandSOV < comp.value
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                          {comp.name} {comp.value.toFixed(1)}%
                        </span>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>


            {/* Sentiment Score */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Avg Sentiment Score</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {avgSentiment >= 0 ? 'Positive' : 'Negative'}
              </div>
              <div className={`text-2xl font-bold mb-3 ${avgSentiment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {(avgSentiment * 100).toFixed(1)}%
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Positive</span>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Neutral</span>
                <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">Negative</span>
              </div>
            </div>

            {/* Ad Equivalent Value */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">Ad Equivalent Value</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">₹{totalAdValue.toLocaleString()}</div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-1">📅</span>
                <span>Campaign total</span>
              </div>
            </div>
          </div>

          {/* Performance Bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Pickup Rate */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-900 mb-3">Avg Pickup Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-primary h-2 rounded-full" style={{
                  width: `${Math.min(100, (campaignData.brand_kpis?.reduce((sum, b) => sum + b.avg_pickup_rate, 0) / (campaignData.brand_kpis?.length || 1)) * 100)}%`
                }}></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {((campaignData.brand_kpis?.reduce((sum, b) => sum + b.avg_pickup_rate, 0) / (campaignData.brand_kpis?.length || 1)) * 100).toFixed(1)}%
              </div>
            </div>

            {/* Engagement Rate */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-900 mb-3">Avg Engagement Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-primary h-2 rounded-full" style={{
                  width: `${Math.min(100, (campaignData.brand_kpis?.reduce((sum, b) => sum + b.avg_engagement_rate, 0) / (campaignData.brand_kpis?.length || 1)) * 100)}%`
                }}></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {((campaignData.brand_kpis?.reduce((sum, b) => sum + b.avg_engagement_rate, 0) / (campaignData.brand_kpis?.length || 1)) * 100).toFixed(1)}%
              </div>
            </div>

            {/* Tier-1 Publication % */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-sm font-medium text-gray-900 mb-3">Tier-1 Publication %</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${tier1Percentage}%` }}></div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{tier1Percentage.toFixed(1)}%</div>
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
                {shareOfVoiceData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name} ({item.value.toFixed(1)}%)</span>
                  </div>
                ))}
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