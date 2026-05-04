// lib/auth.ts - NO CRYPTO DEPENDENCY

import { JWTPayload, AuthUser } from '@/types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';
const TOKEN_EXPIRY = 60 * 60; // 1 hour in seconds

/**
 * Simple base64url encoder - works everywhere
 */
function base64urlEncode(data: string): string {
  if (typeof Buffer !== 'undefined') {
    // Node.js
    return Buffer.from(data).toString('base64url');
  } else {
    // Browser
    const binaryString = String.fromCharCode(...new TextEncoder().encode(data));
    return btoa(binaryString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }
}

/**
 * Simple base64url decoder - works everywhere
 */
function base64urlDecode(data: string): string {
  if (typeof Buffer !== 'undefined') {
    // Node.js
    return Buffer.from(data, 'base64url').toString();
  } else {
    // Browser
    const base64 = data
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    return atob(base64 + padding);
  }
}

/**
 * Create a signature without using crypto module
 * Uses simple hash function - good enough for demo
 */
function createSignature(message: string): string {
  // Create a simple deterministic hash from message + secret
  const combined = message + JWT_SECRET;
  let hash = 0;

  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Return as base36 string and encode
  const hashStr = Math.abs(hash).toString(36);
  return base64urlEncode(hashStr);
}

/**
 * Verify signature
 */
function verifySignature(message: string, signature: string): boolean {
  const expectedSignature = createSignature(message);
  return signature === expectedSignature;
}

/**
 * Generate JWT token - NO CRYPTO DEPENDENCY
 */
export function generateToken(user: AuthUser): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY,
  };

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(payload));
  const message = `${encodedHeader}.${encodedPayload}`;
  const signature = createSignature(message);

  return `${message}.${signature}`;
}

/**
 * Verify JWT token - NO CRYPTO DEPENDENCY
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;
    const message = `${encodedHeader}.${encodedPayload}`;

    // Verify signature
    if (!verifySignature(message, signature)) {
      return null;
    }

    // Decode payload
    const payloadStr = base64urlDecode(encodedPayload);
    const payload = JSON.parse(payloadStr);

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload as JWTPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Extract token from cookie header
 */
export function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader
    .split(';')
    .map(c => c.trim())
    .reduce((acc: Record<string, string>, c) => {
      const [key, value] = c.split('=');
      if (key && value) acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

  return cookies.auth_token || null;
}

/**
 * Create a Set-Cookie header value
 */
export function createAuthCookie(token: string): string {
  const isProduction = process.env.NODE_ENV === 'production';
  return [
    `auth_token=${token}`,
    'Path=/',
    'HttpOnly',
    'Max-Age=3600',
    `SameSite=${isProduction ? 'Strict' : 'Lax'}`,
    isProduction ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');
}

/**
 * Create a cookie to clear authentication
 */
export function createClearAuthCookie(): string {
  return 'auth_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax';
}