import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { CategoryService } from './category-service.interface.js';
import { DefaultCategoryService } from './category.service.js';
import { CategoryEntity, CategoryModel } from './category.entity.js';
import { Controller } from '../../libs/rest/index.js';
import { CategoryController } from './category.controller.js';

export function createCategoryContainer() {
  const categoryContainer = new Container();

  categoryContainer.bind<CategoryService>(Component.CategoryService).to(DefaultCategoryService);
  categoryContainer.bind<types.ModelType<CategoryEntity>>(Component.CategoryModel).toConstantValue(CategoryModel);
  categoryContainer.bind<Controller>(Component.CategoryController).to(CategoryController).inSingletonScope();

  return categoryContainer;
}
