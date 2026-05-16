export default function AnalyticsCard() {
  return (
    <section className="card-surface">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Entrée</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Performance showroom</h2>
        </div>
        <span className="rounded-full bg-red-600/10 px-4 py-2 text-sm font-semibold text-red-200">
          +18 % ce mois
        </span>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-brand-900/70 p-6 shadow-soft backdrop-blur-xl">
          <p className="text-sm text-white/60">Factures impayées</p>
          <p className="mt-3 text-3xl font-semibold text-white">12</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-brand-900/70 p-6 shadow-soft backdrop-blur-xl">
          <p className="text-sm text-white/60">Transferts récents</p>
          <p className="mt-3 text-3xl font-semibold text-white">7</p>
        </div>
      </div>
    </section>
  );
}
