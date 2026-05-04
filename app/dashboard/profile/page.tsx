// app/dashboard/profile/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Profile | Auth Dashboard",
  description: "User profile page",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-100">Profile</h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage your profile information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-center">Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-100">Demo User</h3>
            <p className="text-gray-500 text-sm">demo@example.com</p>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-50">
                  Full Name
                </label>
                <p className="text-gray-500 mt-1">Demo User</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-50">
                  Email
                </label>
                <p className="text-gray-500 mt-1">demo@example.com</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-50">Role</label>
                <p className="text-gray-500 mt-1">Administrator</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-50">
                  Joined
                </label>
                <p className="text-gray-500 mt-1">January 1, 2024</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <Button size="sm" className="text-sm">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-300">Password</h4>
              <p className="text-sm text-gray-500">Last changed 30 days ago</p>
            </div>
            <Button variant="secondary" size="sm">
              Change Password
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-700 flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-300">
                Two-Factor Authentication
              </h4>
              <p className="text-sm text-gray-500">Not enabled</p>
            </div>
            <Button variant="secondary" size="sm">
              Enable 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-700 last:border-b-0">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-300">Logged in</p>
                <p className="text-xs text-gray-500">Today at 10:30 AM</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-gray-700 last:border-b-0">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-300">Profile updated</p>
                <p className="text-xs text-gray-500">Yesterday at 2:15 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-300">Password changed</p>
                <p className="text-xs text-gray-500">5 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
