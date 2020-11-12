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
  //total to be displayed on a page
  const pageSize = 10;
  //search the URL query for current page number
  const page = Number(req.query.pageNumber) || 1;

  //a way to get ANY query after the '?' in our URL
  const keyword = req.query.keyword
    ? {
        name: {
          //means grab anything like 'iph', it would still grab 'iphone'
          $regex: req.query.keyword,
          //means case insensitive
          $options: 'i',
        },
      }
    : {};

  //COLLECT DATA ON TOTAL AMOUNT
  // similar to 'find' but counting all the products received
  const count = await Product.countDocuments({ ...keyword });

  /*we don't have a 'catch' from try,catch method for errors because all the errors gets passed 
    down to our custom made middlware error handlers*/
  //'find' and gives you back all of the documents that match that key search
  //COLLECT DATA AFTER FILTERS
  const products = await Product.find({ ...keyword })
    //limit the amount to be sent to the frontend
    .limit(pageSize)
    //a way to decide how much page(with products) you should skip based on current page
    .skip(pageSize * (page - 1));

  //products: products we get back after filters
  //page: current page and what product that page should be receiving
  //pages: e.g 6 pages total with 10 products on each one
  //Math.ceil() is to round up to the largest integer
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
});
//

//

//

// @desc Create new review
// @route PUT /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  //
  const { rating, comment } = req.body;

  //identify current product and see if it exist in database
  const product = await Product.findById(req.params.id);

  if (product) {
    //identify to see if logged in user already left a review
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }
    //if not reviewed then do these things
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    //update the number of reviews field to show to the frontend
    product.numReviews = product.reviews.length;

    /*set the product.rating to the newly calculated total rating average after the new 
    review has been added into a new array */
    //loop through all of the invidual review and add them up(accumulate) and divide by total
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }

  //
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  //
  //Get top products
  //get products in rating in ascending order (highest to lowest) with a limit of 3
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
  //
});
export {
  getProducts,
  getProductsById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
