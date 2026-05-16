import DashboardShell from '@/components/dashboard/Shell';
import { ArrowUpRight, Download, Search, SlidersHorizontal } from 'lucide-react';
import ShowroomTable from '@/components/dashboard/ShowroomTable';

const stats = [
  { label: 'Tous les véhicules', value: '38', icon: ArrowUpRight, color: 'text-slate-200' },
  { label: 'Disponibles', value: '18', icon: ArrowUpRight, color: 'text-emerald-500' },
  { label: 'Réservés', value: '7', icon: ArrowUpRight, color: 'text-orange-500' },
  { label: 'Vendus', value: '13', icon: ArrowUpRight, color: 'text-red-500' },
];

const filters = [
  { label: 'Statut', value: 'Tous les statuts' },
  { label: 'Marque', value: 'Toutes les marques' },
  { label: 'Modèle', value: 'Tous les modèles' },
  { label: 'Année', value: 'Toutes les années' },
  { label: 'Site', value: 'Tous les sites' },
];

export default function ShowroomPage() {
  return (
    <DashboardShell active="showroom">
      <div className="space-y-6">
        <section className="card-surface p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Showroom - Liste des véhicules</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span>Accueil</span>
                <span className="font-semibold">›</span>
                <span>Showroom</span>
                <span className="font-semibold">›</span>
                <span>Véhicules</span>
              </div>
              <span className="mt-4 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">38 véhicules</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/90 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                <Download size={16} /> Exporter
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500">
                Ajouter un véhicule
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.75fr_0.95fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 shadow-soft">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{item.label}</p>
                    <item.icon className={item.color} size={18} />
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-6 shadow-soft">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Affichage des véhicules</h2>
                  <p className="mt-2 text-sm text-slate-400">Affichage 1 à 10 sur 38 véhicules disponibles.</p>
                </div>
                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-900 px-4 py-3">
                  <Search size={18} className="text-slate-400" />
                  <input
                    placeholder="Rechercher un véhicule..."
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <ShowroomTable />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-6 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Filtres</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">Rechercher un véhicule</h2>
                </div>
                <SlidersHorizontal size={20} className="text-red-500" />
              </div>

              <div className="mt-6 space-y-5">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-4">
                  <label className="block text-sm text-slate-400">Recherche</label>
                  <div className="mt-3 flex items-center gap-3 rounded-full border border-white/10 bg-slate-900 px-4 py-3">
                    <Search size={18} className="text-slate-400" />
                    <input className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" placeholder="Marque, modèle, VIN..." />
                  </div>
                </div>

                {filters.map((filter) => (
                  <div key={filter.label} className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-4">
                    <label className="block text-sm text-slate-400">{filter.label}</label>
                    <div className="mt-3 rounded-full border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-300">{filter.value}</div>
                  </div>
                ))}

                <div className="grid gap-3">
                  <button className="rounded-3xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500">Appliquer les filtres</button>
                  <button className="rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-900">Réinitialiser</button>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </DashboardShell>
  );
}
