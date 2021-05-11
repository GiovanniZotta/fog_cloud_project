import express, { Express } from 'express';
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import { RequiredSome } from '@libs/types';

/**
 *  Build a GraphQL service instance.
 *
 * @param config - Service configuration
 * @returns Service instance
 */
export function buildGraphQLService(
  config: RequiredSome<
    Omit<ApolloServerExpressConfig, 'uploads' | 'subscriptions' | 'context'> & { path?: string },
    'schema'
  >,
): Express {
  // Express
  const app = express();
  app.enable('trust proxy');

  // Apollo Server
  const server = new ApolloServer({
    ...config,
    schema: config.schema,
    uploads: false,
    subscriptions: false,
    context: ({ req }) => ({
      user:
        req.headers.user && !Array.isArray(req.headers.user)
          ? JSON.parse(req.headers.user)
          : undefined,
    }),
  });
  server.applyMiddleware({ app, path: config.path });

  return app;
}
