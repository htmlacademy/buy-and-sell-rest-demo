import CreateUserDto from './dto/create-user.dto.js';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {UserEntity} from './user.entity.js';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
}
