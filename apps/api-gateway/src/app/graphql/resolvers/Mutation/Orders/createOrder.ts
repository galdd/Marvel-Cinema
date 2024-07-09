import 'dotenv/config';
import got from 'got';
import OrdersService from '../../../../adapters/OrdersService';
import { ResolverContext } from '../../../../graphql/types';

interface Args {
  ticketId: string;
  movieIdPage: string;
}

const createOrderResolver = async (
  obj: any,
  { ticketId, movieIdPage }: Args,
  context: ResolverContext
) => {
  if (context.currentUser) {
    const userId = context.currentUser.user.id;
    console.log('t', userId);

    return await OrdersService.createOrder({
      userId,
      ticketId,
      movieIdPage,
    });
  } else {
    throw new Error('user not valid');
  }
};

export default createOrderResolver;