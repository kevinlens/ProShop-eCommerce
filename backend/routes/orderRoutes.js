import express from 'express';
const router = express.Router();
import { addOrderItems} from '../controllers/orderController.js';
import { protect } from '../middlware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);

export default router;
