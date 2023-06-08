import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { createErrorObject } from '../helpers/index.js';
import HttpError from '../errors/http-error.js';
import { ServiceError } from '../../types/service-error.enum.js';

@injectable()
export default class HttpErrorExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ServiceError.CommonError, error.message));
  }
}
