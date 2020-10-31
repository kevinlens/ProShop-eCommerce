import express from 'express';
//gets rid of the '.then()' syntax
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/ProductModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    /*we don't have a 'catch' from try,catch method for errors because all the errors gets passed 
    down to our custom made middlware error handlers*/
    const products = await Product.find({});

    res.json(products);
  })
);

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    /*we don't have a 'catch' from try,catch method for errors because all the errors gets passed 
    down to our custom made middlware error handlers*/
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }

    //
  })
);

export default router;
