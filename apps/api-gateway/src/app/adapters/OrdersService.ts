import 'dotenv/config';
import got from 'got';

const ORDERS_SERVICE_URI = process.env.ORDERS_SERVICE_URI;

export interface Order {
  id: string;
  userId: string;
  ticketId: string;
  movieIdPage: string; // הוספת השדה החדש
}

export default class OrdersService {
  static async getOrdersByUserId({
    userId,
  }: {
    userId: string;
  }): Promise<Order[] | null> {
    try {
      const response = await got
        .get(`${ORDERS_SERVICE_URI}/order/${userId}`)
        .json<{ orders: Order[] }>();
      const { orders } = response;
      if (!orders) return null;
      return orders;
    } catch (error) {
      console.error('Error fetching orders by userId:', error);
      return null;
    }
  }

  static async getOrder({ id }: { id: string }): Promise<Order | null> {
    try {
      const response = await got
        .get(`${ORDERS_SERVICE_URI}/order/id/${id}`)
        .json<{ order: Order }>();
      const { order } = response;
      console.log('order:', order);
      if (!order) return null;
      return order;
    } catch (error) {
      console.error('Error fetching order by id:', error);
      return null;
    }
  }

  static async createOrder({
    userId,
    ticketId,
    movieIdPage, // הוספת השדה החדש
  }: {
    userId: string;
    ticketId: string;
    movieIdPage: string; // הוספת השדה החדש
  }) {
    try {
      const body: any = await got
        .post(`${ORDERS_SERVICE_URI}/order`, {
          json: { userId, ticketId, movieIdPage },
        })
        .json();
      if (body.order) {
        return body.order;
      }
      if (body.error) {
        throw new Error(body.message);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }

  static async removeOrder({ id }: { id: string }) {
    try {
      const body: any = await got
        .delete(`${ORDERS_SERVICE_URI}/order/${id}`)
        .json();
      if (body.error) {
        throw new Error(body.message);
      }
      return body.message;
    } catch (error) {
      console.error('Error removing order:', error);
    }
  }
}