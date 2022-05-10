import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import { resolvers, typeDefs } from '../graphql';
import mongooseConfig from './config/mongoose.config';

dotenv.config();

const app: Application = express();
mongooseConfig(`${process.env.MONGO_URI}`);

async function start () {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.use(function (error: any, req: Request, res: Response, next: NextFunction) {
    res.status(error.status || 500).send({ message: error.message, type: error.type });
  });

  app.listen(process.env.PORT, async () => {
    console.log(`Server started on port http://localhost:${process.env.PORT}/graphql`);
  });
}

start();
