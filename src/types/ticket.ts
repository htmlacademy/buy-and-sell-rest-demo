import { Author } from './author.js';
import { Category } from './category.js';

type Buy = 'buy';
type Sell = 'sell';

export type Ticket = {
  id: string;
  title: string;
  description: string;
  createdDate: Date;
  photos: string[];
  type: Buy | Sell;
  price: number;
  categories: Category[];
  author: Author;
}
