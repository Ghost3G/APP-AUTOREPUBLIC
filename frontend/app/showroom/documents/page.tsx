import DashboardShell from '@/components/dashboard/Shell';
import SectionHeader from '@/components/ui/SectionHeader';

export default function DocumentsPage() {
  return (
    <DashboardShell active="showroom">
      <div className="space-y-6">
        <SectionHeader title="Documents" subtitle="Showroom / Documents" />

        <section className="card-surface">
          <p className="text-sm text-white/70">Contrats, bons de livraison, photos et documents liés aux véhicules.</p>
          <div className="mt-6 h-60 rounded-3xl bg-white/5" />
        </section>
      </div>
    </DashboardShell>
  );
}
