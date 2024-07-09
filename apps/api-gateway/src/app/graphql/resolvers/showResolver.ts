import TicketsService from '../../adapters/TicketsService';
import { ResolverContext } from '../../graphql/types';
import 'dotenv/config';
import got from 'got';

const TICKETS_SERVICE_URI = process.env.TICKETS_SERVICE_URI;

interface Args {
  id: string;
}

export interface Show {
  id: string;
  dateAndTIme: Date;
  price: number;
  movieId: string;
  ticketAmount: number;
}

const showResolver = {
  movie: async (args: Show) => {
    let id: any = args.movieId;
    console.log('showResolver movie', id);

    const body: any = await got
      .get(`${TICKETS_SERVICE_URI}/movie/${id}`)
      .json();

    if (!body) return null;

    const movie = body.movie;
    console.log('Movie data', movie);
    
    // Ensure all fields are of the correct type
    return {
      ...movie,
      chronologicalOrder: movie.chronologicalOrder || null,
      length: movie.length ? parseInt(movie.length) : null,
      year: movie.year ? parseInt(movie.year) : null,
    };
  },
  isSoldOut: async (args: Args) => {
    const { id } = args;
    console.log('a', id);

    const tickets: any = await TicketsService.getTicketsByShowId({
      showId: id,
    });

    let isSoldOut = true;
    if (tickets) {
      tickets.forEach((ticket: any) => {
        if (!ticket.isTaken) {
          isSoldOut = false;
        }
      });
    }

    return isSoldOut;
  },
};

export default showResolver;