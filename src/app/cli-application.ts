import { CliCommandInterface } from '../cli-command/cli-command.interface.js';

type ParsedCommand = {
  [key: string]: string[]
}

export default class CLIApplication {
  private commands: {[propertyName: string]: CliCommandInterface} = {};

  public registerCommands(commandList: CliCommandInterface[]): void {
    this.commands = commandList.reduce((acc, Command) => {
      const cliCommand = Command;
      acc[cliCommand.name] = cliCommand;
      return acc;
    }, this.commands);
  }

}
