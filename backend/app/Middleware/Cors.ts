import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class Cors {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    response.header('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN || '*');
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

    if (request.method() === 'OPTIONS') {
      response.status(204).send('');
      return;
    }

    await next();
  }
}
