// app/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login
    router.push("/login");
  }, [router]);

  // Show nothing while redirecting
  return null;
}
