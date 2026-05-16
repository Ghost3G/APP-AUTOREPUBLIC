import DashboardShell from '@/components/dashboard/Shell';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ParametresPage() {
  return (
    <DashboardShell active="parametres">
      <div className="space-y-6">
        <SectionHeader title="Paramètres de l’application" subtitle="Paramètres" />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-surface">
            <h3 className="text-xl font-semibold text-white">Préférences générales</h3>
            <div className="mt-6 space-y-4 text-white/70">
              <p>Zone horaire, langue, méthode de facturation et configuration des sites.</p>
              <p>Activer ou désactiver les notifications, choisir le mode sombre et synchroniser le catalogue.</p>
            </div>
          </div>
          <div className="card-surface">
            <h3 className="text-xl font-semibold text-white">Rôles et accès</h3>
            <div className="mt-6 space-y-4 text-white/70">
              <p>Gestion des rôles : admin, responsable showroom, technicien, comptable, etc.</p>
              <p>Attribuer les permissions de consultation, modification et export.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
