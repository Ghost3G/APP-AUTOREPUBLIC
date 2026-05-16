import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Importation extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public vehicleId: number;

  @column()
  public transportCost: number;

  @column()
  public customsCost: number;

  @column()
  public portCost: number;

  @column.date()
  public arrivalDate: Date;

  @column()
  public status: 'en_route' | 'arrive' | 'en_douane' | 'termine';

  @column.dateTime({ autoCreate: true })
  public createdAt: Date;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: Date;
}
