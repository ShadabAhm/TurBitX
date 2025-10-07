import React, { useState } from 'react';
import { 
  Users, ArrowLeft, UserPlus, Download, Filter, Search, 
  ChevronDown, MoreHorizontal, Send
} from 'lucide-react';
import Header from '../components/Header';

const Members = ({ handleLogout }) => {
  const user = JSON.parse(sessionStorage.getItem('trubitx_user') || '{}');
  const [activeSection, setActiveSection] = useState('Members');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [inviteEmails, setInviteEmails] = useState('');
  const [inviteRole, setInviteRole] = useState('Viewer');

  const sidebarItems = [
    { title: 'Workspace', items: [
      { name: 'Organization', icon: Users }
    ]},
    { title: '', items: [
      { name: 'Overview', icon: Users },
      { name: 'Members', icon: Users, active: true },
      { name: 'Roles & access', icon: Users },
      { name: 'Billing', icon: Users }
    ]},
    { title: 'Tools', items: [
      { name: 'Integrations', icon: Users },
      { name: 'Social platforms', icon: Users },
      { name: 'Data sources', icon: Users }
    ]}
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Jane Cooper',
      email: 'jane@trubitx.ai',
      role: 'Owner',
      status: 'Active',
      avatar: '👩‍💼',
      avatarBg: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Devon Lane',
      email: 'devon@trubitx.ai',
      role: 'Admin',
      status: 'Active',
      avatar: '👨‍💻',
      avatarBg: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Courtney Henry',
      email: 'courtney@trubitx.ai',
      role: 'Analyst',
      status: 'Active',
      avatar: '👩‍🔬',
      avatarBg: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Eleanor Pena',
      email: 'eleanor@trubitx.ai',
      role: 'Viewer',
      status: 'Invited',
      avatar: '👩‍🎨',
      avatarBg: 'bg-pink-500'
    },
    {
      id: 5,
      name: 'Wade Warren',
      email: 'wade@trubitx.ai',
      role: 'Editor',
      status: 'Active',
      avatar: '👨‍🎯',
      avatarBg: 'bg-orange-500'
    }
  ];

  const getStatusBadge = (status) => {
    if (status === 'Active') {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>;
    } else if (status === 'Invited') {
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Invited</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">{status}</span>;
  };

  const getActionButtons = (member) => {
    if (member.status === 'Invited') {
      return (
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded">
            Resend
          </button>
          <button className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded">
            Revoke
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded">
          Manage
        </button>
        <button className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded">
          Remove
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} handleLogout={handleLogout} />
      
      <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-gray-700" />
            <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to settings</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              <UserPlus className="w-4 h-4" />
              <span>Invite members</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-full">
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
                        onClick={() => setActiveSection(item.name)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                          item.active || activeSection === item.name
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
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
          <div className="lg:col-span-3 space-y-6">
            
            {/* Team Directory Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Team directory</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage members, roles, and invitations</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      <span>Filters</span>
                    </button>
                  </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by name or email"
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      <span>Role: {selectedRole}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      <span>Status: {selectedStatus}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Members Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">#</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Name</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Email</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Role</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Status</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {teamMembers.map((member, index) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-500">{index + 1}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 ${member.avatarBg} rounded-full flex items-center justify-center text-white text-sm`}>
                              {member.avatar}
                            </div>
                            <span className="font-medium text-gray-900">{member.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-600">{member.email}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-700">{member.role}</span>
                        </td>
                        <td className="py-4 px-6">
                          {getStatusBadge(member.status)}
                        </td>
                        <td className="py-4 px-6">
                          {getActionButtons(member)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Stats */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <div>
                      <h3 className="font-medium text-gray-900">Pending invitations</h3>
                      <p className="text-sm text-gray-500">1 invite awaiting acceptance</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View invites</button>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div>
                      <h3 className="font-medium text-gray-900">Seat usage</h3>
                      <p className="text-sm text-gray-500">10 of 12 seats used</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800">Manage seats</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Invite Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick invite</h2>
                <p className="text-sm text-gray-500 mb-6">Add multiple members at once</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter emails separated by commas
                    </label>
                    <textarea
                      rows={4}
                      value={inviteEmails}
                      onChange={(e) => setInviteEmails(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="email1@company.com, email2@company.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select role: {inviteRole}
                    </label>
                    <select
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="Viewer">Viewer</option>
                      <option value="Editor">Editor</option>
                      <option value="Analyst">Analyst</option>
                      <option value="Admin">Admin</option>
                    </select>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      We will send an email invitation with a sign-up link.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                    <span>Send invites</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;