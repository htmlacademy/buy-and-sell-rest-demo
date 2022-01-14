import dayjs from 'dayjs';
import {OfferGenerator} from '../types/offer-generator.js';
import {ServerInitialData} from './types/server-initial-data.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../utils/common.js';

export default class StringOfferGenerator implements OfferGenerator {
  private readonly initialData: ServerInitialData;

  constructor(initialData: ServerInitialData) {
    this.initialData = initialData;
  }

  private generateOffer(): string {
    if (!this.initialData) {
      throw new Error('Empty initial data');
    }

    const categories = getRandomItems<string>(this.initialData.categories).join(';');
    const title = getRandomItem<string>(this.initialData.titles);
    const description = getRandomItem<string>(this.initialData.descriptions);
    const createdDate =  dayjs().subtract(generateRandomValue(1, 7), 'day').toISOString();
    const photos = getRandomItems<string>(this.initialData.offerImages).join(';');
    const type = getRandomItem(['buy', 'sell']);
    const price = generateRandomValue(500, 2000).toString();
    const author = getRandomItem<string>(this.initialData.users);
    const email = getRandomItem<string>(this.initialData.emails);
    const avatar = getRandomItem<string>(this.initialData.avatars);

    return [
      title, description, createdDate,
      photos, type, price, categories,
      author, email, avatar,
    ].join('\t');
  }

  generate(): string {
    return this.generateOffer();
  }
}
