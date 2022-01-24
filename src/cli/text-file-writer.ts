import {writeFile} from 'fs/promises';
import {FileWriter} from './types/file-writer.js';

export default class TextFileWriter implements FileWriter<string> {
  constructor(public readonly filename: string) {}

  async write(data: string) {
    await writeFile(this.filename, data, 'utf8');
  }
}
