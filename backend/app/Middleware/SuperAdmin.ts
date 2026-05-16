import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

/**
 * Middleware de vérification du rôle SUPER_ADMIN
 */
export default class SuperAdminMiddleware {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const user = auth.user;

    if (!user || user.role !== 'SUPER_ADMIN') {
      return response.status(403).json({
        success: false,
        message: 'Accès refusé : seul le SUPER_ADMIN peut accéder',
      });
    }

    await next();
  }
}
