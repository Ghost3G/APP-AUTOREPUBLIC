'use client';

import Link from 'next/link';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-6">
      <div className="max-w-md text-center">
        <div className="text-6xl font-bold text-red-600 mb-4">403</div>
        <h1 className="text-3xl font-bold text-white mb-2">Accès refusé</h1>
        <p className="text-slate-400 mb-8">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>

        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-500 transition"
          >
            Retour au dashboard
          </Link>
          <Link
            href="/auth/login"
            className="block rounded-full border border-white/10 bg-slate-900/50 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800/50 transition"
          >
            Se connecter avec un autre compte
          </Link>
        </div>
      </div>
    </div>
  );
}
