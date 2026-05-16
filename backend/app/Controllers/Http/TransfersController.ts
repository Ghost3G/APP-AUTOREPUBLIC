import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Transfer from 'App/Models/Transfer';

export default class TransfersController {
  public async index() {
    return Transfer.all();
  }

  public async store({ request }: HttpContextContract) {
    const payload = request.only(['vehicleId', 'fromLocation', 'toLocation', 'status', 'notes']);
    return Transfer.create(payload);
  }

  public async show({ params }: HttpContextContract) {
    return Transfer.findOrFail(params.id);
  }

  public async update({ params, request }: HttpContextContract) {
    const transfer = await Transfer.findOrFail(params.id);
    transfer.merge(request.only(['status', 'notes']));
    await transfer.save();
    return transfer;
  }

  public async destroy({ params }: HttpContextContract) {
    const transfer = await Transfer.findOrFail(params.id);
    await transfer.delete();
    return { message: 'Transfert supprimé' };
  }
}
