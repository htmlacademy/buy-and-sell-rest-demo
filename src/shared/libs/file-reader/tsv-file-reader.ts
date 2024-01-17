import EventEmitter from 'node:events';
import { FileReader } from './file-reader.interface.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  public read(): void {
    // Код для работы с потоками
  }
}
