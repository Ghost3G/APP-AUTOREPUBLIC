import DashboardShell from '@/components/dashboard/Shell';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';

export default function ClientsPage() {
  return (
    <DashboardShell active="clients">
      <div className="space-y-6">
        <SectionHeader title="Liste des clients" subtitle="Clients" actionLabel="Nouveau client" />

        <div className="grid gap-4 xl:grid-cols-3">
          <StatCard title="Total clients" value="1 245" accent="blue" subtitle="+18 %" />
          <StatCard title="Clients VIP" value="126" accent="red" subtitle="+8 %" />
          <StatCard title="Demandes en attente" value="32" accent="orange" subtitle="Aujourd'hui" />
        </div>

        <div className="card-surface overflow-hidden">
          <table className="min-w-full text-left text-sm text-white">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="px-5 py-4">Client</th>
                <th className="px-5 py-4">Téléphone</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Statut</th>
                <th className="px-5 py-4">Dernière activité</th>
              </tr>
            </thead>
            <tbody>
              {['John Doe', 'Claire Martin', 'Kevin Bey', 'Lina D.', 'Samuel O.'].map((name, index) => (
                <tr key={name} className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-5 py-4 text-white">{name}</td>
                  <td className="px-5 py-4 text-white/70">+33 6 12 34 56 78</td>
                  <td className="px-5 py-4 text-white/70">client{index + 1}@autorepublic.com</td>
                  <td className="px-5 py-4 text-emerald-300">Actif</td>
                  <td className="px-5 py-4 text-white/70">Aujourd'hui</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
