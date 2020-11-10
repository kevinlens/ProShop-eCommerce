import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  //the 'keyword' from 'match.params.keyword' is what we set in the app.js for the parameter
  const keyword = match.params.keyword;

  //allows you to use the 'dispatch' functionality
  const dispatch = useDispatch();

  //grabs product list from global state using 'useSelector'
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    //upon load, dispatch 'listProducts' function
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  //=======================================================================
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product, i) => (
            //screen sizes adjustment
            <Col key={i} sm={12} md={6} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
