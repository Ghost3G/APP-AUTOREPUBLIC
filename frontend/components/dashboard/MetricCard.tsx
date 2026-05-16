type MetricCardProps = {
  metric: {
    label: string;
    value: string;
    change: string;
    hint: string;
  };
};

export default function MetricCard({ metric }: MetricCardProps) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-brand-900/80 p-6 shadow-soft backdrop-blur-xl">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">{metric.label}</p>
      <p className="mt-4 text-4xl font-semibold text-white">{metric.value}</p>
      <p className="mt-3 text-sm text-white/70">{metric.hint}</p>
      <span className="mt-4 inline-flex rounded-full bg-red-600/10 px-3 py-1 text-sm font-medium text-red-300">
        {metric.change}
      </span>
    </article>
  );
}
