import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-please-change-in-production';
const key = new TextEncoder().encode(JWT_SECRET);

export async function createSession() {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key);

  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function verifySession(request?: NextRequest) {
  let token;
  if (request) {
    token = request.cookies.get('admin_session')?.value;
  } else {
    const cookieStore = await cookies();
    token = cookieStore.get('admin_session')?.value;
  }

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}
