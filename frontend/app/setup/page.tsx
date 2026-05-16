'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const router = useRouter();

  const setupDatabase = useCallback(async () => {
    try {
      const response = await fetch('/api/setup', {
        method: 'POST',
      });

      if (response.ok) {
        alert('Base de données initialisée avec succès!');
        router.push('/auth/login');
      } else {
        alert('Erreur lors de l\'initialisation');
      }
    } catch (error) {
      alert('Erreur: ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white mb-4">
            AR
          </div>
          <p className="text-xs uppercase tracking-[0.45em] text-slate-400">AUTO REPUBLIC</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">MANAGER</h1>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 p-8 shadow-2xl space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Configuration initiale</h2>
            <p className="mt-2 text-sm text-slate-400">
              Cliquez sur le bouton ci-dessous pour initialiser la base de données et créer l'utilisateur administrateur.
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-300 bg-slate-950/50 rounded-xl p-4">
            <p className="font-semibold text-white">Cela va créer :</p>
            <ul className="space-y-2 ml-4 list-disc">
              <li>Tables utilisateurs et rôles</li>
              <li>Utilisateur admin par défaut : <code className="bg-slate-800 px-2 py-1 rounded text-xs">admin@autorepublic.com</code></li>
              <li>Mot de passe : <code className="bg-slate-800 px-2 py-1 rounded text-xs">admin123</code></li>
            </ul>
          </div>

          <button
            onClick={setupDatabase}
            className="w-full rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-500 transition"
          >
            Initialiser la base de données
          </button>

          <p className="text-center text-xs text-slate-500">
            Une fois complété, vous serez redirigé vers la page de connexion.
          </p>
        </div>
      </div>
    </div>
  );
}
