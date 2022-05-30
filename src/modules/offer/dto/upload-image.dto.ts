import {Expose} from 'class-transformer';

export default class UploadImageDto {
  @Expose()
  public image!: string;
}
