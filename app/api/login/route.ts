// app/api/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateToken, createAuthCookie } from '@/lib/auth';
import { LoginRequest, LoginResponse } from '@/types/auth';
import { DEMO_CREDENTIALS } from '@/lib/constants';

export async function POST(request: NextRequest): Promise<NextResponse<LoginResponse>> {
  try {
    const body: LoginRequest = await request.json();

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          success: false,
          token: '',
          user: { id: '', email: '', name: '' },
          error: 'Email and password are required',
        },
        { status: 400 }
      );
    }

    // Mock authentication
    // In production: hash password with bcrypt and check against database
    if (
      body.email !== DEMO_CREDENTIALS.email ||
      body.password !== DEMO_CREDENTIALS.password
    ) {
      return NextResponse.json(
        {
          success: false,
          token: '',
          user: { id: '', email: '', name: '' },
          error: 'Invalid email or password',
        },
        { status: 401 }
      );
    }

    // Create mock user (in production, fetch from database)
    const user = {
      id: '1',
      email: body.email,
      name: 'Demo User',
    };

    // Generate JWT token
    const token = generateToken(user);

    const response = NextResponse.json(
      {
        success: true,
        token,
        user,
      },
      { status: 200 }
    );

    // Set authentication cookie (HTTP-only, secure)
    response.headers.set('Set-Cookie', createAuthCookie(token));

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        token: '',
        user: { id: '', email: '', name: '' },
        error: 'An error occurred during login',
      },
      { status: 500 }
    );
  }
}
