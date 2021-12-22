import { CLIManager } from './types/cli-manager.js';
import { Command } from './types/command.js';
import { ParsedCommand } from './types/parsed-command.js';

export default class CLIApplication implements CLIManager {
  private commands: Command[] = [];
  private defaultCommand = '--help';

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith('--')) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }

      return acc;
    }, parsedCommand);
  }

  public registerCommands(commands: { new(): Command }[]): void {
    this.commands = commands.map((Command) => new Command());
  }

  public getCommand(commandName: string): Command {
    const command = this.commands.find((command) => command.name === commandName);

    if (!command) {
      return this.getCommand(this.defaultCommand);
    }

    return command;
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    command.execute(...parsedCommand[commandName]);
  }
}
