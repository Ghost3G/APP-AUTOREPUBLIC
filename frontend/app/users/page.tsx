'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/lib/authContext';
import { hasPermission } from '@/src/lib/auth';
import DashboardShell from '@/components/dashboard/Shell';
import { Trash2, Edit2, Plus } from 'lucide-react';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  site?: string;
  createdAt?: string;
}

export default function UsersPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'TECHNICIEN',
    site: 'Garage',
    status: 'active',
  });

  // Vérifier les permissions
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth/login');
      return;
    }

    if (!hasPermission(user.role, 'manage_users')) {
      router.push('/dashboard');
      return;
    }

    fetchUsers();
  }, [isAuthenticated, user, router]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editingUser ? 'PUT' : 'POST';
      const endpoint = editingUser ? `/api/users/${editingUser.id}` : '/api/users';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        setEditingUser(null);
        resetForm();
        fetchUsers();
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir désactiver cet utilisateur ?')) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleEditUser = (userItem: UserItem) => {
    setEditingUser(userItem);
    setFormData({
      name: userItem.name,
      email: userItem.email,
      password: '',
      role: userItem.role,
      site: userItem.site || 'Garage',
      status: userItem.status,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'TECHNICIEN',
      site: 'Garage',
      status: 'active',
    });
    setEditingUser(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (!isAuthenticated || isLoading) {
    return (
      <DashboardShell active="users">
        <div className="flex items-center justify-center h-96">
          <p className="text-slate-400">Chargement...</p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell active="users">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-slate-400">Gestion</p>
            <h1 className="text-3xl font-bold text-white mt-1">Utilisateurs</h1>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-500 transition"
          >
            <Plus className="h-4 w-4" />
            Créer utilisateur
          </button>
        </div>

        {/* Users Table */}
        <div className="rounded-3xl border border-white/10 bg-slate-950/90 overflow-hidden shadow-soft">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Utilisateur</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Rôle</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Site</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Statut</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((userItem) => (
                <tr key={userItem.id} className="hover:bg-slate-900/30 transition">
                  <td className="px-6 py-4 text-sm font-medium text-white">{userItem.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{userItem.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block rounded-full bg-slate-700/40 px-3 py-1 text-xs font-medium text-slate-200">
                      {userItem.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{userItem.site || '-'}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        userItem.status === 'active'
                          ? 'bg-green-600/20 text-green-300'
                          : 'bg-slate-600/20 text-slate-300'
                      }`}
                    >
                      {userItem.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditUser(userItem)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(userItem.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-600/10 rounded-lg transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingUser ? 'Modifier utilisateur' : 'Créer utilisateur'}
            </h2>

            <form onSubmit={handleSaveUser} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Nom complet</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-white outline-none placeholder:text-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-white outline-none placeholder:text-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition"
                  placeholder="john@autorepublic.com"
                  required
                />
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Mot de passe temporaire</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-white outline-none placeholder:text-slate-500 focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Rôle</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-white outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition"
                >
                  <option value="SUPER_ADMIN">Super Administrateur</option>
                  <option value="ADMIN">Administrateur</option>
                  <option value="RESPONSABLE_GARAGE">Responsable Garage</option>
                  <option value="RESPONSABLE_SHOWROOM">Responsable Showroom</option>
                  <option value="RECEPTIONNISTE">Réceptionniste</option>
                  <option value="TECHNICIEN">Technicien</option>
                  <option value="COMPTABLE">Comptable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Site</label>
                <select
                  value={formData.site}
                  onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                  className="w-full rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-white outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition"
                >
                  <option value="Garage">Garage</option>
                  <option value="Showroom">Showroom</option>
                  <option value="Tous">Tous</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 rounded-full border border-white/10 bg-slate-900/50 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800/50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-500 transition"
                >
                  {editingUser ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
