import got from 'got';
import { Command } from '../types/command.js';
import TextFileWriter from '../text-file-writer.js';
import StringOfferGenerator from '../string-offer-generator.js';
import {ServerInitialData} from '../types/server-initial-data.js';

const URL = 'http://localhost:3123/data';

export default class GeneratorCommand implements Command {
  public readonly name = '--generate';
  private initialData: ServerInitialData;

  public async execute(...parameters:string[]): Promise<void> {
    const [count, filepath] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(URL).json();
    } catch {
      console.error(`Не удалось загрузить данные с «${URL}».`);
      return;
    }

    const offerGeneratorString = new StringOfferGenerator(this.initialData);
    const offers = Array.from(
      { length: offerCount },
      () => offerGeneratorString.generate()
    );

    const csvFileWriter = new TextFileWriter(filepath);
    csvFileWriter.write(offers.join('\n'));
  }
}
