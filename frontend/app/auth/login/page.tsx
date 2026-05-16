'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/src/lib/authContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, error: authError, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email et mot de passe requis');
      return;
    }

    try {
      await login(email, password);
      // Stocker le token et l'utilisateur dans les cookies
      router.push('/dashboard');
    } catch (err) {
      setError(authError || 'Erreur de connexion. Vérifiez vos identifiants.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-10 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="space-y-4 text-center mb-8">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-xl font-bold uppercase tracking-[0.3em] text-white shadow-lg shadow-red-600/50">
              AR
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">AUTO REPUBLIC MANAGER</p>
          <h1 className="text-4xl font-bold text-white">Connexion</h1>
          <p className="text-sm text-white/70">Accédez à votre dashboard showroom et garage</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email ou identifiant</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500/30 disabled:opacity-50"
              placeholder="admin@autorepublic.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500/30 disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          {/* Error Message */}
          {(error || authError) && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error || authError}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 text-sm font-semibold text-white transition hover:from-red-500 hover:to-red-600 active:from-red-700 active:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-600/20"
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-white/60">
            Besoin d'aide ? <span className="text-red-400">Contactez l'administrateur</span>
          </p>
        </div>
      </div>
    </main>
  );
}

