import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public reference: string;

  @column()
  public clientName: string;

  @column()
  public amount: number;

  @column()
  public status: 'brouillon' | 'envoye' | 'payee' | 'impayee';

  @column.date()
  public dueDate: Date;

  @column.dateTime({ autoCreate: true })
  public createdAt: Date;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: Date;
}
