import EventEmitter from 'events';
import {createReadStream} from 'fs';
import { Ticket } from '../types/ticket.js';
import {FileReader} from './types/file-reader.js';
import {tsvStringToTicket} from '../utils/common.js';

// TODO. Показать как изменять лимит на память в v8
//  -- max-old-space-size (https://nodejs.org/api/cli.html#cli_node_options_options)
//  Например: node --max-old-space-size=8192

export default class AsyncTSVFileReader extends EventEmitter implements FileReader<Promise<Ticket[]>>{
  private importedData: Ticket[] = [];
  private resolve: ((rows: Ticket[]) => void) | null;

  constructor(public readonly filename: string) {
    super();
    this.resolve = null;

    this.addListener('end', () => this.handleEnd());
    this.addListener('data', (row) => this.handleRowRead(row));
  }

  private handleRowRead(row: string) {
    // TODO. Объяснить, что хранить все объекты
    //  в памяти не нужно. Их может быть много
    //  и память не резиновая. Если привысить допустимые
    //  объёмы, приложение упадёт.
    //  Можно показать вывод v8.getHeapStatistics()
    //  в режим REPL. И заодно падение приложение
    this.importedData.push(tsvStringToTicket(row));
  }

  private handleEnd() {
    if (this.resolve) {
      this.resolve(this.importedData);
    }
  }

  public async read() {
    const stream = createReadStream(this.filename, {
      encoding: 'utf8',
      // TODO. Для демонстрации на лайве можно
      //  установить значение в highWaterMark: 1000.
    });

    let tempString = '';
    let endLinePosition = -1;
    this.importedData.length = 0;

    for await (const chunk of stream) {
      tempString = tempString + chunk.toString();

      while ((endLinePosition = tempString.indexOf('\n')) >= 0) {
        const completeRow = tempString.slice(0, endLinePosition + 1);
        tempString = tempString.slice(++endLinePosition);
        this.emit('data', completeRow);
      }
    }

    this.emit('end', this.importedData.length);
  }

  public async toArray(): Promise<Ticket[]> {
    return new Promise((resolve) => {
       this.resolve = resolve;
    });
  }
}
