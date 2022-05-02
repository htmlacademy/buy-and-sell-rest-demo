import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import typegoose, {getModelForClass} from '@typegoose/typegoose';
import {Category} from '../../types/category.type.js';

const {prop, modelOptions} = typegoose;

export interface CategoryEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'categories'
  }
})
export class CategoryEntity extends TimeStamps implements Category {
  @prop({required: true, trim: true})
  public name!: string;
}

export const CategoryModel = getModelForClass(CategoryEntity);
