import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isEditingMode } from './lib/tina-environment';

export function middleware(request: NextRequest) {
  const shouldUseDraftMode = isEditingMode(request);

  // Check if we're in editing mode
  if (shouldUseDraftMode) {
    // Prevent ISR caching (set no-store headers)
    const response = NextResponse.next();
    response.headers.set('x-tina-edit-mode', 'true');
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
