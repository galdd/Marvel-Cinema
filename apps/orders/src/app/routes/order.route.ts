import express from 'express';
import orderController from '../controllers/order.controller';
const router = express.Router();

router.post('/', orderController.addOrder);
router.get('/', orderController.getOrders);
router.get('/id/:id', orderController.getOrder);
router.get('/:userId', orderController.getOrdersByUserId);
router.delete('/:id', orderController.removeOrder);

export = router;