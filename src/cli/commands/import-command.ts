import { Command } from '../types/command.js';
import AsyncTSVFileReader from '../tsv-async-reader.js';

export default class ImportCommand implements Command {
  public readonly name = '--import';
  public execute(filename: string): void {
    const fileReader = new AsyncTSVFileReader(filename.trim());

    try {
      fileReader.read();
      fileReader.toArray().then((tickets) => console.log(tickets));
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`)
    }
  }
}
