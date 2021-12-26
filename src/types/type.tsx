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
  handleClick: (index: number) => void;
};

export type AxiosType = {
  method: string;
  endPoint: string;
  data: object;
  queryParams: object;
  requiresAuth?: boolean;
  additionalHeaders: object;
};
