// app/api/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { generateToken, createAuthCookie } from "@/lib/auth";
import { LoginRequest, LoginResponse } from "@/types/auth";
import { DEMO_CREDENTIALS } from "@/lib/constants";
export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponse>> {
  try {
    const body: LoginRequest = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          success: false,
          token: "",
          user: { id: "", email: "", name: "" },
          error: "Email and password are required",
        },
        {
          status: 400,
          headers: corsHeaders(),
        },
      );
    }

    if (
      body.email !== DEMO_CREDENTIALS.email ||
      body.password !== DEMO_CREDENTIALS.password
    ) {
      return NextResponse.json(
        {
          success: false,
          token: "",
          user: { id: "", email: "", name: "" },
          error: "Invalid email or password",
        },
        {
          status: 401,
          headers: corsHeaders(),
        },
      );
    }

    const user = {
      id: "1",
      email: body.email,
      name: "Demo User",
    };

    const token = generateToken(user);

    const response = NextResponse.json(
      {
        success: true,
        token,
        user,
      },
      {
        status: 200,
        headers: corsHeaders(),
      },
    );

    response.headers.set("Set-Cookie", createAuthCookie(token));

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        token: "",
        user: { id: "", email: "", name: "" },
        error: "An error occurred during login",
      },
      {
        status: 500,
        headers: corsHeaders(),
      },
    );
  }
}

// ✅ Reusable CORS headers
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
