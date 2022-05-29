import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import { resolvers as scalarResolvers, typeDefs as scalarTypeDefs } from 'graphql-scalars';
import { resolvers, typeDefs } from '../graphql';
import uploadRoutes from './university/routes/uploadRoutes';

dotenv.config();

const app: Application = express();

export async function start () {
  const apolloServer = new ApolloServer({
    typeDefs: [
      ...scalarTypeDefs,
      typeDefs
    ],
    resolvers: [
      scalarResolvers,
      resolvers
    ],
    csrfPrevention: true,
    introspection: true,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.use(express.json());

  app.use(cors());

  app.use(uploadRoutes);

  app.use(function (error: any, req: Request, res: Response, next: NextFunction) {
    res.status(error.status || 500).send({ message: error.message, type: error.type });
  });

  app.listen(`${process.env.PORT}`, async () => {
    console.log(`Server started on port http://localhost:${process.env.PORT}/graphql`);
  });
}

export default app;
