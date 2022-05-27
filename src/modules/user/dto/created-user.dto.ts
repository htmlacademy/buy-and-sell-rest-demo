import {Expose} from 'class-transformer';

export default class CreatedUserDto {
  @Expose()
  public id!: string;

  @Expose()
  public email!: string;
}
