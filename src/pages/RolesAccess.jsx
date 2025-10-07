import React, { useState } from 'react';
import { 
  Shield, ArrowLeft, Plus, Download, Settings2, Search, 
  ChevronDown, Check, Edit3, Eye, Minus, Users, Building2
} from 'lucide-react';
import Header from '../components/Header';

const RolesAccessPage = ({ handleLogout }) => {
  const user = JSON.parse(sessionStorage.getItem('trubitx_user') || '{}');
  const [activeSection, setActiveSection] = useState('Roles & access');

  const sidebarItems = [
    { title: 'Workspace', items: [
      { name: 'Organization', icon: Building2 }
    ]},
    { title: '', items: [
      { name: 'Overview', icon: Eye },
      { name: 'Members', icon: Users },
      { name: 'Roles & access', icon: Shield, active: true },
      { name: 'Billing', icon: Settings2 }
    ]},
    { title: 'Tools', items: [
      { name: 'Integrations', icon: Settings2 },
      { name: 'Social platforms', icon: Settings2 },
      { name: 'Data sources', icon: Settings2 }
    ]}
  ];

  const roleTemplates = [
    {
      role: 'Owner',
      dashboards: 'Full',
      campaigns: 'Full', 
      dataSources: 'Manage',
      members: 'Manage',
      dashboardsIcon: 'check',
      campaignsIcon: 'check',
      dataSourcesIcon: 'check',
      membersIcon: 'check'
    },
    {
      role: 'Admin',
      dashboards: 'Edit',
      campaigns: 'Manage',
      dataSources: 'Connect',
      members: 'Invite',
      dashboardsIcon: 'check',
      campaignsIcon: 'edit',
      dataSourcesIcon: 'minus',
      membersIcon: 'check'
    },
    {
      role: 'Editor',
      dashboards: 'Edit',
      campaigns: 'Edit',
      dataSources: 'View',
      members: 'View',
      dashboardsIcon: 'edit',
      campaignsIcon: 'edit',
      dataSourcesIcon: 'minus',
      membersIcon: 'minus'
    },
    {
      role: 'Analyst',
      dashboards: 'View',
      campaigns: 'Edit',
      dataSources: 'View',
      members: 'View',
      dashboardsIcon: 'view',
      campaignsIcon: 'edit',
      dataSourcesIcon: 'minus',
      membersIcon: 'minus'
    },
    {
      role: 'Viewer',
      dashboards: 'View',
      campaigns: 'View',
      dataSources: 'None',
      members: 'None',
      dashboardsIcon: 'view',
      campaignsIcon: 'view',
      dataSourcesIcon: 'none',
      membersIcon: 'none'
    }
  ];

  const accessGroups = [
    {
      group: 'PR Leadership',
      dashboards: 'Manage',
      campaigns: 'Manage',
      datasets: 'View',
      members: 'Assign',
      dashboardsIcon: 'check',
      campaignsIcon: 'check',
      datasetsIcon: 'minus'
    },
    {
      group: 'Analyst Team',
      dashboards: 'Edit',
      campaigns: 'Edit',
      datasets: 'View',
      members: 'Assign',
      dashboardsIcon: 'edit',
      campaignsIcon: 'edit',
      datasetsIcon: 'minus'
    },
    {
      group: 'External Stakeholders',
      dashboards: 'View',
      campaigns: 'View',
      datasets: 'None',
      members: 'Assign',
      dashboardsIcon: 'view',
      campaignsIcon: 'view',
      datasetsIcon: 'none'
    }
  ];

  const getPermissionIcon = (iconType) => {
    switch (iconType) {
      case 'check':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'edit':
        return <Edit3 className="w-4 h-4 text-blue-600" />;
      case 'view':
        return <Eye className="w-4 h-4 text-gray-600" />;
      case 'minus':
        return <Minus className="w-4 h-4 text-gray-400" />;
      case 'none':
        return <span className="w-4 h-4 flex items-center justify-center text-gray-400">○</span>;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} handleLogout={handleLogout} />
      
      <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-gray-700" />
            <h1 className="text-2xl font-bold text-gray-900">Roles & Access</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to members</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              <span>New role</span>
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
            
            {/* Role Templates Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Role templates</h2>
                    <p className="text-sm text-gray-500 mt-1">Define permissions for each role used across TruBitX</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      <Settings2 className="w-4 h-4" />
                      <span>Manage policies</span>
                    </button>
                  </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search roles"
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Scope:</span>
                    <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      <span>Workspace</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      <span>Name</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Roles Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Role</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Dashboards</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Campaigns</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Data sources</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Members</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {roleTemplates.map((role, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <span className="font-medium text-gray-900">{role.role}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {getPermissionIcon(role.dashboardsIcon)}
                            <span className="text-sm text-gray-700">{role.dashboards}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {getPermissionIcon(role.campaignsIcon)}
                            <span className="text-sm text-gray-700">{role.campaigns}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {getPermissionIcon(role.dataSourcesIcon)}
                            <span className="text-sm text-gray-700">{role.dataSources}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {getPermissionIcon(role.membersIcon)}
                            <span className="text-sm text-gray-700">{role.members}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Section */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <div>
                      <h3 className="font-medium text-gray-900">Default role for new members</h3>
                      <p className="text-sm text-gray-500">Viewer</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800">Change</button>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div>
                      <h3 className="font-medium text-gray-900">SCIM/SSO provisioning</h3>
                      <p className="text-sm text-gray-500">Provisioning enabled via Okta</p>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800">Configure</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Access Groups Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Access groups</h2>
                    <p className="text-sm text-gray-500 mt-1">Bundle permissions and assign to many users</p>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                    <span>New group</span>
                  </button>
                </div>
              </div>

              {/* Groups Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Group</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Dashboards</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Campaigns</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Datasets</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Members</th>
                      <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {accessGroups.map((group, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <span className="font-medium text-gray-900">{group.group}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {getPermissionIcon(group.dashboardsIcon)}
                            <span className="text-sm text-gray-700">{group.dashboards}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {getPermissionIcon(group.campaignsIcon)}
                            <span className="text-sm text-gray-700">{group.campaigns}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {getPermissionIcon(group.datasetsIcon)}
                            <span className="text-sm text-gray-700">{group.datasets}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-700">{group.members}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded">
                              Assign
                            </button>
                            <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded">
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolesAccessPage;