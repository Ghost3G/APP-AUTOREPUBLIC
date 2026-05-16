import DashboardShell from '@/components/dashboard/Shell';
import StatCard from '@/components/ui/StatCard';

export default function ImportsPage() {
  return (
    <DashboardShell active="importations">
      <div className="space-y-6">
        <section className="card-surface">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">Importations</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Suivi des livraisons</h1>
              <p className="mt-3 text-sm text-white/70">Gérez les frais transport, douane, port et l’arrivée des véhicules importés.</p>
            </div>
            <button className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500">
              Ajouter une importation
            </button>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="En transit" value="11" accent="orange" subtitle="Véhicules" />
          <StatCard title="Douane" value="4" accent="blue" subtitle="En attente" />
          <StatCard title="Arrivées" value="7" accent="green" subtitle="Cette semaine" />
          <StatCard title="Coût total" value="36,800 $" accent="red" subtitle="Transport + port" />
        </div>

        <section className="card-surface overflow-hidden">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Véhicules importés</h2>
              <p className="mt-2 text-sm text-white/70">Suivi des statuts et dates d’arrivée.</p>
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10">Voir tout</button>
          </div>
          <table className="min-w-full text-left text-sm text-white">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="px-5 py-4">Référence</th>
                <th className="px-5 py-4">Véhicule</th>
                <th className="px-5 py-4">Arrivée</th>
                <th className="px-5 py-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ref: 'IMP-2024-041', vehicle: 'BMW X5', arrival: '18/05/2024', status: 'En route' },
                { ref: 'IMP-2024-042', vehicle: 'Lexus LX 600', arrival: '22/05/2024', status: 'Douane' },
                { ref: 'IMP-2024-043', vehicle: 'Toyota Prado', arrival: '25/05/2024', status: 'Arrivé' },
              ].map((item) => (
                <tr key={item.ref} className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-5 py-4 text-white">{item.ref}</td>
                  <td className="px-5 py-4 text-white/70">{item.vehicle}</td>
                  <td className="px-5 py-4 text-white/70">{item.arrival}</td>
                  <td className="px-5 py-4 text-sky-300">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </DashboardShell>
  );
}
