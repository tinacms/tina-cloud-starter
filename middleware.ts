import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isEditingMode } from './lib/tina-environment';

export function middleware(request: NextRequest) {
  // Check if we're in editing mode
  if (isEditingMode(request)) {
    console.log('Editing mode detected', request.url);

    // Clone the response
    const response = NextResponse.next();
    
    // Set cache control headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
  }
  
  // For non-editing mode, let Next.js handle caching normally
  return NextResponse.next();
}

export const config = {
// Apply middleware to app routes
  matcher: '/((?!admin|api|_next/static|_next/image|uploads|favicon.ico).*)',
};
