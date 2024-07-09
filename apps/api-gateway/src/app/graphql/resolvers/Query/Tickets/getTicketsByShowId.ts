import TicketsService from '../../../../adapters/TicketsService';
import { ResolverContext } from '../../../../graphql/types';
interface Args {
  showId: string;
}

const ticketResolver = async (obj: any, showId: Args) => {
  return await TicketsService.getTicketsByShowId(showId);
};

export default ticketResolver;
