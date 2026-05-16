import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Transfer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public vehicleId: number;

  @column()
  public fromLocation: string;

  @column()
  public toLocation: string;

  @column()
  public status: 'planifie' | 'en_transit' | 'termine';

  @column()
  public notes?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: Date;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: Date;
}
