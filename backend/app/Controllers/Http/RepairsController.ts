import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Repair from 'App/Models/Repair';

export default class RepairsController {
  public async index() {
    return Repair.all();
  }

  public async store({ request }: HttpContextContract) {
    const payload = request.only(['vehicleId', 'reference', 'status', 'technician', 'estimatedCost', 'notes']);
    return Repair.create(payload);
  }

  public async show({ params }: HttpContextContract) {
    return Repair.findOrFail(params.id);
  }

  public async update({ params, request }: HttpContextContract) {
    const repair = await Repair.findOrFail(params.id);
    repair.merge(request.only(['status', 'technician', 'estimatedCost', 'notes']));
    await repair.save();
    return repair;
  }

  public async destroy({ params }: HttpContextContract) {
    const repair = await Repair.findOrFail(params.id);
    await repair.delete();
    return { message: 'Réparation supprimée' };
  }
}
