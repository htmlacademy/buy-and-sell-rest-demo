import EventEmitter from 'events';
import {createReadStream} from 'fs';
import {FileReader} from './types/file-reader.js';

export default class AsyncTSVFileReader extends EventEmitter implements FileReader {
  constructor(public readonly filename: string) {
    super();
  }

  public async read() {
    const stream = createReadStream(this.filename, {
      encoding: 'utf8',
      // TODO. Для демонстрации на лайве можно
      //  установить значение в highWaterMark: 1000.
    });

    let tempString = '';
    let endLinePosition = -1;
    let count = 0;

    for await (const chunk of stream) {
      tempString = tempString + chunk.toString();

      while ((endLinePosition = tempString.indexOf('\n')) >= 0) {
        const completeRow = tempString.slice(0, endLinePosition + 1);
        tempString = tempString.slice(++endLinePosition);
        count++;
        this.emit('data', completeRow);
      }
    }

    this.emit('end', count);
  }
}
