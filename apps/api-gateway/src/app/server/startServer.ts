import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import resolvers from '../graphql/resolvers';
import schema from '../graphql';
import formatGraphQLErrors from './formatGraphQLErrors';
import injectSession from './middleware/injectSession';
import { ResolverContext } from '../graphql/types';
import 'dotenv/config';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;

const startServer = async () => {
  const apolloServer = new ApolloServer({
    context: ({ req, res }: { req: Request; res: Response }): ResolverContext => ({
      req,
      res,
      currentUser: res.locals.currentUser,
    }),
    formatError: formatGraphQLErrors,
    resolvers,
    typeDefs: schema,
  });

  const app = express();
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: (origin, cb) => cb(null, true),
    })
  );

  app.use(injectSession);

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ['http://localhost:4200', 'https://studio.apollographql.com'],
    },
    path: '/graphql',
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.info(`API gateway listening on ${PORT}`);
  });
};

export default startServer;