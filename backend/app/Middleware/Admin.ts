import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

/**
 * Middleware de vérification Admin (SUPER_ADMIN ou ADMIN)
 */
export default class AdminMiddleware {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const user = auth.user;

    if (!user || !['SUPER_ADMIN', 'ADMIN'].includes(user.role)) {
      return response.status(403).json({
        success: false,
        message: 'Accès refusé : admin requis',
      });
    }

    await next();
  }
}
