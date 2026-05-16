import Route from '@ioc:Adonis/Core/Route';

// Routes publiques
Route.post('/setup', 'SetupController.initialize');

// Routes d'authentification
Route.post('/auth/login', 'AuthController.login');
Route.post('/auth/logout', 'AuthController.logout').middleware('auth');
Route.get('/auth/me', 'AuthController.me').middleware('auth');

// Routes protégées
Route.group(() => {
  // Dashboard
  Route.get('/dashboard', 'DashboardController.index');

  // Gestion des utilisateurs (SUPER_ADMIN seulement)
  Route.resource('/users', 'UsersController').apiOnly().middleware({
    '*': ['auth', 'superAdmin'],
  });

  // Route spéciale pour réinitialiser mot de passe
  Route.post('/users/:id/reset-password', 'UsersController.resetPassword').middleware(['auth', 'superAdmin']);

  // Ressources de l'application
  Route.resource('/vehicles', 'VehiclesController').apiOnly();
  Route.resource('/repairs', 'RepairsController').apiOnly();
  Route.resource('/invoices', 'InvoicesController').apiOnly();
  Route.resource('/imports', 'ImportationsController').apiOnly();
  Route.resource('/transfers', 'TransfersController').apiOnly();
  Route.resource('/parts', 'PartsController').apiOnly();
}).middleware(['auth']);
