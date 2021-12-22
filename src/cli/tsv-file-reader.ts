import { readFileSync } from 'fs';
import { Ticket } from '../types/ticket.js';
import { FileReader } from './types/file-reader.js';

export default class TSVFileReader implements FileReader<Ticket[]> {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Ticket[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, photos, type, price, categories, name, email, avatarUrl]) => ({
        id: '',
        title,
        type,
        description,
        createdDate: new Date(createdDate),
        price: Number.parseInt(price, 10),
        photos: photos.split(';'),
        author: { id: '', avatarUrl, email, name },
        categories: categories.split(';')
          .map((title) => ({ id: '', title, pictureUrl: '' })),
      }) as Ticket);
  }
}
