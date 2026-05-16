import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Part extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public reference: string;

  @column()
  public name: string;

  @column()
  public category: string;

  @column()
  public stock: number;

  @column()
  public purchasePrice: number;

  @column()
  public salePrice: number;

  @column()
  public lowStockThreshold: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: Date;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: Date;
}
