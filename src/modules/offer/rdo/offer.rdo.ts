import { Expose, Type } from 'class-transformer';
import CategoryRdo from '../../category/rdo/category.rdo.js';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class OfferRdo {
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
  @Type(() => CategoryRdo)
  public categories!: CategoryRdo[];

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user!: UserRdo;
}
