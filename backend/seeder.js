import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/UserModel.js';
import Product from './models/ProductModel.js';
import Order from './models/OrderModel.js';
import connectDB from './config/db.js';

dotenv.config();

//links software to db
//this also selects the name of the database we target and its collections
connectDB();

//Script we use to import data
//Think of this as a reset button for all the data, or to quickly import them
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

    //add the admin 'user' to the products file
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    //import in all the sample products with the admin users into Product DB
    await Product.insertMany(sampleProducts);

    console.log('Data Imported! ✅');
    //no returns but rather exit()
    process.exit();
  } catch (error) {
    console.error(`${error}❗️`);
    //passing in a 1 means exit with failure
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //completely wipe out database
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed! ✅');
    process.exit();
  } catch (error) {
    console.error(`${error}❗️`);
    //passing in a 1 means exit with failure
    process.exit(1);
  }
};

//if the command line has "node backend/seeder" but with a '-d' then destroy data else
//we made a shortcut for that command in the root package.json 
//don't use this unless you know what you're doing bc it will remove all your data
if (process.argv[2] === '-d') {
  // destroyData();
} else {
  // importData();
}
