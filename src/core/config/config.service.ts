import { ConfigInterface } from './config.interface.js';

export default class ConfigService implements ConfigInterface {
  constructor(
    private readonly config: NodeJS.ProcessEnv
  ) {}

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
