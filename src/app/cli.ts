import { CliCommandInterface } from '../core/cli-command/cli-command.interface';

export default class CLIApplication {
  private commands: {[propertyName: string]: CliCommandInterface} = {};

  public registerCommands(commandList: CliCommandInterface[]): void {
    commandList.reduce((acc, command) => {
      const cliCommand = command;
      acc[cliCommand.name] = cliCommand;
      return acc;
    }, this.commands);
  }

}
