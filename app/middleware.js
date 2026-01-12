// middleware.js (in root directory)
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client'

export async function middleware(req) {
  const res = NextResponse.next();
  
  const { data: { session } } = await supabase.auth.getSession();
  
  // If not logged in and trying to access protected route
  if (!session && req.nextUrl.pathname.startsWith('/chat')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // If logged in and trying to access login page
  if (session && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/chat', req.url));
  }
  
  // If logged in and on root, redirect to /chat
  if (session && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/chat', req.url));
  }
  
  return res;
}

export const config = {
  matcher: ['/chat/:path*', '/login', '/']
};