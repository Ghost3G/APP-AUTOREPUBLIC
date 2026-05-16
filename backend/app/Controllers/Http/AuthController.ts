import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';

export default class AuthController {
  /**
   * Authentification utilisateur
   * POST /auth/login
   */
  public async login({ request, response }: HttpContextContract) {
    try {
      const { email, password } = request.only(['email', 'password']);

      if (!email || !password) {
        return response.status(400).json({
          success: false,
          message: 'Email et mot de passe requis',
        });
      }

      // Trouver l'utilisateur
      const user = await User.findBy('email', email);

      if (!user) {
        return response.status(401).json({
          success: false,
          message: 'Identifiants invalides',
        });
      }

      // Vérifier que l'utilisateur est actif
      if (!user.is_active) {
        return response.status(403).json({
          success: false,
          message: 'Compte désactivé',
        });
      }

      // Vérifier le mot de passe
      const passwordValid = await Hash.verify(user.password, password);

      if (!passwordValid) {
        return response.status(401).json({
          success: false,
          message: 'Identifiants invalides',
        });
      }

      // Créer un token API
      const token = await user.auth.attempt(email, password, {
        name: 'auto-republic-session',
      });

      return response.json({
        success: true,
        message: 'Connexion réussie',
        data: {
          token: token.token,
          type: 'bearer',
          expiresAt: token.expiresAt,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            site_affectation: user.site_affectation,
          },
        },
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erreur lors de la connexion',
        error: error.message,
      });
    }
  }

  /**
   * Vérifier l'utilisateur connecté
   * GET /auth/me
   */
  public async me({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user!;

      return response.json({
        success: true,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          site_affectation: user.site_affectation,
        },
      });
    } catch (error) {
      return response.status(401).json({
        success: false,
        message: 'Non authentifié',
      });
    }
  }

  /**
   * Déconnexion
   * POST /auth/logout
   */
  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.logout();

      return response.json({
        success: true,
        message: 'Déconnexion réussie',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erreur lors de la déconnexion',
      });
    }
  }
}
