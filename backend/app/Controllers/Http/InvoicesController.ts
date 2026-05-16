import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Invoice from 'App/Models/Invoice';

export default class InvoicesController {
  public async index() {
    return Invoice.all();
  }

  public async store({ request }: HttpContextContract) {
    const payload = request.only(['reference', 'clientName', 'amount', 'status', 'dueDate']);
    return Invoice.create(payload);
  }

  public async show({ params }: HttpContextContract) {
    return Invoice.findOrFail(params.id);
  }

  public async update({ params, request }: HttpContextContract) {
    const invoice = await Invoice.findOrFail(params.id);
    invoice.merge(request.only(['status', 'amount', 'dueDate']));
    await invoice.save();
    return invoice;
  }

  public async destroy({ params }: HttpContextContract) {
    const invoice = await Invoice.findOrFail(params.id);
    await invoice.delete();
    return { message: 'Facture supprimée' };
  }
}
