import React, { useEffect, useState } from 'react';
import { MoreVertical, Pencil, Play, Trash2, Pause, Folder } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CampaignWizard from './CampaignWizard';

const Campaign = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [showWizard, setShowWizard] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check query param for wizard
        const params = new URLSearchParams(location.search);
        if (params.get("wizard") === "1") {
            setShowWizard(true);

            // 🔹 Clean up the URL (remove ?wizard=1)
            navigate("/campaign", { replace: true });
        }
    }, [location, navigate]);
    const [campaigns, setCampaigns] = useState([
        {
            id: 1,
            title: 'US Prospecting Spring Push',
            keywords: 'apparel, activewear, running shoes, spring sale',
            brands: ['Nike', 'Adidas', 'Puma'],
            regions: ['US', 'CA'],
            status: 'Active',
            lastUpdated: '2 hrs ago'
        },
        {
            id: 2,
            title: 'EU Retargeting Evergreen',
            keywords: 'brand recall, cart abandoners, loyalty',
            brands: ['Zalando', 'ASOS'],
            regions: ['DE', 'FR', 'ES'],
            status: 'Paused',
            lastUpdated: 'yesterday'
        },
        {
            id: 3,
            title: 'APAC Launch - New Line',
            keywords: 'premium, launch, lifestyle',
            brands: ['Uniqlo', 'Muji'],
            regions: ['JP', 'SG', 'AU'],
            status: 'Error',
            lastUpdated: '3 days ago'
        }
    ]);
    const toggleDropdown = (id) => {
        setOpenDropdown(prevId => (prevId === id ? null : id));
    };

    const deleteCampaign = (id) => {
        setCampaigns(prev => prev.filter(c => c.id !== id));
        setOpenDropdown(null); // close dropdown
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
                    <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
                    <button
                        onClick={() => {
                            const user = JSON.parse(localStorage.getItem("trubitx_user"));
                            if (!user?.plan) {
                                // 🚨 No plan selected → redirect to Plans
                                navigate("/plans");
                            } else {
                                setShowWizard(true); // ✅ Allow campaign creation
                            }
                        }}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                        </svg>
                        New Campaign
                    </button>
                </div>

                {/* Campaign Cards OR Empty State */}
                <div className="p-4">
                    {campaigns.length === 0 ? (
                        // Empty State
                        <div className="flex justify-center items-center h-[70vh]">
                            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-12 text-center max-w-md w-full">
                                <div className="flex justify-center mb-6">
                                    <div className="bg-blue-50 p-4 rounded-full">
                                        <Folder className="w-12 h-12 text-blue-600" />
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">No campaigns yet</h2>
                                <p className="text-gray-500 mb-6">Create your first campaign to start tracking PR performance.</p>
                                <button
                                    onClick={() => {
                                        const user = JSON.parse(localStorage.getItem("trubitx_user"));
                                        if (!user?.plan) {
                                            // No plan selected → send them to plans
                                            navigate("/plans?redirect=campaign");
                                        } else {
                                            // Has a plan → open wizard
                                            setShowWizard(true);
                                        }
                                    }}
                                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
                            {campaigns.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow relative"
                                >
                                    {/* Three dots menu */}
                                    <div className="absolute top-4 right-4">
                                        <button
                                            onClick={() => toggleDropdown(campaign.id)}
                                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                        >
                                            <MoreVertical className="w-5 h-5 text-gray-400" />
                                        </button>

                                        {openDropdown === campaign.id && (
                                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                                                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                                    <Pencil className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                                    {campaign.status === 'Paused' ? (
                                                        <Play className="w-4 h-4" />
                                                    ) : (
                                                        <Pause className="w-4 h-4" />
                                                    )}
                                                    {campaign.status === 'Paused' ? 'Resume' : 'Pause'}
                                                </button>
                                                <button
                                                    onClick={() => deleteCampaign(campaign.id)}
                                                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Campaign Title */}
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 pr-8">
                                        {campaign.title}
                                    </h3>

                                    {/* Keywords */}
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 mb-1">Brand keywords:</p>
                                        <p className="text-sm text-gray-700">{campaign.keywords}</p>
                                    </div>

                                    {/* Brands */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {campaign.brands.map((brand, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                                            >
                                                {brand}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Regions */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {campaign.regions.map((region, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                                            >
                                                {region}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">
                                                Last updated: {campaign.lastUpdated}
                                            </span>
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded-full ${campaign.status === 'Active'
                                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                                    : campaign.status === 'Paused'
                                                        ? 'bg-gray-100 text-gray-700 border border-gray-300'
                                                        : 'bg-red-50 text-red-700 border border-red-200'
                                                    }`}
                                            >
                                                {campaign.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* View Insights Link */}
                                    <button
                                        onClick={() => navigate('/inshight')}
                                        className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-700 cursor-pointer"
                                    >
                                        View Insights
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                        >
                                            <path d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {showWizard && (
                <CampaignWizard
                    onClose={() => setShowWizard(false)}
                    onFinish={(newCampaign) => setCampaigns((prev) => [...prev, newCampaign])}
                />
            )}
        </div>
    );
};

export default Campaign;
