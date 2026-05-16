import { NextRequest, NextResponse } from 'next/server';

// Routes publiques
const publicRoutes = ['/auth/login'];

// Routes protégées par rôle
const roleBasedRoutes: Record<string, string[]> = {
  '/users': ['SUPER_ADMIN', 'ADMIN'],
  '/dashboard': ['SUPER_ADMIN', 'ADMIN', 'RESPONSABLE_GARAGE', 'RESPONSABLE_SHOWROOM', 'RECEPTIONNISTE', 'TECHNICIEN', 'COMPTABLE'],
  '/clients': ['SUPER_ADMIN', 'ADMIN', 'RESPONSABLE_SHOWROOM', 'RECEPTIONNISTE'],
  '/garage': ['SUPER_ADMIN', 'ADMIN', 'RESPONSABLE_GARAGE', 'TECHNICIEN'],
  '/showroom': ['SUPER_ADMIN', 'ADMIN', 'RESPONSABLE_SHOWROOM'],
  '/facturation': ['SUPER_ADMIN', 'ADMIN', 'COMPTABLE'],
  '/stock': ['SUPER_ADMIN', 'ADMIN', 'RESPONSABLE_GARAGE'],
  '/importations': ['SUPER_ADMIN', 'ADMIN', 'RESPONSABLE_GARAGE', 'RESPONSABLE_SHOWROOM'],
  '/transfers': ['SUPER_ADMIN', 'ADMIN', 'RESPONSABLE_GARAGE', 'RESPONSABLE_SHOWROOM'],
  '/rapports': ['SUPER_ADMIN', 'ADMIN', 'COMPTABLE'],
  '/rendezvous': ['SUPER_ADMIN', 'ADMIN', 'RESPONSABLE_GARAGE', 'RECEPTIONNISTE'],
  '/techniciens': ['SUPER_ADMIN', 'ADMIN', 'RESPONSABLE_GARAGE'],
  '/parametres': ['SUPER_ADMIN', 'ADMIN'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes publiques
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Vérifier le token
  const token = request.cookies.get('auth_token')?.value;
  const userStr = request.cookies.get('auth_user')?.value;

  if (!token || !userStr) {
    // Rediriger vers login si pas de token
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    const user = JSON.parse(userStr);

    // Vérifier les permissions par rôle
    for (const [route, allowedRoles] of Object.entries(roleBasedRoutes)) {
      if (pathname.startsWith(route)) {
        if (!allowedRoles.includes(user.role)) {
          // Rediriger vers dashboard si accès refusé
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Erreur lors du parsing du user:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
