import DashboardShell from '@/components/dashboard/Shell';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';

export default function RendezVousPage() {
  return (
    <DashboardShell active="rendezvous">
      <div className="space-y-6">
        <SectionHeader title="Agenda des rendez-vous" subtitle="Rendez-vous" actionLabel="Nouvelle visite" />

        <div className="grid gap-4 xl:grid-cols-3">
          <StatCard title="Rendez-vous aujourd'hui" value="18" accent="blue" subtitle="8 confirmés" />
          <StatCard title="En attente" value="6" accent="orange" subtitle="3 clients" />
          <StatCard title="Annulations" value="2" accent="red" subtitle="Cette semaine" />
        </div>

        <div className="card-surface">
          <div className="space-y-4">
            {['08:30 - Toyota Land Cruiser', '10:00 - Nissan Patrol', '13:00 - BMW X5', '15:30 - Mercedes G63'].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold text-white">{item}</p>
                <p className="mt-2 text-sm text-white/70">Client, adresse, statut de rendez-vous.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
