import DashboardShell from '@/components/dashboard/Shell';
import StatCard from '@/components/ui/StatCard';

export default function GaragePage() {
  return (
    <DashboardShell active="garage">
      <div className="space-y-6">
        <section className="card-surface">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Garage / Atelier</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Suivi des opérations</h1>
            </div>
            <button className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500">
              Nouvelle réception
            </button>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard title="Réparations en cours" value="14" accent="orange" subtitle="8 diagnostics" />
          <StatCard title="Techniciens actifs" value="10" accent="green" subtitle="72 % d’occupation" />
          <StatCard title="Validation client" value="5" accent="blue" subtitle="Prêts à livrer" />
        </div>

        <section className="card-surface overflow-hidden">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Ordres de travail</h2>
              <p className="mt-2 text-sm text-slate-500">Suivi des entrées atelier et des statuts en temps réel.</p>
            </div>
            <button className="rounded-full border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-200">Voir tous</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-500">
                <tr>
                  <th className="px-5 py-4">OT</th>
                  <th className="px-5 py-4">Véhicule</th>
                  <th className="px-5 py-4">Client</th>
                  <th className="px-5 py-4">Technicien</th>
                  <th className="px-5 py-4">Statut</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { ref: 'OT-2024-0158', vehicle: 'Nissan Patrol', client: 'John Doe', tech: 'Pierre M.', status: 'Diagnostic' },
                  { ref: 'OT-2024-0157', vehicle: 'Toyota Prado', client: 'Alain Kabeya', tech: 'David K.', status: 'En cours' },
                  { ref: 'OT-2024-0156', vehicle: 'Range Rover Sport', client: 'Patrick Lubaki', tech: 'Dave R.', status: 'En cours' },
                  { ref: 'OT-2024-0155', vehicle: 'Mercedes GLE 350', client: 'Grace M.', tech: 'Pierre M.', status: 'Attente pièces' },
                ].map((item) => (
                  <tr key={item.ref} className="border-b border-slate-200 bg-white transition hover:bg-slate-50">
                    <td className="px-5 py-4 text-slate-900">{item.ref}</td>
                    <td className="px-5 py-4 text-slate-700">{item.vehicle}</td>
                    <td className="px-5 py-4 text-slate-700">{item.client}</td>
                    <td className="px-5 py-4 text-slate-700">{item.tech}</td>
                    <td className="px-5 py-4 text-orange-600 font-semibold">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
