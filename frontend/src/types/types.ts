export type RequestOptions = {
  token?: string;
  [key: string]: any;
};

export type Product = {
  id: number;
  title: string;
  owner: string;
  address: any;
  thumbnail: string;
  price: number;
  reviews: any[];
};
