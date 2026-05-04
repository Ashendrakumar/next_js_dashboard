// components/auth/LoginForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { apiPost } from "@/lib/api";
import { LoginResponse } from "@/types/auth";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);

      const response = await apiPost<LoginResponse>("/api/login", {
        email: data.email,
        password: data.password,
      });

      if (response.success) {
        // Reset form
        reset();

        // Small delay to ensure cookie is set
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Refresh to get new cookies from server
        router.refresh();

        // Wait a bit more for refresh to complete
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Then redirect to dashboard
        router.push("/dashboard");
      } else {
        setApiError(response.success || "Login failed");
      }
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-6">
      {apiError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {apiError}
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        placeholder="demo@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button type="submit" loading={isLoading} className="w-full ">
        Sign In
      </Button>
    </form>
  );
}
