import CSVFileReader from '../csv-file-reader.js';
import { Command } from '../types/command.js';

export default class ImportCommand implements Command {
  public readonly name = '--import';
  public execute(filename: string): void {
    const fileReader = new CSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`)
    }
  }
}
