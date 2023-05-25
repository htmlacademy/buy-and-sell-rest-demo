import { AppComponent } from '../../types/app-component.enum.js';
import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CategoryServiceInterface } from './category-service.interface.js';
import { CategoryEntity, CategoryModel } from './category.entity.js';
import CategoryService from './category.service.js';
import { ControllerInterface } from '../../core/controller/controller.interface.js';
import CategoryController from './category.controller.js';

export function createCategoryContainer() {
  const categoryContainer = new Container();

  categoryContainer.bind<CategoryServiceInterface>(AppComponent.CategoryServiceInterface).to(CategoryService);
  categoryContainer.bind<types.ModelType<CategoryEntity>>(AppComponent.CategoryModel).toConstantValue(CategoryModel);
  categoryContainer.bind<ControllerInterface>(AppComponent.CategoryController).to(CategoryController).inSingletonScope();

  return categoryContainer;
}
