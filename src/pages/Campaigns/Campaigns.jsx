// components/Campaign.js
import React, { useEffect, useState } from 'react';
import { MoreVertical, Pencil, Play, Trash2, Pause, Folder } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CampaignWizard from './CampaignWizard';
import { useCampaigns } from '../../hooks/useCampaigns';

const Campaign = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [showWizard, setShowWizard] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [actionLoading, setActionLoading] = useState(null); // Track loading state for specific actions
    const location = useLocation();
    const navigate = useNavigate();

    const {
        campaigns,
        loading,
        error,
        deleteCampaign,
        fetchCampaigns,
        toggleRecurring //Added this from hook
    } = useCampaigns();

    useEffect(() => {
        // Check query param for wizard
        const params = new URLSearchParams(location.search);
        if (params.get("wizard") === "1") {
            setShowWizard(true);
            navigate("/campaign", { replace: true });
        }
    }, [location, navigate]);

    const toggleDropdown = (id) => {
        setOpenDropdown(prevId => (prevId === id ? null : id));
    };

    // Add polling for campaign status updates
    useEffect(() => {
        if (campaigns.length === 0) return;

        const interval = setInterval(() => {
            // Only refresh if there are campaigns that might be processing
            const hasProcessingCampaigns = campaigns.some(campaign =>
                campaign.status === 'in_progress' ||
                campaign.status === 'ingesting'
            );

            if (hasProcessingCampaigns) {
                fetchCampaigns();
            }
        }, 10000); // Check every 10 seconds

        return () => clearInterval(interval);
    }, [campaigns, fetchCampaigns]);

    const handleDeleteCampaign = async (id) => {
        if (window.confirm('Are you sure you want to delete this campaign?')) {
            try {
                setActionLoading(`delete-${id}`);
                await deleteCampaign(id);
                setOpenDropdown(null);
            } catch (err) {
                // Error handled in hook
            } finally {
                setActionLoading(null);
            }
        }
    };

    const handleEditCampaign = (campaign) => {
        setSelectedCampaign(campaign);
        setOpenDropdown(null);
    };

    const handleToggleRecurring = async (campaign) => {
        try {
            setActionLoading(`toggle-${campaign.id}`);
            const intervalHours = campaign.interval_hours || 24;
            await toggleRecurring(campaign.id, intervalHours);
            setOpenDropdown(null);
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    const getFrontendStatus = (campaign) => {
        // For recurring campaigns, show Active/Paused based on is_recurring
        if (campaign.is_recurring !== undefined) {
            return campaign.is_recurring ? 'Active' : 'Paused';
        }

        // For one-time campaigns, use the job status
        const backendStatus = campaign.status;
        if (backendStatus === 'completed') return 'Completed';
        if (backendStatus === 'in_progress') return 'Ingesting';
        if (backendStatus === 'paused') return 'Paused';
        if (backendStatus === 'cancelled') return 'Cancelled';
        if (backendStatus === 'error') return 'Error';
        if (backendStatus === 'draft') return 'Draft';
        return 'Ingesting';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-50 text-green-700 border border-green-200';
            case 'Completed':
                return 'bg-blue-50 text-blue-700 border border-blue-200';
            case 'Ingesting':
                return 'bg-orange-50 text-orange-700 border border-orange-200';
            case 'Paused':
                return 'bg-gray-100 text-gray-700 border border-gray-300';
            case 'Error':
                return 'bg-red-50 text-red-700 border border-red-200';
            case 'Draft':
                return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
            case 'Cancelled':
                return 'bg-gray-100 text-gray-700 border border-gray-300';
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-300';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        if (diffHours > 0) return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
        if (diffMinutes > 0) return `${diffMinutes} min${diffMinutes > 1 ? 's' : ''} ago`;
        return 'just now';
    };

    if (loading && campaigns.length === 0) {
        return (
            <div className="flex h-screen bg-gray-50 justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading campaigns...</p>
                </div>
            </div>
        );
    }

    const handleWizardFinish = (result) => {
        fetchCampaigns();
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 pb-2">
                    <h1 className="text-2xl font-bold text-primary">Campaigns</h1>
                    <button
                        onClick={() => {
                            const user = JSON.parse(localStorage.getItem("trubitx_user"));
                            if (!user?.plan) {
                                navigate("/plans");
                            } else {
                                setShowWizard(true);
                            }
                        }}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                        </svg>
                        New Campaign
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mx-4 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Campaign Cards */}
                <div className="p-4">
                    {campaigns.length === 0 ? (
                        <div className="flex justify-center items-center h-[70vh]">
                            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center max-w-md w-full">
                                <div className="flex justify-center mb-6">
                                    <div className="bg-blue-50 p-4 rounded-full">
                                        <Folder className="w-12 h-12 text-primary" />
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">No campaigns yet</h2>
                                <p className="text-gray-500 mb-6">Create your first campaign to start tracking PR performance.</p>
                                <button
                                    onClick={() => {
                                        const user = JSON.parse(localStorage.getItem("trubitx_user"));
                                        if (!user?.plan) {
                                            navigate("/plans?redirect=campaign");
                                        } else {
                                            setShowWizard(true);
                                        }
                                    }}
                                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                                    </svg>
                                    New Campaign
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {campaigns.map((campaign) => {
                                const frontendStatus = getFrontendStatus(campaign);
                                const isActionLoading = actionLoading !== null;

                                return (
                                    <div
                                        key={campaign.id}
                                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow relative"
                                    >
                                        {/* Dropdown Menu */}
                                        <div className="absolute top-4 right-4">
                                            <button
                                                onClick={() => toggleDropdown(campaign.id)}
                                                disabled={isActionLoading}
                                                className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <MoreVertical className="w-5 h-5 text-gray-400" />
                                            </button>

                                            {openDropdown === campaign.id && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                                    <button
                                                        onClick={() => handleEditCampaign(campaign)}
                                                        disabled={isActionLoading}
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                        Edit
                                                    </button>

                                                    {/*Single Toggle Button */}
                                                    <button
                                                        onClick={() => handleToggleRecurring(campaign)}
                                                        disabled={actionLoading === `toggle-${campaign.id}`}
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
                                                    >
                                                        {actionLoading === `toggle-${campaign.id}` ? (
                                                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                                        ) : campaign.is_recurring ? (
                                                            <Pause className="w-4 h-4" />
                                                        ) : (
                                                            <Play className="w-4 h-4" />
                                                        )}

                                                        {actionLoading === `toggle-${campaign.id}`
                                                            ? (campaign.is_recurring ? 'Pausing...' : 'Starting...')
                                                            : (campaign.is_recurring ? 'Pause' : 'Activate')}
                                                    </button>

                                                    <button
                                                        onClick={() => handleDeleteCampaign(campaign.id)}
                                                        disabled={actionLoading === `delete-${campaign.id}`}
                                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 disabled:opacity-50"
                                                    >
                                                        {actionLoading === `delete-${campaign.id}` ? (
                                                            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )}
                                                        {actionLoading === `delete-${campaign.id}` ? 'Deleting...' : 'Delete'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 pr-8">{campaign.name}</h3>

                                        <div className="mb-4 flex gap-2">
                                            <p className="text-sm text-gray-500 mb-1">Brand keywords:</p>
                                            <p className="text-sm text-gray-800 font-semibold">{campaign.brand_keyword}</p>
                                        </div>
                                        <div className='flex flex-wrap gap-2 mb-4'>
                                            <p className="text-sm text-gray-500 mb-1">Competitors:</p>
                                            <div className="">
                                                {campaign.competitors?.map((brand, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">
                                                        {brand}
                                                    </span>
                                                ))}
                                            </div>

                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <p className="text-sm text-gray-500 mb-1">Regions:</p>
                                            <p>
                                                {campaign.regions?.map((region, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
                                                        {region}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-gray-500">
                                                    Last updated: {formatDate(campaign.updated_at)}
                                                </span>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(frontendStatus)}`}>
                                                    {frontendStatus}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/insight/${campaign.id}`)}
                                            className="mt-4 text-primary text-sm font-medium flex items-center gap-1 hover:text-md cursor-pointer"
                                        >
                                            View Insights
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {showWizard && (
                <CampaignWizard
                    onClose={() => {
                        setShowWizard(false);
                        setSelectedCampaign(null);
                    }}
                    onFinish={() => fetchCampaigns()}
                    editCampaign={selectedCampaign}
                />
            )}
        </div>
    );
};

export default Campaign;
