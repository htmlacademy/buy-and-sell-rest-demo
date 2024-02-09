import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { CategoryService } from './category-service.interface.js';
import { fillDTO } from '../../helpers/index.js';
import { CategoryRdo } from './rdo/category.rdo.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class CategoryController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CategoryService) private readonly categoryService: CategoryService,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const categories = await this.categoryService.find();
    const responseData = fillDTO(CategoryRdo, categories);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCategoryDto>,
    res: Response
  ): Promise<void> {

    const existCategory = await this.categoryService.findByCategoryName(body.name);

    if (existCategory) {
      const existCategoryError = new Error(`Category with name «${body.name}» exists.`);
      this.send(res,
        StatusCodes.UNPROCESSABLE_ENTITY,
        { error: existCategoryError.message }
      );

      return this.logger.error(existCategoryError.message, existCategoryError);
    }

    const result = await this.categoryService.create(body);
    this.created(res, fillDTO(CategoryRdo, result));
  }
}
