//gets rid of the '.then()' syntax
import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  /*we don't have a 'catch' from try,catch method for errors because all the errors gets passed 
    down to our custom made middlware error handlers*/
  const products = await Product.find({});

  res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductsById = asyncHandler(async (req, res) => {
  /*we don't have a 'catch' from try,catch method for errors because all the errors gets passed 
    down to our custom made middlware error handlers*/
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    //you don't need to even use this
    res.status(404);
    /*This is a new way of throwing our own error without having to use the res.status.json({})
      as we also have the custom built error handler for other errors already */
    throw new Error('Product not found');
  }

  //
});

export { getProducts, getProductsById };
