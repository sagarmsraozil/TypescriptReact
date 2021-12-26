import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

import * as TYPES from 'types/type';
import * as CONSTANTS from 'constants/consts';

const Product = (props: TYPES.ProductPropTypes) => {
  // Props goes here
  const { product, index, handleClick } = props;

  // State goes here
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  useEffect(() => {
    // Variable goes here
    let backgroundColorValue = '';
    const colorBox = CONSTANTS.cardColors;
    if (index >= 0) {
      const indexValue = index % colorBox.length;
      const indexPoint = Math.floor(index / colorBox.length);

      const colorContainer: string[] = [...colorBox];
      indexPoint % 2 === 1 && colorContainer.reverse();

      backgroundColorValue = indexValue === 0 ? colorContainer[0] : colorContainer[indexValue];

      setBackgroundColor(backgroundColorValue);
    }
  }, []);

  return (
    <Card
      className="product-card"
      style={{
        background: backgroundColor,
      }}
      onClick={() => {
        handleClick(index);
      }}
    >
      <div className="product-image">
        <img src="" alt={product.productName} className="d-block" />
      </div>
      <Card.Body>
        <div className="product-description">
          <h4 className="text-center">
            {product.productName} {backgroundColor}
          </h4>
          {!product.onSale ? (
            <p>
              <b>Price:</b> <span>Rs {product.productPrice}</span>
            </p>
          ) : (
            <p>
              <b>Price:</b>
              <span>Rs {product.productPrice - Math.floor((product.discount / 100) * product.productPrice)}</span>
              <br />
              <span style={{ textDecoration: 'line-through' }}> Rs {product.productPrice}</span>
              <br />
              <span>{product.discount}% off</span>
            </p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
