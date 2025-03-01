import myData from './assets/combined.json';

export const data: Items[] = myData;

export type Items = {
  book: string;
  name: string;
  itemType: string;
  priceAverage: number;
  priceMerchant: number;
  priceSane: number;
  quantity?: number;
};
