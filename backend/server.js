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

//-----
app.get('/', (req, res) => {
  res.send('API is running...');
});
//===========================================================

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//WHEN USING MULTER FOR FILE/IMAGES UPLOADS

//'__dirname' means 'point to the current directory'
//__dirname is not avaiable in esModules(newest NodeJs version), only in commonJs, so here we are mimicking it instead
const __dirname = path.resolve();

//take us to the frontend 'uploads' folder
//make the frontend 'uploads' foleder static(by using express)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//===========================================================

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
