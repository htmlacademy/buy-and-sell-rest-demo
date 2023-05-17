import { User } from '../../types/user.type.js';

export class UserEntity implements User {
  public email = '';
  public avatarPath = '';
  public firstname = '';
  public lastname = '';
}
