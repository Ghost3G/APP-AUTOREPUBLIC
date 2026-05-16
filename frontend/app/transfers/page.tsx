import DashboardShell from '@/components/dashboard/Shell';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';

export default function TransfersPage() {
  return (
    <DashboardShell active="transfers">
      <div className="space-y-6">
        <SectionHeader title="Transferts entre sites" subtitle="Transferts" actionLabel="Nouveau transfert" />

        <div className="grid gap-4 xl:grid-cols-3">
          <StatCard title="En transit" value="7" accent="orange" subtitle="Garage → Showroom" />
          <StatCard title="Terminés" value="18" accent="green" subtitle="Cette semaine" />
          <StatCard title="En planification" value="3" accent="blue" subtitle="Suivi logistique" />
        </div>

        <div className="card-surface overflow-hidden">
          <table className="min-w-full text-left text-sm text-white">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="px-5 py-4">Transfert</th>
                <th className="px-5 py-4">Véhicule</th>
                <th className="px-5 py-4">Origine</th>
                <th className="px-5 py-4">Destination</th>
                <th className="px-5 py-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {['TR-2024-001', 'TR-2024-002', 'TR-2024-003', 'TR-2024-004'].map((ref) => (
                <tr key={ref} className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-5 py-4 text-white">{ref}</td>
                  <td className="px-5 py-4 text-white/70">Toyota Prado</td>
                  <td className="px-5 py-4 text-white/70">Garage</td>
                  <td className="px-5 py-4 text-white/70">Showroom</td>
                  <td className="px-5 py-4 text-orange-300">En transit</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
