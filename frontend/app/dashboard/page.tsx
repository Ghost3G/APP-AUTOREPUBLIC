import DashboardShell from '@/components/dashboard/Shell';
import StatCard from '@/components/ui/StatCard';
import { dashboardMetrics, recentActivities } from '@/src/lib/constants';

export default function DashboardPage() {
  return (
    <DashboardShell active="dashboard">
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <StatCard key={metric.label} title={metric.label} value={metric.value} subtitle={metric.change} accent="red" />
          ))}
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
          <div className="card-surface">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">Revenus</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Revenus 12 derniers mois</h2>
              </div>
              <button className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10">
                Cette année
              </button>
            </div>
            <div className="mt-8 h-80 rounded-3xl bg-slate-100" />
          </div>

          <div className="space-y-6">
            <div className="card-surface">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Alertes</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">Actions immédiates</h3>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4 text-slate-700">3 factures impayées à suivre</div>
                <div className="rounded-3xl bg-slate-100 p-4 text-slate-700">Stock pièces bas : disques de frein</div>
                <div className="rounded-3xl bg-slate-100 p-4 text-slate-700">2 véhicules en transit vers le showroom</div>
              </div>
            </div>

            <div className="card-surface">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Activités récentes</p>
              <div className="mt-6 space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="rounded-3xl border border-slate-200/80 bg-slate-100 p-4">
                    <p className="text-sm text-slate-500">{activity.time}</p>
                    <p className="mt-1 text-slate-700">{activity.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
