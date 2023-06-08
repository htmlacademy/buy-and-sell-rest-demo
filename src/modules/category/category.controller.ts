import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { CategoryServiceInterface } from './category-service.interface.js';
import { fillDTO } from '../../core/helpers/index.js';
import CategoryRdo from './rdo/category.rdo.js';
import CreateCategoryDto from './dto/create-category.dto.js';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { RequestQuery } from '../../types/request-query.type.js';
import OfferRdo from '../offer/rdo/offer.rdo.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import { ValidateObjectIdMiddleware } from '../../core/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middleware/validate-dto.middleware.js';
import { PrivateRouteMiddleware } from '../../core/middleware/private-route.middleware.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { RestSchema } from '../../core/config/rest.schema.js';

type ParamsCategoryDetails = {
  categoryId: string;
} | ParamsDictionary

@injectable()
export default class CategoryController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.CategoryServiceInterface) private readonly categoryService: CategoryServiceInterface,
    @inject(AppComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCategoryDto)
      ]
    });
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({
      path: '/:categoryId/offers',
      method: HttpMethod.Get,
      handler: this.getOffersFromCategory,
      middlewares: [new ValidateObjectIdMiddleware('categoryId')]
    });
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
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Category with name «${body.name}» exists.`,
        'CategoryController'
      );
    }

    const result = await this.categoryService.create(body);
    this.created(res, fillDTO(CategoryRdo, result));
  }

  public async getOffersFromCategory(
    {params, query}: Request<ParamsCategoryDetails, UnknownRecord, UnknownRecord, RequestQuery>,
    res: Response
  ):Promise<void> {
    const offers = await this.offerService.findByCategoryId(params.categoryId, query.limit);
    this.ok(res, fillDTO(OfferRdo, offers));
  }
}
