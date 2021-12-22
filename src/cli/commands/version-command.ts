import { readFileSync } from 'fs';
import { Command } from '../types/command.js';

export default class VersionCommand implements Command {
  public readonly name = '--version';

  private readVersion(): string {
    const contentPageJSON = readFileSync('./package.json', 'utf-8');
    const content = JSON.parse(contentPageJSON);
    return content.version;
  }

  async execute() {
    const version = this.readVersion();
    console.log(version);
  }
}
