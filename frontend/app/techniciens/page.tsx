import DashboardShell from '@/components/dashboard/Shell';
import SectionHeader from '@/components/ui/SectionHeader';
import StatCard from '@/components/ui/StatCard';

export default function TechniciensPage() {
  return (
    <DashboardShell active="techniciens">
      <div className="space-y-6">
        <SectionHeader title="Techniciens" subtitle="Atelier" actionLabel="Affecter" />

        <div className="grid gap-4 xl:grid-cols-3">
          <StatCard title="Techniciens actifs" value="10" accent="green" subtitle="+4 %" />
          <StatCard title="Ordres en cours" value="14" accent="orange" subtitle="8 en diagnostic" />
          <StatCard title="Disponibles" value="3" accent="blue" subtitle="Prêts à intervenir" />
        </div>

        <div className="card-surface overflow-hidden">
          <table className="min-w-full text-left text-sm text-white">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="px-5 py-4">Nom</th>
                <th className="px-5 py-4">Compétence</th>
                <th className="px-5 py-4">Charge</th>
                <th className="px-5 py-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {['Pierre M.', 'David K.', 'Grace M.', 'Sophie L.', 'Yann B.'].map((name) => (
                <tr key={name} className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-5 py-4 text-white">{name}</td>
                  <td className="px-5 py-4 text-white/70">Mécanique / Carrosserie</td>
                  <td className="px-5 py-4 text-white/70">75 %</td>
                  <td className="px-5 py-4 text-emerald-300">Disponible</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
