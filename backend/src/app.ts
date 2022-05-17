import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import { resolvers, typeDefs } from '../graphql';

dotenv.config();

const app: Application = express();

export async function start () {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    introspection: true,
    // context: ({ req }: { req: Request }) => {
    //   const token = req.headers.authorization || '';
    //   // console.log(token);
    //   const validate = tokenService.validateToken(token);
    //   if (!validate) return false;
    //   return true;
    // }
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.use(function (error: any, req: Request, res: Response, next: NextFunction) {
    res.status(error.status || 500).send({ message: error.message, type: error.type });
  });

  app.listen(`${process.env.PORT}`, async () => {
    console.log(`Server started on port http://localhost:${process.env.PORT}/graphql`);
  });
}

export default app;
