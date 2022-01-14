import CLIApplication from './cli/cli-application.js';
import HelpCommand from './cli/commands/help-command.js';
import ImportCommand from './cli/commands/import-command.js';
import VersionCommand from './cli/commands/version-command.js';
import GeneratorCommand from './cli/commands/generate-command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  HelpCommand, ImportCommand,
  VersionCommand, GeneratorCommand
]);
myManager.processCommand(process.argv);
