import DashboardShell from '@/components/dashboard/Shell';
import AnalyticsCard from '@/components/dashboard/AnalyticsCard';
import MetricCard from '@/components/dashboard/MetricCard';
import { dashboardMetrics, recentActivities } from '@/src/lib/constants';

export default function HomePage() {
  return (
    <DashboardShell active="dashboard">
      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
          <section className="card-surface">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Bienvenue</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">AUTO REPUBLIC MANAGER</h1>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Contrôlez showroom, garage, facturation et transferts depuis un tableau de bord unifié.
            </p>
          </section>
          <AnalyticsCard />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <section className="card-surface">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Activités récentes</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Flux opérationnel</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/80">{activity.time}</p>
                <p className="mt-1 text-base text-white">{activity.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
