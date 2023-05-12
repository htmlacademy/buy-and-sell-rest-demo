import { LoggerInterface } from '../core/logger/logger.interface.js';
import { ConfigInterface } from '../core/config/config.interface.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { AppComponent } from '../types/app-component.enum.js';
import { inject, injectable } from 'inversify';

@injectable()
export default class RestApplication {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
