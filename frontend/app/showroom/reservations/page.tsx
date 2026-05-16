import DashboardShell from '@/components/dashboard/Shell';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ReservationsPage() {
  return (
    <DashboardShell active="showroom">
      <div className="space-y-6">
        <SectionHeader title="Réservations" subtitle="Showroom / Réservations" actionLabel="Nouvelle réservation" />

        <section className="card-surface">
          <p className="text-sm text-white/70">Liste des réservations clients et statuts de disponibilité.</p>
          <div className="mt-6 h-60 rounded-3xl bg-white/5" />
        </section>
      </div>
    </DashboardShell>
  );
}
