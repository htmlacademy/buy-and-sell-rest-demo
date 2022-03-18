import { CLIManager } from './types/cli-manager.js';
import { Command } from './types/command.js';
import { ParsedCommand } from './types/parsed-command.js';

export default class CLIApplication implements CLIManager {
  private commands: {[propertyName: string]: Command} = {};
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

  public registerCommands(commandList: { new(): Command }[]): void {
    this.commands = commandList.reduce((acc, Command) => {
      const cliCommand = new Command();
      acc[cliCommand.name] = new Command();
      return acc;
    }, this.commands)
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
