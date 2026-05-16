import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Importation from 'App/Models/Importation';

export default class ImportationsController {
  public async index() {
    return Importation.all();
  }

  public async store({ request }: HttpContextContract) {
    const payload = request.only([
      'vehicleId',
      'transportCost',
      'customsCost',
      'portCost',
      'arrivalDate',
      'status',
    ]);
    return Importation.create(payload);
  }

  public async show({ params }: HttpContextContract) {
    return Importation.findOrFail(params.id);
  }

  public async update({ params, request }: HttpContextContract) {
    const importation = await Importation.findOrFail(params.id);
    importation.merge(request.only(['status', 'transportCost', 'customsCost', 'portCost', 'arrivalDate']));
    await importation.save();
    return importation;
  }

  public async destroy({ params }: HttpContextContract) {
    const importation = await Importation.findOrFail(params.id);
    await importation.delete();
    return { message: 'Importation supprimée' };
  }
}
