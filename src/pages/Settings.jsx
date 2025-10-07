import React, { useState } from 'react';
import {
  Settings, ArrowLeft, User, Shield, Bell, Users, CreditCard,
  Zap, Globe, Database, Webhook, Trash2, Eye, EyeOff,
  Twitter, Facebook, Instagram, Rss, Check, X
} from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';


const SettingsPage = ({ handleLogout }) => {
  const user = JSON.parse(sessionStorage.getItem('trubitx_user') || '{}');
  const [activeSection, setActiveSection] = useState('Profile');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [sentimentAlerts, setSentimentAlerts] = useState(true);
  const navigate = useNavigate();


  const sidebarItems = [
    {
      title: 'General', items: [
        { name: 'Profile', icon: User, active: true }
      ]
    },
    {
      title: 'Account', items: [
        { name: 'Security', icon: Shield },
        { name: 'Notifications', icon: Bell }
      ]
    },
    {
      title: '', items: [
        { name: 'Organization', icon: Users },
        { name: 'Members', icon: Users, path: '/members' },
        { name: 'Roles & access', icon: Shield },
        { name: 'Billing', icon: CreditCard }
      ]
    },
    {
      title: 'Integrations', items: [
        { name: 'Connected apps', icon: Zap },
        { name: 'Social platforms', icon: Globe },
        { name: 'Data sources', icon: Database },
        { name: 'Webhooks & API', icon: Webhook }
      ]
    },
    {
      title: '', items: [
        { name: 'Delete workspace', icon: Trash2, danger: true }
      ]
    }
  ];

  const connectedApps = [
    {
      name: 'X (Twitter)',
      status: 'Not connected',
      icon: Twitter,
      connected: false,
      action: 'Manage'
    },
    {
      name: 'Facebook',
      status: 'Account connected',
      icon: Facebook,
      connected: true,
      action: 'Manage'
    },
    {
      name: 'Instagram',
      status: 'Business account linked',
      icon: Instagram,
      connected: true,
      action: 'Manage'
    },
    {
      name: 'RSS Feeds',
      status: '3 sources',
      icon: Rss,
      connected: true,
      action: 'Configure'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-gray-700" />
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              <Check className="w-4 h-4" />
              <span>Save changes</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              {sidebarItems.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6 last:mb-0">
                  {section.title && (
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                      {section.title}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={() => {
                          if (item.path) {
                            navigate(item.path);
                          } else {
                            setActiveSection(item.name);
                          }
                        }}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${activeSection === item.name
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : item.danger
                              ? 'text-red-600 hover:bg-red-50'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

              {/* Profile Section */}
              {activeSection === 'Profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Profile</h2>
                    <p className="text-sm text-gray-500 mb-6">Manage your personal information and preferences</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full name:</label>
                        <input
                          type="text"
                          defaultValue="Jane Cooper"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                        <input
                          type="email"
                          defaultValue="jane@trubitx.ai"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job title:</label>
                        <input
                          type="text"
                          defaultValue="PR Manager"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time zone:</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>GMT-5 (Chicago)</option>
                          <option>GMT-8 (Pacific)</option>
                          <option>GMT-5 (Eastern)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">Two-factor authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-green-600 mr-2">Enabled</span>
                        <div className={`w-12 h-6 rounded-full ${twoFactorEnabled ? 'bg-green-500' : 'bg-gray-300'} relative cursor-pointer`}>
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Weekly email digest</h3>
                        <p className="text-sm text-gray-500">Get a weekly overview of alerts and performance highlights</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-green-600 mr-2">On</span>
                        <div className={`w-12 h-6 rounded-full ${weeklyDigest ? 'bg-green-500' : 'bg-gray-300'} relative cursor-pointer`}>
                          <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${weeklyDigest ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
                    <p className="text-sm text-gray-500 mb-6">Control how you receive alerts and updates</p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Push notifications</h3>
                          <p className="text-sm text-gray-500">Real-time alerts on critical events</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-green-600 mr-2">On</span>
                          <div className={`w-12 h-6 rounded-full ${pushNotifications ? 'bg-green-500' : 'bg-gray-300'} relative cursor-pointer`}>
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${pushNotifications ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Mentions threshold</h3>
                          <p className="text-sm text-gray-500">Trigger when mentions exceed 25/hr</p>
                        </div>
                        <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                          <option>25 per hour</option>
                          <option>50 per hour</option>
                          <option>100 per hour</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Sentiment alerts</h3>
                          <p className="text-sm text-gray-500">Notify on negative sentiment spikes</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-green-600 mr-2">Enabled</span>
                          <div className={`w-12 h-6 rounded-full ${sentimentAlerts ? 'bg-green-500' : 'bg-gray-300'} relative cursor-pointer`}>
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${sentimentAlerts ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Connected apps</h2>
                    <p className="text-sm text-gray-500 mb-6">Manage integrations with social platforms and data sources</p>

                    <div className="space-y-4">
                      {connectedApps.map((app, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <app.icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{app.name}</h3>
                              <p className="text-sm text-gray-500">{app.status}</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                            {app.action}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">API & Webhooks</h2>
                    <p className="text-sm text-gray-500 mb-6">Programmatic access for automation</p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">API key:</h3>
                          <p className="text-sm font-mono text-gray-500">sk_live_************</p>
                        </div>
                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                          Regenerate
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Webhook URL</h3>
                          <p className="text-sm text-gray-500">https://hooks.trubitx.ai/notifications</p>
                        </div>
                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                          Edit
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Signing secret</h3>
                          <p className="text-sm font-mono text-gray-500">whsec_*******</p>
                        </div>
                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                          Reveal
                        </button>
                      </div>

                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">docs.developers.trubitx.ai</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing</h2>
                    <p className="text-sm text-gray-500 mb-6">Plan, usage, and invoices</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Current plan</h3>
                        <p className="text-sm text-gray-500 mb-2">Pro — 12 seats</p>
                        <button className="text-sm text-blue-600 hover:text-blue-800">Change plan</button>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Next invoice</h3>
                        <p className="text-sm text-gray-500 mb-2">Feb 15, 2025 — $480</p>
                        <button className="text-sm text-blue-600 hover:text-blue-800">View invoices</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;