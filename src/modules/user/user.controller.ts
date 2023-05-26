import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import CreateUserDto from './dto/create-user.dto.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
  }

  public async create(
    _req: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    _res: Response,
    next: NextFunction
  ): Promise<void> {

    try {
      throw new Error('[UserController] Oops');
    } catch (error) {
      return next(error);
    }
  }
}
