import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, OfferType } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, image, type, price, categories, firstname, lastname, email, avatarPath]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        image,
        type: OfferType[type as 'Buy' | 'Sell'],
        categories: categories.split(';')
          .map((name) => ({name})),
        price: Number.parseInt(price, 10),
        user: { email, firstname, lastname, avatarPath },
      }));
  }
}
