import { Request, Response, NextFunction } from 'express';
import { Order } from '../model/Order';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.findAll();
    console.log('Fetched Orders:', JSON.stringify(orders, null, 2)); // הוספת לוגים
    return res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching orders' });
  }
};

const getOrdersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userId },
    });
    console.log('Fetched Orders by User ID:', JSON.stringify(orders, null, 2)); // הוספת לוגים
    return res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching orders by user ID' });
  }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByPk(req.params.id);
    console.log(order, "order");
    
    if (!order) return res.status(404).json({ error: 'Order not found' });
    console.log('Fetched Order:', JSON.stringify(order, null, 2)); // הוספת לוגים
    return res.status(200).json({
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching order' });
  }
};

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, ticketId, movieIdPage } = req.body; // הוספת movieIdPage
    const resTicket: any = await axios.post(`http://localhost:7002/ticket`, {
      ids: ticketId,
    });

    const { error, message } = resTicket.data;
    if (error) {
      return res.status(400).json({
        error,
        message,
      });
    } else {
      const id = uuidv4();
      const status = 'active';
      const order = await Order.create({
        id,
        userId,
        ticketId,
        status,
        movieIdPage, // הוספת movieIdPage להזמנה
      });
      console.log('Added Order:', JSON.stringify(order, null, 2)); // הוספת לוגים
      return res.status(201).json({
        order,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Error adding order',
    });
  }
};

const removeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    try {
      const resTicket: any = await axios.put(`http://localhost:7002/ticket`, {
        id: order.ticketId,
      });

      const { error, message } = resTicket.data;
      if (error) {
        console.error('Ticket update error:', message);
      }
    } catch (ticketError) {
      console.error('Error updating ticket:', ticketError.message);
    }

    await order.destroy();
    console.log('Removed Order:', JSON.stringify(order, null, 2)); // הוספת לוגים
    return res.status(200).json({
      message: 'Order deleted.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Error removing order',
    });
  }
};

export default {
  getOrders,
  getOrdersByUserId,
  getOrder,
  addOrder,
  removeOrder,
};