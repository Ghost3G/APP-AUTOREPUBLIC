import DashboardShell from '@/components/dashboard/Shell';
import SectionHeader from '@/components/ui/SectionHeader';

export default function VentesPage() {
  return (
    <DashboardShell active="showroom">
      <div className="space-y-6">
        <SectionHeader title="Ventes" subtitle="Showroom / Ventes" actionLabel="Nouvelle vente" />

        <section className="card-surface">
          <p className="text-sm text-white/70">Historique des ventes, factures et détails clients.</p>
          <div className="mt-6 h-60 rounded-3xl bg-white/5" />
        </section>
      </div>
    </DashboardShell>
  );
}
