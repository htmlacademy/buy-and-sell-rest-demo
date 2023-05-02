import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-command/helper.command.js';
import VersionCommand from './core/cli-command/version.command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand, new VersionCommand
]);
myManager.processCommand(process.argv);
