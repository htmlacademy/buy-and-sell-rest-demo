import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public email: string ;

  @Expose()
  public avatarPath: string;

  @Expose()
  public firstname: string;

  @Expose()
  public lastname: string;
}
