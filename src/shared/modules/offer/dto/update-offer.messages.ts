export const CreateUpdateOfferMessage = {
  title: {
    minLength: 'minimum title length is 10',
    maxLength: 'maximum title length is 100'
  },
  description: {
    minLength: 'minimum description length is 20',
    maxLength: 'maximum description length is 1024',
  },
  postDate: {
    invalidFormat: 'postData must be a valid ISO date',
  },
  image: {
    invalidFormat: 'image is required',
    maxLength: 'too long for field image. Maximum length is 256'
  },
  type: {
    invalidFormat: 'type must be "Buy" or "Sell"',
  },
  price: {
    invalidFormat: 'price must be an integer',
    min: 'minimum price is 100',
    max: 'maximum price is 20000'
  },
  categories: {
    invalidFormat: 'categories field must be an array of valid id',
  }
} as const;
