import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

//Script we use to import data

const importData = async () => {
  try {
    //completely wipe out database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    //import in created users from external file
    const createdUsers = await User.insertMany(users);

    //pick out the admin user
    //the 'id' is by default created when it reaches the DB
    const adminUser = createdUsers[0]._id;

    //add the admin 'user' to the product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    //import in all the sample products with the admin users into Product DB
    await Product.instertMany(sampleProducts)

    console.log('Data Imported! 🥑')
  } catch (error) {
    console.error(`${error}❗️`)
  }
};
