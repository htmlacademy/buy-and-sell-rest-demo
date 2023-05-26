import { Expose } from 'class-transformer';

export default class CategoryRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}
