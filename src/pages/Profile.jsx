import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Shield,
  Bell,
  Lock,
  Trash2,
} from "lucide-react";
import ProfilePicture from "./ProfilePicture";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    bio: "Product designer passionate about creating beautiful and functional user experiences.",
    plan: "Premium Plan",
    avatar: null, // Placeholder will show when null
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleAvatarChange = (newAvatar) => {
    setProfileData({ ...profileData, avatar: newAvatar });
    setEditData({ ...editData, avatar: newAvatar });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-[#8AC539] via-[#8AC539] to-[#FFBE0A] relative">
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>

          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            {/* Avatar + Camera */}
            <div className="absolute -top-16 left-8">
              <ProfilePicture
                image={profileData.avatar}
                onChange={handleAvatarChange}
                userInitial={profileData.name.charAt(0)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4 gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </>
              )}
            </div>

            {/* Name and Bio */}
            <div className="mt-8">
              {!isEditing ? (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {profileData.name}
                  </h1>
                  <p className="text-gray-600 mb-4">{profileData.bio}</p>
                </>
              ) : (
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="text-3xl font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    className="text-gray-600 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                </div>
              )}

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-blue-500" />
                  {!isEditing ? (
                    <span className="text-sm">{profileData.email}</span>
                  ) : (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="text-sm bg-gray-50 border border-gray-300 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-green-500" />
                  {!isEditing ? (
                    <span className="text-sm">{profileData.phone}</span>
                  ) : (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="text-sm bg-gray-50 border border-gray-300 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-red-500" />
                  {!isEditing ? (
                    <span className="text-sm">{profileData.location}</span>
                  ) : (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      className="text-sm bg-gray-50 border border-gray-300 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-purple-500" />
                  <span className="text-sm">
                    Joined {profileData.joinDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section (unchanged) */}
       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 px-6">
              {["profile", "security", "notifications"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize transition-colors relative cursor-pointer ${
                    activeTab === tab
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Subscription Details
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                      <p className="text-2xl font-bold text-gray-900 mb-2">
                        {profileData.plan}
                      </p>
                      <p className="text-sm text-gray-600">
                        Valid until: December 31, 2025
                      </p>
                    </div>
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer">
                      Upgrade Plan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Password & Authentication
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Change Password
                        </p>
                        <p className="text-sm text-gray-600">
                          Last changed 3 months ago
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer">
                      Update
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Two-Factor Authentication
                        </p>
                        <p className="text-sm text-gray-600">
                          Add an extra layer of security
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium cursor-pointer">
                      Enable
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Danger Zone
                  </h3>
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Trash2 className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-red-900">
                            Delete Account
                          </p>
                          <p className="text-sm text-red-700">
                            Permanently delete your account and all data
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {[
                    "Email notifications",
                    "Push notifications",
                    "SMS alerts",
                    "Weekly digest",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <p className="font-medium text-gray-900">{item}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={index < 2}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
