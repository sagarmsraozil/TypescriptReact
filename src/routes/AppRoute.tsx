import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Products from 'pages/Products';
import * as APP_ROUTES from 'constants/routes';
import AppContextProvider from 'context/AppContextProvider';

const AppRoute = () => {
  return (
    <AppContextProvider>
      <Routes>
        <Route path={APP_ROUTES.HOME} element={<Home />} />
        <Route path={APP_ROUTES.PRODUCTS} element={<Products />} />
      </Routes>
    </AppContextProvider>
  );
};

export default AppRoute;
