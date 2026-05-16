'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/lib/authContext';
import DashboardShell from '@/components/dashboard/Shell';
import { RoleGuard, PermissionGuard } from '@/components/RoleGuard';
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  // Rediriger vers login si pas authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <p className="text-slate-400">Chargement...</p>
      </div>
    );
  }

  return (
    <DashboardShell active="dashboard">
      <div className="space-y-8">
        {/* En-tête de bienvenue */}
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-slate-400">
            Bienvenue de retour
          </p>
          <h1 className="text-4xl font-bold text-white mt-2">
            {user.name}
          </h1>
          <p className="text-slate-400 mt-1">
            Vous êtes connecté en tant que{' '}
            <span className="font-semibold text-slate-200">{user.role}</span>
          </p>
        </div>

        {/* Cards de statistiques - Visibles à tous */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  Véhicules
                </p>
                <p className="mt-3 text-3xl font-bold text-white">847</p>
                <p className="mt-2 text-xs text-slate-500">+12% ce mois</p>
              </div>
              <div className="rounded-full bg-red-600/20 p-3 text-red-600">
                <TrendingUp size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  Clients
                </p>
                <p className="mt-3 text-3xl font-bold text-white">324</p>
                <p className="mt-2 text-xs text-slate-500">+8% ce mois</p>
              </div>
              <div className="rounded-full bg-blue-600/20 p-3 text-blue-600">
                <Users size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  Réparations
                </p>
                <p className="mt-3 text-3xl font-bold text-white">156</p>
                <p className="mt-2 text-xs text-slate-500">En cours</p>
              </div>
              <div className="rounded-full bg-yellow-600/20 p-3 text-yellow-600">
                <Clock size={20} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  Revenus
                </p>
                <p className="mt-3 text-3xl font-bold text-white">84.5K€</p>
                <p className="mt-2 text-xs text-slate-500">+24% ce mois</p>
              </div>
              <div className="rounded-full bg-green-600/20 p-3 text-green-600">
                <BarChart3 size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Section réservée aux admins */}
        <RoleGuard requiredRoles={['SUPER_ADMIN', 'ADMIN']}>
          <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-white mb-4">
              Administration
            </h2>
            <p className="text-slate-400 mb-4">
              Vous avez accès aux fonctionnalités d'administration.
            </p>
            <button className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-500 transition">
              Gérer les utilisateurs
            </button>
          </div>
        </RoleGuard>

        {/* Section réservée aux techniciens et responsables */}
        <PermissionGuard permission="manage_repairs">
          <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-white mb-4">
              Réparations en attente
            </h2>
            <p className="text-slate-400 mb-4">
              Vous avez accès à la gestion des réparations.
            </p>
            <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition">
              Voir les réparations
            </button>
          </div>
        </PermissionGuard>

        {/* Infos utilisateur */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-white mb-4">
            Informations de profil
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Email</span>
              <span className="font-semibold text-white">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rôle</span>
              <span className="font-semibold text-white">{user.role}</span>
            </div>
            {user.site && (
              <div className="flex justify-between">
                <span className="text-slate-400">Site</span>
                <span className="font-semibold text-white">{user.site}</span>
              </div>
            )}
            {user.createdAt && (
              <div className="flex justify-between">
                <span className="text-slate-400">Membre depuis</span>
                <span className="font-semibold text-white">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
