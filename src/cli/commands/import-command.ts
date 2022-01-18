import { Command } from '../types/command.js';
import AsyncTSVFileReader from '../tsv-async-reader.js';
import {tsvStringToTicket} from '../../utils/common.js';

export default class ImportCommand implements Command {
  public readonly name = '--import';
  public execute(filename: string): void {
    const fileReader = new AsyncTSVFileReader(filename.trim());

    try {
      fileReader.addListener('data', (row) => console.log(tsvStringToTicket(row)));
      fileReader.addListener('end', (count: number) => console.log(`Импортировано: ${count}`));
      fileReader.read();
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`)
    }
  }
}
