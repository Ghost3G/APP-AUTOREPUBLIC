"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { Eye, Edit2 } from 'lucide-react';
import type { Vehicle } from '@/types';
import { fetchShowroomVehicles } from '@/src/lib/api';

type Props = {
  initialPage?: number;
  pageSize?: number;
};

export default function ShowroomTable({ initialPage = 1, pageSize = 10 }: Props) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchShowroomVehicles()
      .then((data) => {
        if (mounted) setVehicles(data);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const total = vehicles.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const visible = useMemo(() => {
    const start = (page - 1) * pageSize;
    return vehicles.slice(start, start + pageSize);
  }, [vehicles, page, pageSize]);

  return (
    <div>
      <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead className="bg-slate-100 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-medium uppercase tracking-[0.3em]">Véhicule</th>
                <th className="px-5 py-4 font-medium uppercase tracking-[0.3em]">Année</th>
                <th className="px-5 py-4 font-medium uppercase tracking-[0.3em]">Kilométrage</th>
                <th className="px-5 py-4 font-medium uppercase tracking-[0.3em]">Prix vente</th>
                <th className="px-5 py-4 font-medium uppercase tracking-[0.3em]">Statut</th>
                <th className="px-5 py-4 font-medium uppercase tracking-[0.3em]">Site</th>
                <th className="px-5 py-4 font-medium uppercase tracking-[0.3em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                    Chargement...
                  </td>
                </tr>
              ) : visible.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                    Aucun véhicule trouvé
                  </td>
                </tr>
              ) : (
                visible.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-slate-200 bg-white transition hover:bg-slate-50">
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-600/10 text-red-600 font-semibold">
                          {vehicle.brand?.[0] ?? 'V'}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-slate-900">{vehicle.brand} {vehicle.model}</span>
                          <span className="text-xs text-slate-500">VIN {vehicle.vin}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-slate-700">{vehicle.year ?? ''}</td>
                    <td className="px-5 py-5 text-slate-700">{vehicle.mileage ?? 0} km</td>
                    <td className="px-5 py-5 text-red-600 font-semibold">{vehicle.salePrice ? `${vehicle.salePrice} $` : '-'}</td>
                    <td className="px-5 py-5">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        vehicle.status === 'disponible'
                          ? 'bg-emerald-100 text-emerald-700'
                          : vehicle.status === 'reserve'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-5 py-5">
                      <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        Showroom
                      </span>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <button className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 transition hover:border-red-500 hover:text-slate-900">
                          <Eye size={16} />
                        </button>
                        <button className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 transition hover:border-red-500 hover:text-slate-900">
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="text-sm text-slate-500">Affichage {Math.min((page - 1) * pageSize + 1, total)} - {Math.min(page * pageSize, total)} sur {total}</div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
          >
            Préc
          </button>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 p-1">
            {Array.from({ length: pageCount }).map((_, idx) => {
              const p = idx + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    p === page ? 'bg-red-600 text-white' : 'bg-transparent text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button
            disabled={page === pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50"
          >
            Suiv
          </button>
        </div>
      </div>
    </div>
  );
}
