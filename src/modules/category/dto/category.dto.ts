import {Expose} from 'class-transformer';

export default class CategoryDto {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;
}
