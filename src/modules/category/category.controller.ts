import 'reflect-metadata';
import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {plainToInstance} from 'class-transformer';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {CategoryServiceInterface} from './category-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import CategoryDto from './dto/category.dto.js';
import {fillDTO} from '../../utils/common.js';

@injectable()
export default class CategoryController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const categories = await this.categoryService.find();
    const categoriesDTO = fillDTO(CategoryDto, categories);
    this.send(res, StatusCodes.OK, categoriesDTO);
  }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }
}
