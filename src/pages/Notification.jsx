import React, { useState } from 'react';
import {
    Bell,
    Filter,
    CheckCheck,
    Download,
    MessageSquare,
    AlertTriangle,
    TrendingUp,
    User
} from 'lucide-react';
import Header from '../components/Header';

const NotificationsPage = ({ handleLogout }) => {
    const user = JSON.parse(sessionStorage.getItem('trubitx_user') || '{}');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const filterCounts = {
        All: 72,
        Unread: 7,
        Mentions: 18,
        Campaigns: 24,
        Influencers: 12,
        Alerts: 3
    };

    const notifications = [
        {
            id: 1,
            type: 'PR',
            title: 'PR Mention: TechDaily featured article',
            source: 'TechDaily',
            time: '5m ago',
            icon: MessageSquare,
            badge: 'PR',
            badgeColor: 'bg-red-500',
            actions: ['Open', 'Mark read']
        },
        {
            id: 2,
            type: 'Campaign',
            title: 'Campaign ROI up 12%',
            source: 'Q3 Brand Lift',
            time: '20m ago',
            icon: TrendingUp,
            badge: 'Campaign',
            badgeColor: 'bg-red-500',
            actions: ['View', 'Mark read']
        },
        {
            id: 3,
            type: 'Alert',
            title: 'Spike in negative sentiment on Twitter',
            source: 'Twitter',
            time: '1h ago',
            icon: AlertTriangle,
            badge: 'Alert',
            badgeColor: 'bg-orange-500',
            actions: ['Investigate', 'Mute']
        },
        {
            id: 4,
            type: 'Influencer',
            title: 'New influencer added: @finninsights',
            source: 'Directory',
            time: '2h ago',
            icon: User,
            badge: 'Influencer',
            badgeColor: 'bg-red-500',
            actions: ['Profile', 'Track']
        },
        {
            id: 5,
            type: 'Mentions',
            title: '34 new brand mentions detected',
            source: 'All platforms',
            time: 'Today',
            icon: MessageSquare,
            badge: 'Mentions',
            badgeColor: 'bg-red-500',
            actions: ['View', 'Export']
        }
    ];

    const digestItems = [
        {
            title: 'Unread',
            count: 7,
            badge: '+2 new today',
            badgeColor: 'bg-green-500'
        },
        {
            title: 'Mentions today',
            count: 34,
            badge: '+12 vs avg',
            badgeColor: 'bg-green-500'
        },
        {
            title: 'Critical alerts',
            count: 1,
            badge: 'Investigate spike',
            badgeColor: 'bg-green-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header user={user} handleLogout={handleLogout} />

            <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <Bell className="w-6 h-6 text-gray-700" />
                        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                        </button>

                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                            <CheckCheck className="w-4 h-4" />
                            <span>Mark all as read</span>
                        </button>

                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar - Quick Filters */}
                    <div className="lg:col-span-1 h-full">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Quick filters</h3>

                            <div className="space-y-2">
                                {Object.entries(filterCounts).map(([filter, count]) => (
                                    <button
                                        key={filter}
                                        onClick={() => setSelectedFilter(filter)}
                                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${selectedFilter === filter
                                                ? 'bg-blue-50 border border-blue-200'
                                                : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <span
                                            className={`text-sm ${selectedFilter === filter
                                                    ? 'text-blue-700 font-medium'
                                                    : 'text-gray-700'
                                                }`}
                                        >
                                            {filter}
                                        </span>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${filter === 'Unread'
                                                    ? 'bg-green-500 text-white'
                                                    : filter === 'Mentions'
                                                        ? 'bg-red-500 text-white'
                                                        : filter === 'Campaigns'
                                                            ? 'bg-red-500 text-white'
                                                            : filter === 'Influencers'
                                                                ? 'bg-red-500 text-white'
                                                                : filter === 'Alerts'
                                                                    ? 'bg-orange-500 text-white'
                                                                    : 'bg-red-500 text-white'
                                                }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Recent Alerts */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Recent alerts and updates</h2>
                                <p className="text-sm text-gray-500 mt-1">Last updated 2m ago</p>
                            </div>

                            {/* Table Header */}
                            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                                <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    <div className="col-span-5">Title</div>
                                    <div className="col-span-2">Type</div>
                                    <div className="col-span-2">Source</div>
                                    <div className="col-span-1">Time</div>
                                    <div className="col-span-2">Actions</div>
                                </div>
                            </div>

                            {/* Notifications List */}
                            <div className="divide-y divide-gray-200">
                                {notifications.map((notification) => (
                                    <div key={notification.id} className="p-6 hover:bg-gray-50">
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            {/* Title with Icon */}
                                            <div className="col-span-5 flex items-center space-x-3">
                                                <notification.icon className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-900">
                                                    {notification.title}
                                                </span>
                                            </div>

                                            {/* Type Badge */}
                                            <div className="col-span-2">
                                                <span
                                                    className={`inline-block px-2 py-1 text-xs font-medium text-white rounded ${notification.badgeColor}`}
                                                >
                                                    {notification.badge}
                                                </span>
                                            </div>

                                            {/* Source */}
                                            <div className="col-span-2">
                                                <span className="text-sm text-gray-600">{notification.source}</span>
                                            </div>

                                            {/* Time */}
                                            <div className="col-span-1">
                                                <span className="text-sm text-gray-500">{notification.time}</span>
                                            </div>

                                            {/* Actions */}
                                            <div className="col-span-2 flex items-center space-x-2">
                                                {notification.actions.map((action, actionIndex) => (
                                                    <button
                                                        key={actionIndex}
                                                        className={`px-3 py-1 text-xs rounded ${action === 'Mark read'
                                                                ? 'text-gray-600 hover:bg-gray-100'
                                                                : action === 'Mute'
                                                                    ? 'text-gray-600 hover:bg-gray-100'
                                                                    : 'text-blue-600 hover:bg-blue-50'
                                                            }`}
                                                    >
                                                        {action}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Digest Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Digest</h3>
                            <p className="text-sm text-gray-500 mb-6">Highlights at a glance</p>

                            <div className="space-y-6">
                                {digestItems.map((item, index) => (
                                    <div key={index}>
                                        <div className="text-sm text-gray-600 mb-1">{item.title}</div>
                                        <div className="text-2xl font-bold text-gray-900 mb-2">{item.count}</div>
                                        <div className={`text-xs text-white px-2 py-1 rounded ${item.badgeColor} inline-block`}>
                                            {item.badge}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;
