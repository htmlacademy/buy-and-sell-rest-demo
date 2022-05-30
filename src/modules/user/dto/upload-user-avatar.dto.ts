import {Expose} from 'class-transformer';

export default class UploadUserAvatarDto {
  @Expose()
  public filepath!: string;
}
