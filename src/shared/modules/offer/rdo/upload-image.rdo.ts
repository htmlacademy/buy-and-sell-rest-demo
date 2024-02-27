import { Expose } from 'class-transformer';

export class UploadImageRdo {
  @Expose()
  public image: string;
}
