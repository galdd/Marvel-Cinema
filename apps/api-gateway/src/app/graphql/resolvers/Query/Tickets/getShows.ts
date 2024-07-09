import TicketsService from '../../../../adapters/TicketsService';
import { ResolverContext } from '../../../../graphql/types';

const ticketResolver = async (obj: any) => {
  return await TicketsService.getShows();
};

export default ticketResolver;
