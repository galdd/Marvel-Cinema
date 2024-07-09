import TicketsService from '../../../../adapters/TicketsService';
import { ResolverContext } from '../../../../graphql/types';

const movieResolver = async (obj: any) => {
  return await TicketsService.getMovies();
};

export default movieResolver;
