import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Repair extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public vehicleId: number;

  @column()
  public reference: string;

  @column()
  public status: 'reception' | 'diagnostic' | 'en_cours' | 'termine' | 'livre';

  @column()
  public technician: string;

  @column()
  public estimatedCost: number;

  @column()
  public notes?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: Date;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: Date;
}
