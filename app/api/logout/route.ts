import { NextResponse } from "next/server";
import { createClearAuthCookie } from "@/lib/auth";

// ✅ handle preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders(),
  });
}

export async function POST(): Promise<NextResponse> {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      {
        status: 200,
        headers: corsHeaders(), // ✅ ADD THIS
      },
    );

    response.headers.set("Set-Cookie", createClearAuthCookie());

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during logout",
      },
      {
        status: 500,
        headers: corsHeaders(), // ✅ ADD THIS
      },
    );
  }
}

// ✅ reusable
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
