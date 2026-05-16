import DashboardShell from '@/components/dashboard/Shell';
import StatCard from '@/components/ui/StatCard';

export default function StockPage() {
  return (
    <DashboardShell active="stock">
      <div className="space-y-6">
        <section className="card-surface">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">Stock pièces</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Gestion du stock</h1>
              <p className="mt-3 text-sm text-white/70">Surveillez les pièces critiques, les entrées/sorties et les alertes de stock faible.</p>
            </div>
            <button className="rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-500">
              Ajouter une pièce
            </button>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total pièces" value="1 280" accent="blue" subtitle="Catalogue" />
          <StatCard title="Stock faible" value="18" accent="orange" subtitle="À réapprovisionner" />
          <StatCard title="Valeur stock" value="84,200 $" accent="green" subtitle="Inventaire" />
          <StatCard title="Entrées aujourd'hui" value="24" accent="red" subtitle="Nouvelles" />
        </div>

        <section className="card-surface overflow-hidden">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Pièces détachées</h2>
              <p className="mt-2 text-sm text-white/70">Liste des éléments critiques et des seuils d’alerte.</p>
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10">Voir tout</button>
          </div>
          <table className="min-w-full text-left text-sm text-white">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="px-5 py-4">Référence</th>
                <th className="px-5 py-4">Nom</th>
                <th className="px-5 py-4">Catégorie</th>
                <th className="px-5 py-4">Stock</th>
                <th className="px-5 py-4">Prix vente</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ref: 'BRC-567', name: 'Plaquettes frein avant', category: 'Freinage', stock: 9, price: '25.00 $' },
                { ref: 'ALY-901', name: 'Support moteur avant', category: 'Moteur', stock: 12, price: '45.00 $' },
                { ref: 'OIL-120', name: 'Huile moteur 5W30', category: 'Lubrifiants', stock: 5, price: '18.00 $' },
              ].map((part) => (
                <tr key={part.ref} className="border-b border-white/10 hover:bg-white/5">
                  <td className="px-5 py-4 text-white">{part.ref}</td>
                  <td className="px-5 py-4 text-white/70">{part.name}</td>
                  <td className="px-5 py-4 text-white/70">{part.category}</td>
                  <td className={`px-5 py-4 font-semibold ${part.stock <= 10 ? 'text-orange-300' : 'text-white/70'}`}>{part.stock}</td>
                  <td className="px-5 py-4 text-white/70">{part.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </DashboardShell>
  );
}
