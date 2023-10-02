import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Category } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CategoryEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'categories'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CategoryEntity extends defaultClasses.TimeStamps implements Category {
  @prop({required: true, trim: true})
  public name!: string;
}

export const CategoryModel = getModelForClass(CategoryEntity);
