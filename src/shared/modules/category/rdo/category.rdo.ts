import { Expose } from 'class-transformer';

export class CategoryRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;
}
