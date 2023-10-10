import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { CategoryService } from './category-service.interface.js';

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
    this.ok(res, categories);
  }

  public create(_req: Request, _res: Response): void {
    // Код обработчика
  }
}
