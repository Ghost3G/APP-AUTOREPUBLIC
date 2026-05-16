import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Vehicle from 'App/Models/Vehicle';

export default class VehiclesController {
  public async index() {
    return Vehicle.all();
  }

  public async store({ request }: HttpContextContract) {
    const payload = request.only([
      'vin',
      'brand',
      'model',
      'status',
      'mileage',
      'purchasePrice',
      'salePrice',
      'coverImage',
    ]);
    const vehicle = await Vehicle.create(payload);
    return vehicle;
  }

  public async show({ params }: HttpContextContract) {
    return Vehicle.findOrFail(params.id);
  }

  public async update({ params, request }: HttpContextContract) {
    const vehicle = await Vehicle.findOrFail(params.id);
    vehicle.merge(request.only(['status', 'mileage', 'salePrice']));
    await vehicle.save();
    return vehicle;
  }

  public async destroy({ params }: HttpContextContract) {
    const vehicle = await Vehicle.findOrFail(params.id);
    await vehicle.delete();
    return { message: 'Véhicule supprimé' };
  }
}
