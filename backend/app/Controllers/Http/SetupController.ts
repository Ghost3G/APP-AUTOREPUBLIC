import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';
import Database from '@ioc:Adonis/Lucid/Database';

export default class SetupController {
  /**
   * Initialiser la base de données avec un utilisateur admin
   * POST /setup
   */
  public async initialize({ response }: HttpContextContract) {
    try {
      // Vérifier s'il existe déjà un utilisateur
      const existingUser = await User.query().first();
      if (existingUser) {
        return response.status(400).json({
          success: false,
          message: 'La base de données est déjà configurée',
        });
      }

      // Créer les tables (migrations)
      await Database.raw('SET FOREIGN_KEY_CHECKS=0');
      
      // Vérifier et créer la table users si elle n'existe pas
      const hasUsersTable = await Database.raw(
        "SELECT 1 FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'"
      );

      if (!hasUsersTable[0] || hasUsersTable[0].length === 0) {
        await Database.schema.createTable('users', (table) => {
          table.increments('id');
          table.string('name');
          table.string('email').unique();
          table.string('password');
          table.enum('role', [
            'SUPER_ADMIN',
            'ADMIN',
            'RESPONSABLE_GARAGE',
            'RESPONSABLE_SHOWROOM',
            'RECEPTIONNISTE',
            'TECHNICIEN',
            'COMPTABLE',
          ]).defaultTo('TECHNICIEN');
          table.enum('site_affectation', ['Garage', 'Showroom', 'Tous']).defaultTo('Garage');
          table.boolean('is_active').defaultTo(true);
          table.timestamp('created_at').defaultTo(Database.fn.now());
          table.timestamp('updated_at').defaultTo(Database.fn.now());
        });
      }

      await Database.raw('SET FOREIGN_KEY_CHECKS=1');

      // Créer l'utilisateur admin par défaut
      const adminUser = new User();
      adminUser.name = 'Administrateur';
      adminUser.email = 'admin@autorepublic.com';
      adminUser.password = await Hash.make('admin123');
      adminUser.role = 'SUPER_ADMIN';
      adminUser.site_affectation = 'Tous';
      adminUser.is_active = true;

      await adminUser.save();

      return response.status(201).json({
        success: true,
        message: 'Base de données initialisée avec succès',
        data: {
          adminUser: {
            id: adminUser.id,
            email: adminUser.email,
            role: adminUser.role,
          },
        },
      });
    } catch (error) {
      console.error('Setup error:', error);
      return response.status(500).json({
        success: false,
        message: 'Erreur lors de l\'initialisation',
        error: error.message,
      });
    }
  }
}
