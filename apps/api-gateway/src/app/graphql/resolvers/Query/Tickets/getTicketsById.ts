import TicketsService from '../../../../adapters/TicketsService';
import { ResolverContext } from '../../../../graphql/types';
interface Args {
  id: string;
}

const ticketResolver = async (obj: any, id: Args) => {
  return await TicketsService.getTicket(id);
};

export default ticketResolver;
