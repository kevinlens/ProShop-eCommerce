import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import Message from '../components/Message';

import { listProducts } from '../actions/productActions';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = ({ match }) => {
  //the 'keyword' from 'match.params.keyword' is what we set in the app.js for the parameter
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  //allows you to use the 'dispatch' functionality
  const dispatch = useDispatch();

  //grabs product list from global state using 'useSelector'
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    //upon load, dispatch 'listProducts' function
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  //=======================================================================
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product, i) => (
              //screen sizes adjustment
              <Col key={i} sm={12} md={6} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
