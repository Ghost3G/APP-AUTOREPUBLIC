'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useAuth } from '@/src/lib/authContext';
import {
  Home,
  Car,
  Hammer,
  FileText,
  Truck,
  Layers,
  Users,
  CalendarDays,
  UserCheck,
  ArrowRightLeft,
  BarChart3,
  Settings,
  Bell,
  Menu,
  CircleDot,
  LogOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const navigation = [
  { label: 'Tableau de bord', href: '/dashboard', icon: Home, key: 'dashboard' },
  { label: 'Clients', href: '/clients', icon: Users, key: 'clients' },
  { label: 'Showroom', href: '/showroom', icon: Car, key: 'showroom' },
  { label: 'Garage / Atelier', href: '/garage', icon: Hammer, key: 'garage' },
  { label: 'Rendez-vous', href: '/rendezvous', icon: CalendarDays, key: 'rendezvous' },
  { label: 'Techniciens', href: '/techniciens', icon: UserCheck, key: 'techniciens' },
  { label: 'Stock pièces', href: '/stock', icon: Layers, key: 'stock' },
  { label: 'Devis & Facturation', href: '/facturation', icon: FileText, key: 'facturation' },
  { label: 'Importation', href: '/importations', icon: Truck, key: 'importations' },
  { label: 'Transferts', href: '/transfers', icon: ArrowRightLeft, key: 'transfers' },
  { label: 'Rapports', href: '/rapports', icon: BarChart3, key: 'rapports' },
  { label: 'Utilisateurs', href: '/users', icon: Users, key: 'users' },
  { label: 'Paramètres', href: '/parametres', icon: Settings, key: 'parametres' },
];

export default function DashboardShell({ children, active }: { children: ReactNode; active: string }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const pageLabels: Record<string, string> = {
    dashboard: 'Tableau de bord',
    clients: 'Clients',
    showroom: 'Showroom',
    garage: 'Garage / Atelier',
    rendezvous: 'Rendez-vous',
    techniciens: 'Techniciens',
    stock: 'Stock pièces',
    facturation: 'Devis & Facturation',
    importations: 'Importation',
    transfers: 'Transferts',
    rapports: 'Rapports',
    users: 'Gestion des utilisateurs',
    parametres: 'Paramètres',
  };

  const activeLabel = pageLabels[active] ?? 'AUTO REPUBLIC';
  const activeSite = active === 'garage' ? 'Garage' : 'Showroom';

  return (
    <div className="page-shell grid min-h-screen grid-cols-1 xl:grid-cols-[280px_1fr]">
      <aside className="relative border-r border-white/10 bg-slate-950/95 px-6 py-6 text-white shadow-soft">
        <div className="mb-8 flex items-center justify-between gap-3 rounded-[2.5rem] border border-white/10 bg-slate-900/95 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)]">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-base font-semibold uppercase tracking-[0.3em] text-white shadow-sm">
              AR
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-slate-400">AUTO REPUBLIC</p>
              <h2 className="text-2xl font-semibold tracking-tight text-white">MANAGER</h2>
            </div>
          </div>
          <button className="rounded-full border border-white/10 bg-slate-900/80 p-3 text-slate-300 transition hover:bg-slate-800">
            <Menu size={18} />
          </button>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === active;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-4 rounded-full px-5 py-4 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-red-600 text-white shadow-[0_20px_60px_rgba(217,4,41,0.22)]'
                    : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/90 p-4 text-sm text-slate-300 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Sites</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-4">
              <div className="flex items-center gap-3">
                <CircleDot size={14} className="text-red-500" />
                <p className="font-semibold text-white">Showroom</p>
              </div>
              <p className="mt-2 text-xs text-slate-500">123 Av. Commandement</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-4">
              <div className="flex items-center gap-3">
                <CircleDot size={14} className="text-sky-400" />
                <p className="font-semibold text-white">Garage / Atelier</p>
              </div>
              <p className="mt-2 text-xs text-slate-500">456 Av. By Pass</p>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-6 bottom-6 rounded-[2rem] border border-white/10 bg-slate-900/95 p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-sm font-semibold">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{user?.name || 'Admin'}</p>
              <p className="text-xs text-slate-500">{user?.role || 'Administrateur'}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              router.push('/auth/login');
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-900 hover:text-red-400"
          >
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </aside>

      <main className="min-h-screen bg-slate-950/90 px-6 py-6 xl:px-10 xl:py-8">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-900/90 p-5 shadow-soft">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Interface auto</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">{activeLabel}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-sm">
                {['Showroom', 'Garage'].map((site) => {
                  const isCurrent = site === activeSite;
                  return (
                    <Link
                      key={site}
                      href={site === 'Showroom' ? '/showroom' : '/garage'}
                      className={`px-4 py-2 text-sm font-semibold transition ${
                        isCurrent ? 'bg-red-600 text-white' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {site}
                    </Link>
                  );
                })}
              </div>
              <button className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                <Bell size={16} className="mr-2" /> Alertes
              </button>
              <button className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white">A</div>
                Profil
              </button>
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
