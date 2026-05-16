import Server from '@ioc:Adonis/Core/Server';

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('App/Middleware/Cors'),
]);

Server.middleware.registerNamed({
  auth: () => import('@ioc:Adonis/Addons/Auth/Middleware'),
  superAdmin: () => import('App/Middleware/SuperAdmin'),
  admin: () => import('App/Middleware/Admin'),
});
