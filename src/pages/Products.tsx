import { toast } from 'react-toastify';
import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Product from 'components/Product';
import { AppContext } from 'context/AppContextProvider';

const Products = () => {
  // Context goes here
  const { products } = useContext(AppContext);

  // Handler goes here
  const handleShowDescription = (index: number) => {
    const productDescription = products[index];

    if (productDescription) {
      toast.info(productDescription.productDescription);
    }
  };

  return (
    <Container fluid>
      <Row>
        {products.length > 0 ? (
          products.map((product, index) => {
            return (
              <Col lg={2} key={`product-${index}`}>
                <Product product={product} index={index} handleClick={handleShowDescription} />
              </Col>
            );
          })
        ) : (
          <p className="text-center">
            <b>No Products</b>
          </p>
        )}
      </Row>
    </Container>
  );
};

export default Products;
