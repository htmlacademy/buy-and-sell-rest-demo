import {Expose, Type} from 'class-transformer';
import UserDto from '../../user/dto/user.dto.js';
import CategoryDto from '../../category/dto/category.dto.js';

export default class OfferDto {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public image!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public price!: number;

  @Expose()
  public type!: string;

  @Expose()
  public commentCount!: number;

  @Expose()
  @Type(() => CategoryDto)
  public categories!: CategoryDto[];

  @Expose({ name: 'userId'})
  @Type(() => UserDto)
  public user!: UserDto;
}
