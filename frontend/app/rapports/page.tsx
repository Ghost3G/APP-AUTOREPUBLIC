import DashboardShell from '@/components/dashboard/Shell';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';

export default function RapportsPage() {
  return (
    <DashboardShell active="rapports">
      <div className="space-y-6">
        <SectionHeader title="Rapports" subtitle="Performance" />

        <div className="grid gap-4 xl:grid-cols-3">
          <StatCard title="Revenus showroom" value="28,500 $" accent="red" subtitle="Mois" />
          <StatCard title="Revenus garage" value="14,000 $" accent="blue" subtitle="Mois" />
          <StatCard title="Bénéfice net" value="12,450 $" accent="green" subtitle="Mois" />
        </div>

        <div className="card-surface">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Tendances des revenus</h3>
              <p className="mt-2 text-sm text-white/70">Comparaison showroom vs garage sur les 12 derniers mois.</p>
            </div>
            <button className="rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-500">Générer</button>
          </div>
          <div className="h-72 rounded-3xl bg-white/5" />
        </div>
      </div>
    </DashboardShell>
  );
}
