import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CategoryServiceInterface } from './category-service.interface.js';
import { fillDTO } from '../../core/helpers/index.js';
import CategoryRdo from './rdo/category.rdo.js';
import CreateCategoryDto from './dto/create-category.dto';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class CategoryController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const categories = await this.categoryService.find();
    const categoriesToResponse = fillDTO(CategoryRdo, categories);
    this.ok(res, categoriesToResponse);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCategoryDto>,
    res: Response
  ): Promise<void> {

    const existCategory = await this.categoryService.findByCategoryName(body.name);

    if (existCategory) {
      const errorMessage = `Category with name «${body.name}» exists.`;
      this.send(res, StatusCodes.UNPROCESSABLE_ENTITY, {error: errorMessage});
      return this.logger.error(errorMessage);
    }

    const result = await this.categoryService.create(body);
    this.created(res, fillDTO(CategoryRdo, result));
  }
}
