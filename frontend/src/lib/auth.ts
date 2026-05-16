export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'RESPONSABLE_GARAGE' | 'RESPONSABLE_SHOWROOM' | 'RECEPTIONNISTE' | 'TECHNICIEN' | 'COMPTABLE';

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  site: 'Garage' | 'Showroom' | 'Tous';
  createdAt: string;
};

export type AuthResponse = {
  user: User;
  token: string;
  type: 'bearer';
};

// Permissions par rôle
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SUPER_ADMIN: [
    'view_all',
    'create_user',
    'edit_user',
    'delete_user',
    'reset_password',
    'assign_role',
    'view_dashboard',
    'view_showroom',
    'view_garage',
    'view_clients',
    'view_facturation',
    'view_stock',
    'view_rapports',
    'view_users',
  ],
  ADMIN: [
    'view_all',
    'create_user',
    'edit_user',
    'delete_user',
    'reset_password',
    'view_dashboard',
    'view_showroom',
    'view_garage',
    'view_clients',
    'view_facturation',
    'view_stock',
    'view_rapports',
    'view_users',
  ],
  RESPONSABLE_GARAGE: [
    'view_garage',
    'manage_repairs',
    'view_techniciens',
    'view_transfers',
  ],
  RESPONSABLE_SHOWROOM: [
    'view_showroom',
    'manage_vehicles',
    'manage_sales',
    'view_transfers',
  ],
  RECEPTIONNISTE: [
    'view_clients',
    'manage_rendez_vous',
    'view_vehicle_reception',
  ],
  TECHNICIEN: [
    'view_garage',
    'view_assigned_repairs',
    'update_repair_status',
  ],
  COMPTABLE: [
    'view_facturation',
    'manage_invoices',
    'view_payments',
    'view_rapports',
  ],
};

export const getLocalStorage = () => {
  if (typeof window === 'undefined') return null;
  return {
    getUser: () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
    getToken: () => localStorage.getItem('token'),
    setAuth: (user: User, token: string) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    clearAuth: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  };
};

export const hasPermission = (userRole: UserRole, permission: string): boolean => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) ?? false;
};

export const hasAnyPermission = (userRole: UserRole, permissions: string[]): boolean => {
  return permissions.some((perm) => hasPermission(userRole, perm));
};
