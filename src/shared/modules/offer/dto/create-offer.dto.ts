import { OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public image: string;
  public type: OfferType;
  public price: number;
  public categories: string[];
  public userId: string;
}
