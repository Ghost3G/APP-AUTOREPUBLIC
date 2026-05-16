'use client';

import { useAuth } from '@/src/lib/authContext';
import type { UserRole } from '@/src/lib/auth';
import { hasPermission } from '@/src/lib/auth';

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallback?: React.ReactNode;
}

/**
 * Composant pour afficher du contenu seulement si l'utilisateur a les bonnes permissions
 */
export function RoleGuard({ children, requiredRoles, fallback }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return fallback || null;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return fallback || null;
  }

  return <>{children}</>;
}

interface PermissionGuardProps {
  children: React.ReactNode;
  permission: string;
  fallback?: React.ReactNode;
}

/**
 * Composant pour afficher du contenu seulement si l'utilisateur a une permission spécifique
 */
export function PermissionGuard({ children, permission, fallback }: PermissionGuardProps) {
  const { user } = useAuth();

  if (!user || !hasPermission(user.role, permission)) {
    return fallback || null;
  }

  return <>{children}</>;
}
