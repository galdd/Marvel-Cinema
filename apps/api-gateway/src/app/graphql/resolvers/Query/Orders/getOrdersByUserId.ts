import OrdersService from '../../../../adapters/OrdersService';
import { ResolverContext } from '../../../types';

const getOrdersByUserIdResolver = async (
  obj: any,
  args: any,
  context: ResolverContext
) => {
  if (context.currentUser) {
    const userId = context.currentUser.user.id;
    return await OrdersService.getOrdersByUserId({ userId });
  } else {
    throw new Error('user not valid');
  }
};

export default getOrdersByUserIdResolver;