// app/api/logout/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClearAuthCookie } from '@/lib/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logged out successfully',
      },
      { status: 200 }
    );

    // Clear authentication cookie
    response.headers.set('Set-Cookie', createClearAuthCookie());

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred during logout',
      },
      { status: 500 }
    );
  }
}
