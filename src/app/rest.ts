import { LoggerInterface } from '../core/logger/logger.interface.js';

export default class RestApplication {
  constructor(
    private readonly logger: LoggerInterface
  ) {}

  public async init() {
    this.logger.info('Application initialization…');
  }
}
