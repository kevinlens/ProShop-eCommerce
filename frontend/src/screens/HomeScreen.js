import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from '../components/Product'
import products from "../products";

const HomeScreen = () => {
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
