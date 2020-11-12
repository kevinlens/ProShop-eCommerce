import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

//links software to db
//this also selects the name of the database we target and its collections
connectDB();

const app = express();

//allows json data in body to be accepted
app.use(express.json());

//===========================================================

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//'__dirname' means 'point to the current directory'
//__dirname is not avaiable in esModules(newest NodeJs version), only in commonJs, so here we are mimicking it instead
const __dirname = path.resolve();

//we change it from 'development' to 'production' manually by hand once we are finished with the project
if (process.env.NODE_ENV === 'production') {
  //take us to the frontend 'build' folder
  //make the frontend 'build' folder static(by using express)
  //NOTE: the build folder is automatically created upon launch in Heroku
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  //'*' means: any routes that is not our /api/ routes, will be pointing to the 'index.html'
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  //when in production
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

//-------------------------------

//WHEN USING MULTER FOR FILE/IMAGES UPLOADS

//take us to the frontend 'uploads' folder
//make the frontend 'uploads' folder static(by using express)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//===========================================================

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
