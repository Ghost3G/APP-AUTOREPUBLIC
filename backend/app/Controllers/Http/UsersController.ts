import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';

const VALID_ROLES = ['SUPER_ADMIN', 'ADMIN', 'RESPONSABLE_GARAGE', 'RESPONSABLE_SHOWROOM', 'RECEPTIONNISTE', 'TECHNICIEN', 'COMPTABLE'];
const VALID_SITES = ['Garage', 'Showroom', 'Tous'];

export default class UsersController {
  /**
   * Liste tous les utilisateurs (SUPER_ADMIN et ADMIN seulement)
   * GET /users
   */
  public async index({ response, auth }: HttpContextContract) {
    try {
      const user = auth.user!;

      // Seuls SUPER_ADMIN et ADMIN peuvent voir la liste
      if (!['SUPER_ADMIN', 'ADMIN'].includes(user.role)) {
        return response.status(403).json({
          success: false,
          message: 'Accès refusé',
        });
      }

      const users = await User.all();

      return response.json({
        success: true,
        data: users.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          is_active: u.is_active,
          site_affectation: u.site_affectation,
        })),
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des utilisateurs',
        error: error.message,
      });
    }
  }

  /**
   * Créer un nouvel utilisateur (SUPER_ADMIN seulement)
   * POST /users
   */
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = auth.user!;

      // Seul SUPER_ADMIN peut créer des utilisateurs
      if (user.role !== 'SUPER_ADMIN') {
        return response.status(403).json({
          success: false,
          message: 'Seul le SUPER_ADMIN peut créer des utilisateurs',
        });
      }

      const { name, email, password, role, site_affectation, is_active } = request.only([
        'name',
        'email',
        'password',
        'role',
        'site_affectation',
        'is_active',
      ]);

      // Validations
      if (!name || !email || !password || !role) {
        return response.status(400).json({
          success: false,
          message: 'Nom, email, mot de passe et rôle requis',
        });
      }

      if (!VALID_ROLES.includes(role)) {
        return response.status(400).json({
          success: false,
          message: `Rôle invalide. Rôles valides: ${VALID_ROLES.join(', ')}`,
        });
      }

      if (site_affectation && !VALID_SITES.includes(site_affectation)) {
        return response.status(400).json({
          success: false,
          message: `Site invalide. Sites valides: ${VALID_SITES.join(', ')}`,
        });
      }

      // Vérifier que l'email n'existe pas
      const existingUser = await User.findBy('email', email);
      if (existingUser) {
        return response.status(400).json({
          success: false,
          message: 'Un utilisateur avec cet email existe déjà',
        });
      }

      // Créer l'utilisateur
      const newUser = await User.create({
        name,
        email,
        password,
        role,
        site_affectation: site_affectation || 'Tous',
        is_active: is_active !== undefined ? is_active : true,
      });

      return response.json({
        success: true,
        message: 'Utilisateur créé avec succès',
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          site_affectation: newUser.site_affectation,
          is_active: newUser.is_active,
        },
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erreur lors de la création de l\'utilisateur',
        error: error.message,
      });
    }
  }

  /**
   * Afficher un utilisateur
   * GET /users/:id
   */
  public async show({ params, response, auth }: HttpContextContract) {
    try {
      const user = auth.user!;

      // Seuls SUPER_ADMIN et ADMIN peuvent voir les détails d'un utilisateur
      if (!['SUPER_ADMIN', 'ADMIN'].includes(user.role)) {
        return response.status(403).json({
          success: false,
          message: 'Accès refusé',
        });
      }

      const targetUser = await User.find(params.id);

      if (!targetUser) {
        return response.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé',
        });
      }

      return response.json({
        success: true,
        data: {
          id: targetUser.id,
          name: targetUser.name,
          email: targetUser.email,
          role: targetUser.role,
          site_affectation: targetUser.site_affectation,
          is_active: targetUser.is_active,
        },
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'utilisateur',
        error: error.message,
      });
    }
  }

  /**
   * Mettre à jour un utilisateur (SUPER_ADMIN seulement)
   * PUT /users/:id
   */
  public async update({ params, request, response, auth }: HttpContextContract) {
    try {
      const user = auth.user!;

      // Seul SUPER_ADMIN peut modifier les utilisateurs
      if (user.role !== 'SUPER_ADMIN') {
        return response.status(403).json({
          success: false,
          message: 'Seul le SUPER_ADMIN peut modifier les utilisateurs',
        });
      }

      const targetUser = await User.find(params.id);

      if (!targetUser) {
        return response.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé',
        });
      }

      const { name, email, role, site_affectation, is_active, password } = request.only([
        'name',
        'email',
        'role',
        'site_affectation',
        'is_active',
        'password',
      ]);

      if (name) targetUser.name = name;
      if (email) {
        const existingUser = await User.findBy('email', email);
        if (existingUser && existingUser.id !== targetUser.id) {
          return response.status(400).json({
            success: false,
            message: 'Un utilisateur avec cet email existe déjà',
          });
        }
        targetUser.email = email;
      }
      if (role && VALID_ROLES.includes(role)) {
        targetUser.role = role;
      }
      if (site_affectation && VALID_SITES.includes(site_affectation)) {
        targetUser.site_affectation = site_affectation;
      }
      if (is_active !== undefined) {
        targetUser.is_active = is_active;
      }
      if (password) {
        targetUser.password = password;
      }

      await targetUser.save();

      return response.json({
        success: true,
        message: 'Utilisateur mis à jour avec succès',
        data: {
          id: targetUser.id,
          name: targetUser.name,
          email: targetUser.email,
          role: targetUser.role,
          site_affectation: targetUser.site_affectation,
          is_active: targetUser.is_active,
        },
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour de l\'utilisateur',
        error: error.message,
      });
    }
  }

  /**
   * Désactiver un utilisateur (SUPER_ADMIN seulement)
   * DELETE /users/:id
   */
  public async destroy({ params, response, auth }: HttpContextContract) {
    try {
      const user = auth.user!;

      // Seul SUPER_ADMIN peut désactiver les utilisateurs
      if (user.role !== 'SUPER_ADMIN') {
        return response.status(403).json({
          success: false,
          message: 'Seul le SUPER_ADMIN peut désactiver les utilisateurs',
        });
      }

      const targetUser = await User.find(params.id);

      if (!targetUser) {
        return response.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé',
        });
      }

      // Empêcher de désactiver le seul SUPER_ADMIN
      if (targetUser.role === 'SUPER_ADMIN' && targetUser.id === user.id) {
        return response.status(403).json({
          success: false,
          message: 'Vous ne pouvez pas désactiver votre propre compte SUPER_ADMIN',
        });
      }

      targetUser.is_active = false;
      await targetUser.save();

      return response.json({
        success: true,
        message: 'Utilisateur désactivé avec succès',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erreur lors de la désactivation de l\'utilisateur',
        error: error.message,
      });
    }
  }

  /**
   * Réinitialiser le mot de passe d'un utilisateur (SUPER_ADMIN seulement)
   * POST /users/:id/reset-password
   */
  public async resetPassword({ params, request, response, auth }: HttpContextContract) {
    try {
      const user = auth.user!;

      // Seul SUPER_ADMIN peut réinitialiser les mots de passe
      if (user.role !== 'SUPER_ADMIN') {
        return response.status(403).json({
          success: false,
          message: 'Seul le SUPER_ADMIN peut réinitialiser les mots de passe',
        });
      }

      const { new_password } = request.only(['new_password']);

      if (!new_password) {
        return response.status(400).json({
          success: false,
          message: 'Nouveau mot de passe requis',
        });
      }

      const targetUser = await User.find(params.id);

      if (!targetUser) {
        return response.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé',
        });
      }

      targetUser.password = new_password;
      await targetUser.save();

      return response.json({
        success: true,
        message: 'Mot de passe réinitialisé avec succès',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Erreur lors de la réinitialisation du mot de passe',
        error: error.message,
      });
    }
  }
}
