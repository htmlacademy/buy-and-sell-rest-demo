import {User} from '../../types/user.type.js';
import typegoose, {getModelForClass} from '@typegoose/typegoose';
import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';

const {prop} = typegoose;

export interface UserEntity extends Base {}

export class UserEntity extends TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email!: string;

  @prop()
  public avatarPath!: string;

  @prop()
  public firstname!: string;

  @prop()
  public lastname!: string;

  @prop()
  public password!: string;
}

export const UserModel = getModelForClass(UserEntity);
