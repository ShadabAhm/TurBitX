import React, { useState } from "react";


export default function Profile() {
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex@trubitx.io",
    company: "TruBitX",
    bio: "PR strategist focused on data-driven campaigns and brand intelligence.",
    recoveryEmail: "recovery@trubitx.io",
    timeZone: "GMT-5 (New York)",
    language: "English",
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">Dashboard &gt; Profile</div>
        <Button className="bg-blue-600 text-white">Save changes</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <Card className="p-4 col-span-1">
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex space-x-2">
                <Button variant="outline">Upload</Button>
                <Button variant="outline">Remove</Button>
              </div>
              <p className="text-xs text-gray-400">JPG or PNG, max 2MB</p>
            </div>

            <Input placeholder="First name" value={profile.firstName} />
            <Input placeholder="Last name" value={profile.lastName} />
            <Input placeholder="Email" value={profile.email} />
            <Input placeholder="Company" value={profile.company} />
            <textarea
              className="w-full border rounded-md p-2 text-sm"
              rows={3}
              value={profile.bio}
            />
          </CardContent>
        </Card>

        {/* Security and Preferences Section */}
        <Card className="p-4 col-span-2">
          <CardContent className="space-y-6">
            {/* Security */}
            <div className="space-y-2">
              <h2 className="font-semibold">Security</h2>
              <Input type="password" value="password" />
              <div className="flex justify-between items-center">
                <Input placeholder="Recovery email" value={profile.recoveryEmail} />
                <Button className="bg-blue-600 text-white">Enabled</Button>
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-2">
              <h2 className="font-semibold">Preferences</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Time zone" value={profile.timeZone} />
                <Input placeholder="Language" value={profile.language} />
              </div>
              <div className="flex justify-between items-center">
                <span>Email notifications</span>
                <Switch checked={profile.emailNotifications} />
              </div>
              <div className="flex justify-between items-center">
                <span>Push notifications</span>
                <Switch checked={profile.pushNotifications} />
              </div>
            </div>

            {/* Reset Account Security */}
            <div className="bg-red-600 text-white p-4 rounded-lg flex justify-between items-center">
              <span>Reset account security</span>
              <Button className="bg-white text-red-600 hover:bg-gray-100">Reset</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
