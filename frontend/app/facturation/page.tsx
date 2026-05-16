import DashboardShell from '@/components/dashboard/Shell';
import StatCard from '@/components/ui/StatCard';

export default function BillingPage() {
  return (
    <DashboardShell active="facturation">
      <div className="space-y-6">
        <section className="card-surface">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">Devis & Facturation</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Gestion financière</h1>
              <p className="mt-3 text-sm text-white/70">Suivez les factures impayées, les paiements et générez des PDF professionnels.</p>
            </div>
            <button className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500">
              Nouvelle facture
            </button>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Factures impayées" value="21" accent="red" subtitle="Total" />
          <StatCard title="Paiements reçus" value="134" accent="green" subtitle="Ce mois" />
          <StatCard title="Devis ouverts" value="18" accent="orange" subtitle="À relancer" />
          <StatCard title="Revenu total" value="92,400 $" accent="blue" subtitle="Mois" />
        </div>

        <section className="card-surface overflow-hidden">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Factures récentes</h2>
              <p className="mt-2 text-sm text-white/70">Gestion des statuts et du suivi des paiements.</p>
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10">Voir toutes</button>
          </div>
          <table className="min-w-full text-left text-sm text-white">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="px-5 py-4">Facture</th>
                <th className="px-5 py-4">Client</th>
                <th className="px-5 py-4">Montant</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Statut</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ref: 'FAC-2024-0125', client: 'John Doe', amount: '7,500 $', date: '14/05/2024', status: 'Payée' },
                { ref: 'FAC-2024-0126', client: 'Claire Martin', amount: '12,800 $', date: '13/05/2024', status: 'Impayée' },
                { ref: 'FAC-2024-0127', client: 'Kevin Bey', amount: '5,400 $', date: '12/05/2024', status: 'Relance' },
              ].map((invoice) => (
                <tr key={invoice.ref} className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-5 py-4 text-white">{invoice.ref}</td>
                  <td className="px-5 py-4 text-white/70">{invoice.client}</td>
                  <td className="px-5 py-4 text-white/70">{invoice.amount}</td>
                  <td className="px-5 py-4 text-white/70">{invoice.date}</td>
                  <td className="px-5 py-4 text-emerald-300">{invoice.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </DashboardShell>
  );
}
