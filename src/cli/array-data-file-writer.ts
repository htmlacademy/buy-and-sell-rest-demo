import {appendFile} from 'fs/promises';
import {FileWriter} from './types/file-writer.js';

export default class ArrayDataFileWriter implements FileWriter<Array<string>> {
  constructor(public readonly filename: string) {}

  async write(data: Array<string>): Promise<void> {
    for (const item of data) {
      await appendFile(this.filename, item + '\n');
    }
  }
}
