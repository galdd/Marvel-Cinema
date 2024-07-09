import * as Mutation from './Mutation';
import * as Query from './Query';
import Order from './orderResolver';
import Show from './showResolver';
import Ticket from './ticketResolver';

const resolvers = { Mutation, Query, Order, Show, Ticket };


export default resolvers;
