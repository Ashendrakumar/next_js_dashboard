// components/auth/LogoutButton.tsx

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { apiPost } from "@/lib/api";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      await apiPost("/api/logout");

      // Redirect to login
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect even if logout fails
      router.push("/login");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      loading={isLoading}
    >
      Logout
    </Button>
  );
}
