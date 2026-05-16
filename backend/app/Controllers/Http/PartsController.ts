import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Part from 'App/Models/Part';

export default class PartsController {
  public async index() {
    return Part.all();
  }

  public async store({ request }: HttpContextContract) {
    const payload = request.only(['reference', 'name', 'category', 'stock', 'purchasePrice', 'salePrice', 'lowStockThreshold']);
    return Part.create(payload);
  }

  public async show({ params }: HttpContextContract) {
    return Part.findOrFail(params.id);
  }

  public async update({ params, request }: HttpContextContract) {
    const part = await Part.findOrFail(params.id);
    part.merge(request.only(['stock', 'purchasePrice', 'salePrice', 'lowStockThreshold']));
    await part.save();
    return part;
  }

  public async destroy({ params }: HttpContextContract) {
    const part = await Part.findOrFail(params.id);
    await part.delete();
    return { message: 'Pièce supprimée' };
  }
}
