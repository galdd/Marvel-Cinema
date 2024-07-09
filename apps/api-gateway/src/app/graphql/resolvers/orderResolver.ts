import 'dotenv/config';
import got from 'got';

const TICKETS_SERVICE_URI = process.env.TICKETS_SERVICE_URI;

interface Args {
  id: string;
}

export interface Order {
  id: string;
  userId: string;
  ticketId: string;
  status: string;
  movieIdPage: string;
}

const orderResolver = {
  ticket: async (args: Order) => {
    const id: any = args.ticketId;
    console.log('orderResolver ticket', id);

    try {
      const body: any = await got
        .get(`${TICKETS_SERVICE_URI}/ticket/${id}`)
        .json();

      if (!body) return null;

      console.log('Ticket data', body);
      return body.ticket;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      return null;
    }
  },
};

export default orderResolver;