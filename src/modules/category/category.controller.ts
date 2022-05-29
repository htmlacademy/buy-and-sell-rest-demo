import 'reflect-metadata';
import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {CategoryServiceInterface} from './category-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import CategoryDto from './dto/category.dto.js';
import {fillDTO} from '../../utils/common.js';
import CreateCategoryDto from './dto/create-category.dto.js';
import HttpError from '../../common/errors/http-error.js';
import * as core from 'express-serve-static-core';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js';
import {OfferServiceInterface} from '../offer/offer-service.interface.js';
import OfferDto from '../offer/dto/offer.dto.js';
import {RequestQuery} from '../../types/request-query.type.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import {ConfigInterface} from '../../common/config/config.interface.js';

type ParamsGetCategory = {
  categoryId: string;
}

@injectable()
export default class CategoryController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface
  ) {
    super(logger, configService);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCategoryDto)]
    });
    this.addRoute({
      path: '/:categoryId/offers',
      method: HttpMethod.Get,
      handler: this.getOffersFromCategory,
      middlewares: [new ValidateObjectIdMiddleware('categoryId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const categories = await this.categoryService.find();
    this.ok(res, fillDTO(CategoryDto, categories));
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCategoryDto>,
    res: Response): Promise<void> {

    const existCategory = await this.categoryService.findByCategoryName(body.name);

    if (existCategory) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Category with name «${body.name}» exists.`,
        'CategoryController'
      );
    }

    const result = await this.categoryService.create(body);
    this.created(res, fillDTO(CategoryDto, result));
  }

  public async getOffersFromCategory(
    {params, query}: Request<core.ParamsDictionary | ParamsGetCategory, unknown, unknown, RequestQuery>,
    res: Response
  ):Promise<void> {
    const offers = await this.offerService.findByCategoryId(params.categoryId, query.limit);
    this.ok(res, fillDTO(OfferDto, offers));
  }
}
