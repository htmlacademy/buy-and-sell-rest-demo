import { config } from 'dotenv';
import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';
import { configRestSchema, RestSchema } from './rest.schema.js';

export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    private readonly logger: Logger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
