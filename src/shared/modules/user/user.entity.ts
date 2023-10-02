import { getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../../types/index.js';

export class UserEntity implements User {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarPath: string;

  @prop({ required: true })
  public firstname: string;

  @prop({ required: true })
  public lastname: string;
}

export const UserModel = getModelForClass(UserEntity);
