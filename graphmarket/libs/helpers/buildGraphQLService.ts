import fastify from 'fastify';
import { ApolloServer, Config } from 'apollo-server-fastify';
import { RequiredSome } from '@libs/types';

/**
 *  Build a GraphQL service instance.
 *
 * @param config - Service configuration
 * @returns Service instance
 */
export async function buildGraphQLService(
  config: RequiredSome<
    Omit<
      Config,
      'uploads' | 'subscriptions' | 'context' | 'logger' | 'playground' | 'introspection'
    >,
    'schema'
  > & {
    path?: string;
    playground?: boolean;
  },
) {
  // Fastify
  const app = fastify();

  // Apollo Server
  const server = new ApolloServer({
    ...config,
    schema: config.schema,
    uploads: false,
    subscriptions: false,
    playground: config.playground,
    introspection: config.playground,
  });

  await server.start();
  app.register(server.createHandler({ path: config.path }));

  return app;
}
