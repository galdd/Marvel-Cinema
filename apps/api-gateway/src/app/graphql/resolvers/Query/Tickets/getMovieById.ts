import TicketsService from '../../../../adapters/TicketsService';
import { ResolverContext } from '../../../../graphql/types';

interface Args {
  id: string;
}

const movieResolver = async (obj: any, id: Args) => {
  return await TicketsService.getMovie(id);
};

export default movieResolver;
