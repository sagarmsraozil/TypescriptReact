import { AxiosRequestHeaders, Method } from 'axios';
import { ReactNode } from 'react';

export type ProductType<T> = {
  productName: string;
  productBrand: string;
  productImage: object;
  productDescription: string;
  productPrice: number;
  discount: T;
  inStock: number;
  onSale: T;
};

export type AppContextPropTypes = {
  children: ReactNode;
};

export type AppContextReturnTypes = {
  products: ProductType<number>[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType<number>[]>>;
};

export type FormType = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type StockAndAmountType = {
  totalStocks: number;
  totalAmount: number;
};

export type ProductPropTypes = {
  product: ProductType<number>;
  index: number;
  handleClick: (index: number) => void; // eslint-disable-line
};

// eslint-disable-next-line
export type AxiosType<T = any, D = any> = {
  method?: Method;
  endPoint?: string;
  data?: T;
  queryParams?: D;
  requiresAuth?: boolean;
  additionalHeaders?: AxiosRequestHeaders;
};
