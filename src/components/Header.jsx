import React, { useState } from 'react';
import { LogOut, Bell, Search, Settings, TrendingUp, MessageCircle, Users, X, Check, Plus, User, CreditCard, HelpCircle, FileText, ChevronRight, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../assets/profile-image.png';

// For demo purposes, using a placeholder image
// const profileImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23e5e7eb'/%3E%3Cpath d='M16 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 10c-3.314 0-6 2.686-6 6v2h12v-2c0-3.314-2.686-6-6-6z' fill='%239ca3af'/%3E%3C/svg%3E";

const Header = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Campaign ROI up 12%',
      description: 'Your "Q3 Brand Lift" campaign shows improved efficiency vs last week.',
      time: '5m ago',
      icon: TrendingUp,
    },
    {
      id: 2,
      title: 'PR Mention: TechDaily',
      description: 'Feature article published: "How TruBitX automates media intelligence".',
      time: '15m ago',
      icon: MessageCircle,
    },
    {
      id: 3,
      title: 'Influencer Spike Detected',
      description: '@ava.media drove 32% of engagement in the last 24 hours.',
      time: '1h ago',
      icon: Users,
    },
  ];

  const handleProfileClick = (action) => {
    setShowProfileDropdown(false);
    
    // Replace with your actual navigation logic
    console.log(`Navigate to: ${action}`);
    
    switch(action) {
      case 'profile':
         navigate('/profile');
        break;
      case 'billing':
        navigate('/billing');
        break;
      case 'settings':
        navigate('/plan');
        break;
      case 'help':
        // navigate('/help');
        break;
      case 'docs':
        // navigate('/docs');
        break;
      case 'signout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 rounded-lg relative">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Search */}
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <div onClick={() => navigate("/dashboard")} className="flex items-center cursor-pointer">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  TR<span className="text-blue-600">U</span>BITX
                </h1>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search insights..."
                  className="pl-10 pr-4 py-2 w-80 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white text-sm"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4 relative">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border cursor-pointer"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {notifications.length}
                  </span>
                </button>
              </div>

              {/* Settings */}
              <button
                onClick={() => navigate('/settings')}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border cursor-pointer"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* Profile & Logout */}
              <div className="flex items-center space-x-3">
                <div 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="cursor-pointer w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Dropdown */}
      {showProfileDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowProfileDropdown(false)}
          ></div>

          {/* Dropdown Menu */}
          <div className="absolute top-16 right-4 z-50 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* User Info Section */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <img
                  src={profileImage}
                  alt="Alex Rivera"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">Alex Rivera</h3>
                  <p className="text-sm text-gray-500">alex@trubitx.io</p>
                </div>
              </div>
            </div>

            {/* Workspace Section */}
            <div className="p-4 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Workspace</p>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">TruBitX HQ</span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Default</span>
              </div>
              
              <button className="flex items-center space-x-3 w-full p-2 mt-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                <span>Create new workspace</span>
              </button>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={() => handleProfileClick('profile')}
                className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => handleProfileClick('billing')}
                className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <CreditCard className="w-4 h-4" />
                <span>Billing</span>
              </button>

              <button
                onClick={() => handleProfileClick('settings')}
                className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>

              <button
                onClick={() => handleProfileClick('help')}
                className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help Center</span>
              </button>

              <button
                onClick={() => handleProfileClick('docs')}
                className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Docs</span>
              </button>

              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={() => handleProfileClick('signout')}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Centered Notification Modal */}
      {showNotifications && (
        <>
          {/* Invisible Backdrop for outside click */}
          <div
            className="fixed inset-0 backdrop-blur-sm z-40"
            onClick={() => setShowNotifications(false)}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                </h3>
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-gray-600 hover:text-blue-600 flex items-center space-x-1 transition-colors">
                    <Check className="w-4 h-4" />
                    <span>Mark all read</span>
                  </button>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="divide-y max-h-96 overflow-y-auto">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div key={notification.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-gray-600" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-base font-medium text-gray-900 mb-1">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {notification.description}
                              </p>
                            </div>
                            <span className="ml-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium flex-shrink-0">
                              New
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t bg-gray-50">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    These alerts are synced to your dashboard metrics and AI Assistant. Click an item to open related insights.
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-400">
                    {notifications.length} unread • Alerts are kept for 30 days
                  </span>
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      console.log('Navigate to notification');
                    }}
                    className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span onClick={()=> navigate('/notification')}>View all notifications</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;