import { Offer, OfferType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    createdDate,
    image,
    type,
    price,
    categories,
    firstname,
    lastname,
    email,
    avatarPath
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    email,
    firstname,
    lastname,
    avatarPath
  };

  return {
    title,
    description,
    image,
    user,
    postDate: new Date(createdDate),
    type: OfferType[type as 'Buy' | 'Sell'],
    price: Number.parseInt(price, 10),
    categories: categories.split(';')
      .map((name) => ({name})),
  };
}
