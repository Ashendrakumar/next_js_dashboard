// app/dashboard/page.tsx

import { UserTableContainer } from "@/components/dashboard/UserTableContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export const metadata = {
  title: "Dashboard | Auth System",
  description: "User management dashboard",
};

// Disable static generation for this page (requires auth)
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Users</h2>
        <p className="text-gray-600 text-sm mt-1">
          Manage and view all users in the system
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            User Directory
          </CardTitle>
        </CardHeader>

        <CardContent>
          <UserTableContainer />
        </CardContent>
      </Card>
    </div>
  );
}
