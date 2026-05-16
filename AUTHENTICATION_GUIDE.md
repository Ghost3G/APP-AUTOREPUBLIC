# AUTO REPUBLIC MANAGER - Système d'Authentification & Gestion Utilisateurs

## Vue d'ensemble

Système d'authentification complet pour AUTO REPUBLIC MANAGER avec :
- ✅ Authentification email/mot de passe sécurisée
- ✅ 7 rôles utilisateurs avec permissions granulaires
- ✅ Gestion complète des utilisateurs (CRUD)
- ✅ Protection des routes par rôle
- ✅ Interface d'administration sombre et élégante

## 🚀 Démarrage Rapide

### 1. Initialisation de la Base de Données

Accédez à [http://localhost:3001/setup](http://localhost:3001/setup) et cliquez sur "Initialiser la base de données".

Cela créera :
- Table `users` avec structure complète
- Utilisateur admin par défaut :
  - **Email** : `admin@autorepublic.com`
  - **Mot de passe** : `admin123`
  - **Rôle** : SUPER_ADMIN

### 2. Connexion

Accédez à [http://localhost:3001/auth/login](http://localhost:3001/auth/login) avec les identifiants admin.

### 3. Gestion des Utilisateurs

Une fois connecté en tant qu'admin, accédez à [http://localhost:3001/users](http://localhost:3001/users) pour :
- Voir tous les utilisateurs
- Créer de nouveaux utilisateurs
- Modifier les informations utilisateur
- Désactiver des utilisateurs

## 👥 Système de Rôles

### 7 Rôles Disponibles

| Rôle | Permissions | Accès |
|------|------------|-------|
| **SUPER_ADMIN** | Gestion complète | Toutes les pages |
| **ADMIN** | Gestion users, rapports | Dashboard + Utilisateurs |
| **RESPONSABLE_GARAGE** | Gestion garage | Dashboard + Garage + Techniciens |
| **RESPONSABLE_SHOWROOM** | Gestion showroom | Dashboard + Showroom |
| **RECEPTIONNISTE** | Consultation | Dashboard, consultation seulement |
| **TECHNICIEN** | Réparations | Dashboard + Garage + Rapports |
| **COMPTABLE** | Facturation | Dashboard + Facturation + Rapports |

## 📁 Structure des Fichiers

### Frontend

```
frontend/
├── app/
│   ├── auth/
│   │   └── login/
│   │       └── page.tsx           # Page de connexion
│   ├── users/
│   │   └── page.tsx               # Gestion utilisateurs
│   ├── setup/
│   │   └── page.tsx               # Initialisation DB
│   ├── access-denied/
│   │   └── page.tsx               # Page erreur 403
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── logout/route.ts
│   │   ├── users/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── setup/route.ts
│   └── layout.tsx                 # Wraps avec AuthProvider
├── src/
│   └── lib/
│       ├── auth.ts                # Types & permissions
│       └── authContext.tsx        # Context provider
└── components/
    ├── ProtectedRoute.tsx         # HOC protection route
    ├── RoleGuard.tsx              # Affichage conditionnel
    └── dashboard/
        └── Shell.tsx              # Nav + user info
```

### Backend

```
backend/
├── app/
│   └── Controllers/Http/
│       ├── SetupController.ts     # Init DB
│       ├── AuthController.ts      # Login/logout
│       └── UsersController.ts     # CRUD users
└── start/
    └── routes.ts                  # Routes definitions
```

## 🔧 API Endpoints

### Authentification (PUBLIC)

```
POST /auth/login
Body: { email: string, password: string }
Response: { user: User, token: string }

POST /auth/logout
Response: { message: string }

GET /auth/me (avec token)
Response: { user: User }
```

### Setup (PUBLIC - Une seule fois)

```
POST /setup
Response: Crée tables et admin user
```

### Utilisateurs (PROTECTED - Admin seulement)

```
GET /users
Response: Array<User>

POST /users
Body: { name, email, password, role, site }
Response: User créé

PUT /users/:id
Body: { name, email, password, role, site, status }
Response: User modifié

DELETE /users/:id
Response: User désactivé

POST /users/:id/reset-password
Body: { password: string }
Response: { message }
```

## 💻 Utilisation dans les Composants

### Accéder à l'utilisateur connecté

```typescript
'use client';

import { useAuth } from '@/src/lib/authContext';

export default function MyComponent() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <p>Non connecté</p>;

  return (
    <div>
      <p>Bienvenue {user?.name}</p>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
}
```

### Protéger une route complète

```typescript
'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRoles={['SUPER_ADMIN', 'ADMIN']}>
      <h1>Page réservée aux admins</h1>
    </ProtectedRoute>
  );
}
```

### Afficher du contenu conditionnel

```typescript
import { RoleGuard, PermissionGuard } from '@/components/RoleGuard';

export default function Dashboard() {
  return (
    <div>
      <RoleGuard requiredRoles={['SUPER_ADMIN', 'ADMIN']}>
        <button>Gestion utilisateurs</button>
      </RoleGuard>

      <PermissionGuard permission="view_reports">
        <section>Rapports</section>
      </PermissionGuard>
    </div>
  );
}
```

### Vérifier les permissions

```typescript
import { hasPermission } from '@/src/lib/auth';

if (hasPermission(user.role, 'manage_users')) {
  // Montrer le bouton
}
```

## 🔐 Sécurité

- ✅ Mots de passe hachés avec bcrypt (Hash.make)
- ✅ JWT tokens pour les sessions
- ✅ Middleware `auth` sur les routes protégées
- ✅ Middleware `superAdmin` pour les opérations sensibles
- ✅ Protection CSRF intégrée (AdonisJS)
- ✅ Validation des inputs

## 📋 Variables d'Environnement

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:3333
```

### Backend (.env)

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=auto_republic

NODE_ENV=development
APP_KEY=...
JWT_SECRET=...
```

## 🐛 Troubleshooting

### "Identifiants incorrects" au login

Vérifier que :
1. La base de données a été initialisée (`/setup`)
2. L'email est correct : `admin@autorepublic.com`
3. Le mot de passe est : `admin123`

### "Accès refusé" à `/users`

Vérifier que :
1. Vous êtes connecté
2. Votre rôle est `SUPER_ADMIN` ou `ADMIN`

### Les données utilisateur ne se sauvegardent pas

Vérifier que :
1. L'API backend répond (vérifier les logs)
2. La base de données est accessible
3. L'utilisateur a les permissions (rôle SUPER_ADMIN/ADMIN)

## 📞 Support

Pour toute question sur l'authentification :
1. Vérifier les logs du terminal (frontend et backend)
2. Vérifier les onglets Network dans DevTools
3. Vérifier la base de données MySQL directement

---

**Version** : 1.0  
**Dernière mise à jour** : 2024  
**Auteur** : AUTO REPUBLIC MANAGER Team
