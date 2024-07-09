import { gql } from 'apollo-server-express';

const schema = gql`
  scalar Date

  type Ticket {
    id: ID!
    showId: String!
    seatId: Int!
    isTaken: Boolean!
    show: Show!
  }

  type Show {
    id: ID!
    dateAndTIme: Date!
    price: Int!
    movieId: String!
    movie: Movie!
    ticketAmount: Int!
    isSoldOut: Boolean
  }

  type Movie {
    id: ID!
    title: String
    desc: String
    img: String
    year: String
    chronologicalOrder: Int
    length: String
    movieIdPage: String
  }

  type Order {
    id: ID!
    userId: String!
    ticketId: String!
    status: String!
    ticket: Ticket!
  }

  type Mutation {
    createOrder(ticketId: String!): Order!
    removeOrder(id: String!): String!
    createMovie(
      title: String
      desc: String
      img: String
      imgTitle: String
      imgSm: String
      trailer: String
      year: String
      chronologicalOrder: Int
      length: String
    ): Movie!
    createShow(
      dateAndTIme: Date!
      price: Int!
      movieId: String!
      ticketAmount: Int!
    ): Show!
    editShow(
      dateAndTIme: Date!
      price: Int!
      movieId: String!
      ticketAmount: Int!
    ): Show!
    editMovie(
      title: String
      desc: String
      img: String
      imgTitle: String
      imgSm: String
      trailer: String
      year: String
      chronologicalOrder: Int
      length: String
    ): Movie!
    removeShow(id: ID!): String!
    removeMovie(id: ID!): String!
  }

  type Query {
    Shows: [Show!]!
    Show(id: ID!): Show
    Tickets(showId: ID!): [Ticket!]!
    Ticket(id: ID!): Ticket
    Movies: [Movie!]!
    Movie(id: ID!): Movie!
    orders: [Order!]!
    order(id: ID!): Order
  }
`;

export default schema;