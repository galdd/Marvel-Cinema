import TicketsService from '../../../../adapters/TicketsService';

interface Args {
  ticketAmount: number;
  dateAndTIme: Date;
  price: number;
  movieId: string;
}

const createShowResolver = async (
  obj: any,
  { ticketAmount, dateAndTIme, price,  movieId }: Args,
) => {
  return await TicketsService.createShow({
    ticketAmount,
    dateAndTIme,
    price,
    movieId,
  });
};

export default createShowResolver;
