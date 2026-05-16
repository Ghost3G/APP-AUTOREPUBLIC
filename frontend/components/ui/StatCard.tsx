type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  accent?: 'red' | 'green' | 'orange' | 'blue';
};

const accentClasses: Record<NonNullable<StatCardProps['accent']>, string> = {
  red: 'text-red-700 bg-red-100',
  green: 'text-emerald-700 bg-emerald-100',
  orange: 'text-orange-700 bg-orange-100',
  blue: 'text-sky-700 bg-sky-100',
};

export default function StatCard({ title, value, subtitle, accent = 'red' }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{title}</p>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${accentClasses[accent]}`}>{subtitle ?? ''}</span>
      </div>
      <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
