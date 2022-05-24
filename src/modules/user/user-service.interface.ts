import CreateUserDto from './dto/create-user.dto.js';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {UserEntity} from './user.entity.js';
import LoginUserDto from './dto/login-user.dto.js';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null>;
}
