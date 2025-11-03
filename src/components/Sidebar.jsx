import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, BarChart3, Settings, FileText, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/brand-logo2.png';
import { authService } from '../services/authService';

const Sidebar = ({ isSidebarOpen, toggleSidebar, activeMenu, setActiveMenu }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [showProfileDropup, setShowProfileDropup] = useState(false);
  const dropupRef = useRef(null);
  const profileButtonRef = useRef(null);
  const navigate = useNavigate();

  // Get user data
  const user = authService.getUser() || {
    name: 'Guest User',
    email: 'guest@example.com',
    fullName: 'Guest User',
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'campaigns', label: 'Campaigns', icon: FileText, path: '/campaign' },
    { id: 'reports', label: 'Reports', icon: BarChart3, path: '/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/plans' },
  ];

  const toggleDropdown = (id) => setOpenDropdown(openDropdown === id ? null : id);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setShowProfileDropup(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      authService.clearAuth();
      navigate('/login');
    }
  };

  const handleMenuClick = (item) => {
    setActiveMenu(item.id);
    navigate(item.path);
    setOpenDropdown(null);
  };

  const getUserInitials = () => {
    if (user.fullName) return user.fullName.charAt(0).toUpperCase();
    if (user.name) return user.name.charAt(0).toUpperCase();
    if (user.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  const getUserDisplayName = () => user.fullName || user.name || user.email || user.username ||'User';
  const getUserEmail = () => user.email || 'user@example.com';

  // 🧠 Close dropup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropupRef.current &&
        !dropupRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setShowProfileDropup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'w-20' : 'w-64'
          } bg-gray-100 border-r border-gray-200 flex flex-col transition-all duration-300 relative`}
      >
        {/* Logo */}
        <div
          className="h-16 flex items-center justify-between px-4 border-b border-gray-200 relative"
          onMouseEnter={() => setIsHoveringLogo(true)}
          onMouseLeave={() => setIsHoveringLogo(false)}
        >
          {!isSidebarOpen && (
            <div className="flex items-center gap-2">
              <span className="py-6 flex justify-center items-center">
                <img src={logo} alt="TruBitX Logo" className="h-20 w-50 object-contain" />
              </span>
            </div>
          )}

          {isSidebarOpen && (
            <div
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto transition-all cursor-pointer"
              onClick={() => navigate('/dashboard')}
            >
              <span className="text-white font-bold text-sm">T</span>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => toggleSidebar(!isSidebarOpen)}
            className={`${isSidebarOpen ? 'absolute inset-0 flex items-center justify-center' : 'absolute right-2'} p-1.5 text-primary hover:bg-gray-100 rounded-lg transition-all cursor-pointer ${isSidebarOpen
              ? isHoveringLogo
                ? 'opacity-100 visible'
                : 'opacity-0 invisible'
              : 'opacity-100 visible'
              }`}
            title={isSidebarOpen ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className={`transform transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`}
            >
              <path d="M6.83496 3.99992C6.38353 4.00411 6.01421 4.0122 5.69824 4.03801C5.31232 4.06954 5.03904 4.12266 4.82227 4.20012L4.62207 4.28606C4.18264 4.50996 3.81498 4.85035 3.55859 5.26848L3.45605 5.45207C3.33013 5.69922 3.25006 6.01354 3.20801 6.52824C3.16533 7.05065 3.16504 7.71885 3.16504 8.66301V11.3271C3.16504 12.2712 3.16533 12.9394 3.20801 13.4618C3.25006 13.9766 3.33013 14.2909 3.45605 14.538L3.55859 14.7216C3.81498 15.1397 4.18266 15.4801 4.62207 15.704L4.82227 15.79C5.03904 15.8674 5.31234 15.9205 5.69824 15.9521C6.01398 15.9779 6.383 15.986 6.83398 15.9902L6.83496 3.99992ZM18.165 11.3271C18.165 12.2493 18.1653 12.9811 18.1172 13.5702C18.0745 14.0924 17.9916 14.5472 17.8125 14.9648L17.7295 15.1415C17.394 15.8 16.8834 16.3511 16.2568 16.7353L15.9814 16.8896C15.5157 17.1268 15.0069 17.2285 14.4102 17.2773C13.821 17.3254 13.0893 17.3251 12.167 17.3251H7.83301C6.91071 17.3251 6.17898 17.3254 5.58984 17.2773C5.06757 17.2346 4.61294 17.1508 4.19531 16.9716L4.01855 16.8896C3.36014 16.5541 2.80898 16.0434 2.4248 15.4169L2.27051 15.1415C2.03328 14.6758 1.93158 14.167 1.88281 13.5702C1.83468 12.9811 1.83496 12.2493 1.83496 11.3271V8.66301C1.83496 7.74072 1.83468 7.00898 1.88281 6.41985C1.93157 5.82309 2.03329 5.31432 2.27051 4.84856L2.4248 4.57317C2.80898 3.94666 3.36012 3.436 4.01855 3.10051L4.19531 3.0175C4.61285 2.83843 5.06771 2.75548 5.58984 2.71281C6.17898 2.66468 6.91071 2.66496 7.83301 2.66496H12.167C13.0893 2.66496 13.821 2.66468 14.4102 2.71281C15.0069 2.76157 15.5157 2.86329 15.9814 3.10051L16.2568 3.25481C16.8833 3.63898 17.394 4.19012 17.7295 4.84856L17.8125 5.02531C17.9916 5.44285 18.0745 5.89771 18.1172 6.41985C18.1653 7.00898 18.165 7.74072 18.165 8.66301V11.3271ZM8.16406 15.995H12.167C13.1112 15.995 13.7794 15.9947 14.3018 15.9521C14.8164 15.91 15.1308 15.8299 15.3779 15.704L15.5615 15.6015C15.9797 15.3451 16.32 14.9774 16.5439 14.538L16.6299 14.3378C16.7074 14.121 16.7605 13.8478 16.792 13.4618C16.8347 12.9394 16.835 12.2712 16.835 11.3271V8.66301C16.835 7.71885 16.8347 7.05065 16.792 6.52824C16.7605 6.14232 16.7073 5.86904 16.6299 5.65227L16.5439 5.45207C16.32 5.01264 15.9796 4.64498 15.5615 4.3886L15.3779 4.28606C15.1308 4.16013 14.8165 4.08006 14.3018 4.03801C13.7794 3.99533 13.1112 3.99504 12.167 3.99504H8.16406C8.16407 3.99667 8.16504 3.99829 8.16504 3.99992L8.16406 15.995Z"></path>
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-6 flex flex-col justify-between">
          <div>
            {!isSidebarOpen && (
              <div className="px-4 mb-4">
                <span className="text-xs font-semibold text-gray-500 uppercase">Main</span>
              </div>
            )}
            <nav className="space-y-1 px-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${activeMenu === item.id
                      ? 'bg-blue-50 text-primary border-r-2 border-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                      } ${isSidebarOpen ? 'justify-center' : ''}`}
                    title={isSidebarOpen ? item.label : ''}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isSidebarOpen && <span className="font-medium">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
          {/* Plan Info Section */}
          {!isSidebarOpen && (
            <div className="mt-6 px-3">
              <div className="relative overflow-hidden mt-2 bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm">
                {/* Decorative element */}
                <div className="relative">
                  {/* Plan Info */}
                  <div className="flex items-center mb-3">
                    
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Your Current Plan</p>
                      <p className="text-md font-bold text-gray-900">{user.plan || 'Free Plan'}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-3 mb-4 pb-3 border-b border-blue-100">
                    <div className="flex-1">
                      <p className="text-md text-gray-500 mb-0.5">Days Left</p>
                      <p className="text-md font-semibold text-gray-700">12</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => navigate('/plans')}
                      className="w-full px-3 py-2 bg-gradient-to-r from-primary to-primary text-white text-xs font-semibold rounded-lg hover:from-primary hover:to-primary transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Upgrade Your Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Profile Section */}
        <div className="border-t border-gray-200 p-3 relative">
          {/* Profile Dropup */}
          {showProfileDropup && (
            <div
              ref={dropupRef}
              className={`absolute bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 w-60 ${
                isSidebarOpen 
                  ? 'bottom-full left-full ml-2 mb-0' 
                  : 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
              }`}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-semibold">
                  {getUserInitials()}
                </div>
              </div>

              <div className="text-center mb-4">
                <h3 className="font-semibold text-gray-900 text-sm">{getUserDisplayName()}</h3>
                <p className="text-xs text-gray-400 mt-1">{getUserEmail()}</p>
                {user.plan && (
                  <p className="text-xs text-primary mt-2 bg-blue-50 px-2 py-1 rounded-full">
                    {user.plan} Plan
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <button
                  onClick={() => {
                    setShowProfileDropup(false);
                    navigate('/profile');
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-primary hover:text-white cursor-pointer transition-colors text-sm font-medium"
                >
                  <User size={16} />
                  View Profile
                </button>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}

          {/* Profile Button */}
          <button
            ref={profileButtonRef}
            onClick={() => setShowProfileDropup(!showProfileDropup)}
            className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors ${isSidebarOpen ? 'justify-center' : ''
              }`}
            title={isSidebarOpen ? getUserDisplayName() : ''}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold flex-shrink-0">
              {getUserInitials()}
            </div>
            {!isSidebarOpen && (
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold text-gray-900 truncate">
                  {getUserDisplayName()}
                </div>
                <div className="text-xs text-gray-700 truncate">{user.plan || 'Free Plan'}</div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
