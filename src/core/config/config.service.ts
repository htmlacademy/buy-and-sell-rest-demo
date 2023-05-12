import { ConfigInterface } from './config.interface.js';
import { LoggerInterface } from '../logger/logger.interface';
import { DotenvParseOutput, config } from 'dotenv';

export default class ConfigService implements ConfigInterface {
  private readonly config: NodeJS.ProcessEnv;

  constructor(
    private readonly logger: LoggerInterface,
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    this.logger.info('.env file found and successfully parsed!');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
