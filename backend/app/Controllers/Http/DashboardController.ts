import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DashboardController {
  public async index({}: HttpContextContract) {
    return {
      showroomCount: 66,
      garageRepairs: 14,
      unpaidInvoices: 21,
      monthlyRevenue: 92400,
      alerts: [
        'Stock peinture bas pour le centre carrosserie.',
        'Commande de pièces de rechange en attente.',
      ],
    };
  }
}
