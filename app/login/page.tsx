// app/login/page.tsx

import LoginForm from '@/components/auth/LoginForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = {
  title: 'Login | Auth Dashboard',
  description: 'Sign in to your account',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-[#475569]">
          <CardHeader className="border-b border-[#475569] bg-gradient-to-r from-[#1e293b] to-[#0f172a]">
            <CardTitle className="text-2xl text-center text-[#f1f5f9]">Sign In</CardTitle>
            <p className="text-center text-[#cbd5e1] text-sm mt-2">
              Enter your credentials to access the dashboard
            </p>
          </CardHeader>

          <CardContent className="pt-6">
            <LoginForm />
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-[#94a3b8] space-y-2">
          <p>Demo Application</p>
          <p className="font-semibold">
            Email: <span className="font-mono text-blue-400">demo@example.com</span>
          </p>
          <p className="font-semibold">
            Password: <span className="font-mono text-blue-400">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
