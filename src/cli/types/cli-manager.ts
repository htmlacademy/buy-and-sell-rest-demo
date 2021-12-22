import { Command } from './command.js';

export interface CLIManager {
  registerCommands(commands: { new(): Command }[]): void;
  getCommand(commandName: string): Command;
  processCommand(argv: string[]): void;
}
