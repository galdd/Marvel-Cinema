import OrdersService from '../../../../adapters/OrdersService';
import { ResolverContext } from '../../../types';

interface Args {
  id: string;
}

const removeOrderResolver = async (
  obj: any,
  { id }: Args,
  context: ResolverContext
) => {
  return await OrdersService.removeOrder({ id });
};

export default removeOrderResolver;