import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios'

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      //destructure the 'res.data' which we got back
      const { data } = await axios.get('/api/products');

      setProducts(data);
    };

    fetchProducts()

  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product, i) => (
          //screen sizes adjustment
          <Col key={i} sm={12} md={6} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
