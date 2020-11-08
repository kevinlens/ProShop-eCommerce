//gets rid of the '.then()' syntax
import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';

//

//

//

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  /*we don't have a 'catch' from try,catch method for errors because all the errors gets passed 
    down to our custom made middlware error handlers*/
  const products = await Product.find({});

  res.json(products);
});

//

//

//

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

//

//

//

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  //
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    //you don't need to even use this
    res.status(404);
    /*This is a new way of throwing our own error without having to use the res.status.json({})
      as we also have the custom built error handler for other errors already */
    throw new Error('Product not found');
  }

  //
});

//

//

//

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  //
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
  //
});

//

//

//

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  //
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }

  //
});
export { getProducts, getProductsById, deleteProduct, createProduct,updateProduct };
