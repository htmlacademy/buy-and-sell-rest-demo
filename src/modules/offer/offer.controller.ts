import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import HttpError from '../../core/errors/http-error.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { fillDTO } from '../../core/helpers/index.js';
import OfferRdo from './rdo/offer.rdo.js';

type ParamsOfferDetails = {
  offerId: string;
} | ParamsDictionary

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.show});
  }

  public async show(
    { params }: Request<ParamsOfferDetails>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }
}
