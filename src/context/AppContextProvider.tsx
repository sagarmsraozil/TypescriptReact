import React, { useState, createContext, useMemo } from 'react';

import * as TYPES from 'types/type';

export const AppContext = createContext<TYPES.AppContextReturnTypes>({} as TYPES.AppContextReturnTypes);

const AppContextProvider = (props: TYPES.AppContextPropTypes) => {
  // Props descruction
  const { children } = props;

  // State goes here
  const [products, setProducts] = useState<TYPES.ProductType<number>[]>([]);

  // Memo goes here
  const value = useMemo(() => {
    return { products, setProducts };
  }, [products.length]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
