import TicketsService from '../../../../adapters/TicketsService';

interface Args {
  id: string;
  isTaken: boolean;
}

const signupResolver = async (obj: any, { id, isTaken }: Args) => {
  return await TicketsService.setTicket({
    id,
    isTaken,
  });
};

export default signupResolver;
