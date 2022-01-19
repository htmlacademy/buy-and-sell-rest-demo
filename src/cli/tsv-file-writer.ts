import { createWriteStream, WriteStream} from 'fs';
import { FileWriter } from './types/file-writer.js';

export default class TSVFileWriter implements FileWriter<string> {
  private stream: WriteStream;

  constructor(public readonly filename: string) {
    this.stream = createWriteStream(this.filename, {
      // Открыть файл для записи
      // Файл будет создан, если не существует
      flags: 'w',
      encoding: 'utf8',
      // Размер внутреннего буфера (64KB)
      highWaterMark: 2 ** 16,

      // Закрывать поток автоматически
      autoClose: true,
    });
  }

  public async write(data: string): Promise<void> {
    if (!this.stream.write(data + '\n')) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
