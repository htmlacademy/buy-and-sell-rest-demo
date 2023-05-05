import { OfferType } from '../../types/offer-type.enum.js';
import { Offer } from '../../types/offer.type.js';

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
    postDate: new Date(createdDate),
    image,
    type: OfferType[type as 'Buy' | 'Sell'],
    categories: categories.split(';')
      .map((name) => ({name})),
    price: Number.parseInt(price, 10),
    user,
  } as Offer;
}

