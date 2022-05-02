import CreateCategoryDto from './dto/create-category.dto.js';
import {DocumentType} from '@typegoose/typegoose/lib/types.js';
import {CategoryEntity} from './category.entity.js';

export interface CategoryServiceInterface {
  create(dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>>;
  findByCategoryId(categoryId: string): Promise<DocumentType<CategoryEntity> | null>;
  findByCategoryName(categoryName: string): Promise<DocumentType<CategoryEntity> | null>;
  findByCategoryNameOrCreate(categoryName: string, dto: CreateCategoryDto): Promise<DocumentType<CategoryEntity>>;
}
