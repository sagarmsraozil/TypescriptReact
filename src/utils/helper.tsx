import * as TYPES from 'types/type';

/**
 * To verify whether the given product exists in product basket or not.
 * @param products
 * @param newProduct
 * @returns
 */
export const verifyProduct = (
  products: TYPES.ProductType<number>[],
  newProduct: TYPES.ProductType<number>
): boolean => {
  const productsContainer = [...products];
  const newProductInstance = newProduct;
  const productNameAndBrandContainer = productsContainer.map((product) => {
    const nameAndBrand = `${product.productName}-${product.productBrand}`.toLowerCase().trim();

    return nameAndBrand;
  });
  const newProductAndBrand = `${newProductInstance.productName}-${newProductInstance.productBrand}`
    .toLowerCase()
    .trim();

  return !productNameAndBrandContainer.includes(newProductAndBrand);
};

/**
 * To find the total stocks on hold and its overall price.
 * @param products
 * @returns
 */
export const getStocksAndAmounts = (products: TYPES.ProductType<number>[]): TYPES.StockAndAmountType => {
  const productBasket = [...products];

  const totalStocks = productBasket.length
    ? productBasket.map((product) => product.inStock).reduce((acc, i) => acc + i)
    : 0;
  const totalAmount = productBasket.length
    ? productBasket
        .map((product) => {
          const price = product.productPrice;
          const prictAfterDiscount = product.onSale ? price - Math.floor((product.discount / 100) * price) : price;

          return prictAfterDiscount * product.inStock;
        })
        .reduce((acc, i) => acc + i)
    : 0;

  return { totalStocks, totalAmount };
};

export const getUserToken = (): string | null => {
  return localStorage.getItem('token') ?? null;
};
