import OrdersService from '../../../../adapters/OrdersService';
import { ResolverContext } from '../../../types';

interface Args {
  id: string;
}

const getOrderResolver = async (obj: any, { id }: Args) => {
  return await OrdersService.getOrder({ id });
};

export default getOrderResolver;