import {Ticket} from '../types/ticket.js';

export const generateRandomValue = (min:number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomItems = <T>(items: T[]):T[] => {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export const getRandomItem = <T>(items: T[]):T =>
  items[generateRandomValue(0, items.length -1)];

export const tsvStringToTicket = (row: string) => {
  const tokens = row.split('\t');
  const [title, description, createdDate, photos, type, price, categories, name, email, avatarUrl] = tokens;

  return {
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
  } as Ticket
}
