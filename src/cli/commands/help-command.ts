import { Command } from '../types/command.js';

export default class HelpCommand implements Command {
  public readonly name = '--help';

  execute(): void {
    console.log(`
        Программа для подготовки данных для REST API сервера.

        Пример:
            main.js --<command> [--arguments]

        Команды:
            --version:                  # выводит номер версии
            --help:                     # печатает этот текст
            --import <path>:            # импортирует данные из CSV
        `);
  }
}
