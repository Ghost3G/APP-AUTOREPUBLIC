import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public vin: string;

  @column()
  public brand: string;

  @column()
  public model: string;

  @column()
  public status: 'disponible' | 'reserve' | 'vendu';

  @column()
  public mileage: number;

  @column()
  public purchasePrice: number;

  @column()
  public salePrice: number;

  @column()
  public coverImage?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: Date;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: Date;
}
