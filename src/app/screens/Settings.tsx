import { Bell, Lock, Mail, Moon, Sun } from "lucide-react";

export function Settings() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your account preferences and settings</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          <button className="pb-3 px-1 border-b-2 border-blue-600 text-sm font-semibold text-blue-600">
            Account Settings
          </button>
          <button className="pb-3 px-1 text-sm font-medium text-gray-600 hover:text-gray-900">
            Notification Preferences
          </button>
          <button className="pb-3 px-1 text-sm font-medium text-gray-600 hover:text-gray-900">
            Theme Preferences
          </button>
        </div>
      </div>

      {/* Account Settings Tab */}
      <div className="max-w-2xl">
        {/* Change Password */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Confirm new password"
              />
            </div>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              Update Password
            </button>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Email Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Request Updates</div>
                <div className="text-sm text-gray-600">Get notified when your requests are updated</div>
              </div>
              <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Ticket Updates</div>
                <div className="text-sm text-gray-600">Get notified about ticket status changes</div>
              </div>
              <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Reminders</div>
                <div className="text-sm text-gray-600">Receive reminders for return dates</div>
              </div>
              <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">Enable 2FA</div>
              <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
            </div>
            <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
              Enable
            </button>
          </div>
        </div>

        {/* Theme Preferences */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sun className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Dark Mode</div>
                <div className="text-sm text-gray-600">Switch between light and dark themes</div>
              </div>
              <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Compact View</div>
                <div className="text-sm text-gray-600">Display more content on screen</div>
              </div>
              <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
