import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';
import React, { ChangeEvent, useState, useContext, useEffect, FormEvent, useRef } from 'react';

import * as TYPES from 'types/type';
import * as helper from 'utils/helper';
import Product from 'components/Product';
import { AppContext } from 'context/AppContextProvider';

const Home = () => {
  // Context goes here
  const { products, setProducts } = useContext(AppContext);

  // State goes here
  const [productDetail, setProductDetail] = useState<TYPES.ProductType<number>>({
    productName: '',
    productBrand: '',
    productDescription: '',
    productImage: {},
    productPrice: 0,
    discount: 20,
    inStock: 25,
    onSale: 0,
  });
  const [count, setCount] = useState<number>(0);
  const [stockAndAmount, setStockAndAmount] = useState<TYPES.StockAndAmountType>({
    totalStocks: 0,
    totalAmount: 0,
  });

  // Effect goes here
  useEffect(() => {
    const getStocksAndAmounts: TYPES.StockAndAmountType = helper.getStocksAndAmounts(products);

    setStockAndAmount(getStocksAndAmounts);
  }, [products.length]);

  // Ref goes here
  const imageRef = useRef<HTMLInputElement | null>(null);

  // Handler goes here
  const changeHandler = (e: ChangeEvent<TYPES.FormType>): void => {
    const { name, value } = e.target;

    setProductDetail({
      ...productDetail,
      [name]: value,
    });
  };

  const imageHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, files } = e.target;

    setProductDetail({
      ...productDetail,
      [name]: files ? files[0] : null,
    });
  };

  const addProduct = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const fd = new FormData();

    fd.append('productName', productDetail.productName);
    fd.append('productBrand', productDetail.productBrand);
    fd.append('productDescription', productDetail.productDescription);
    // fd.append('productImage', productDetail.productImage);

    const newProducts: TYPES.ProductType<number>[] = [...products];
    const productInstance: boolean = helper.verifyProduct(newProducts, productDetail);

    if (productInstance) {
      newProducts.push(productDetail);

      reset();
      setProducts([...newProducts]);
      setCount(count + 1);
      toast.success('Added');
    } else {
      toast.error('Same product with similar brand already exists.');
    }
  };

  const reset = (): void => {
    if (imageRef.current) {
      imageRef.current.value = '';
    }

    setProductDetail({
      ...productDetail,
      productName: '',
      productBrand: '',
      productDescription: '',
      productImage: {},
      productPrice: 0,
      discount: 20,
      inStock: 25,
      onSale: 0,
    });
  };

  const handlerRemoveProduct = (index: number): void => {
    const newProducts: TYPES.ProductType<number>[] = [...products];
    newProducts.splice(index, 1);

    setProducts([...newProducts]);
  };

  return (
    <Container>
      <div className="wrapper">
        <Row>
          <Col lg={12}>
            <p className="text-center p-3">
              <strong>Stocks:</strong> <mark>{stockAndAmount.totalStocks}</mark>&nbsp;
              <strong>Amount:</strong> <mark>Rs {stockAndAmount.totalAmount}</mark>
            </p>
          </Col>
          <Col lg={4} className="d-none d-md-block"></Col>
          <Col lg={4}>
            <div className="form-wrapper">
              <form method="post" onSubmit={addProduct}>
                <div className="form-group">
                  <label> Product Name </label>
                  <input
                    type="text"
                    className="form-control"
                    name="productName"
                    value={productDetail.productName}
                    placeholder="Product Name"
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label> Brand </label>
                  <input
                    type="text"
                    className="form-control"
                    name="productBrand"
                    value={productDetail.productBrand}
                    placeholder="Product Brand"
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label> Product Image </label>
                  <input
                    ref={imageRef}
                    type="file"
                    className="form-control"
                    name="productImage"
                    onChange={(e) => {
                      imageHandler(e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label> Price </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    name="productPrice"
                    value={productDetail.productPrice}
                    placeholder="Product Price"
                    onChange={(e) => {
                      e.target.value = parseInt(e.target.value).toString();
                      changeHandler(e);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>On Sale</label>
                  <select
                    className="form-select"
                    name="onSale"
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                  >
                    <option value={0} selected={productDetail.onSale === 0}>
                      No
                    </option>
                    <option value={1} selected={productDetail.onSale === 1}>
                      Yes
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="productDescription"
                    value={productDetail.productDescription}
                    onChange={(e) => {
                      changeHandler(e);
                    }}
                    rows={3}
                    style={{ resize: 'none' }}
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary btn-md w-50 mt-4" name="button" type="submit">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </Col>
          <Col lg={12} className="mt-5">
            {products.length > 0 ? (
              <Row>
                {products.map((product, index) => {
                  return (
                    <Col lg={2} key={`product-${index}`}>
                      <Product product={product} index={index} handleClick={handlerRemoveProduct} />
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <p className="text-center" style={{ color: 'black' }}>
                <b>There are no products</b>
              </p>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Home;
