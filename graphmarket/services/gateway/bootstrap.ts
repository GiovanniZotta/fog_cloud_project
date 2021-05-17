import 'reflect-metadata';
import fastify from 'fastify';
import { ApolloServer } from 'apollo-server-fastify';
import { ApolloGateway } from '@apollo/gateway';
import { config } from './config';
import { logger } from './logger';

// Fastify
const gateway = fastify({ logger: { level: config.logger.level } });

// Apollo Gateway
const apolloGateway = new ApolloGateway(
  config.graphql.apollo_key
    ? undefined
    : {
        serviceList: [
          {
            name: config.graphql.services.products.name,
            url: config.graphql.services.products.url,
          },
          {
            name: config.graphql.services.reviews.name,
            url: config.graphql.services.reviews.url,
          },
        ],
      },
);

// Apollo Server
const server = new ApolloServer({
  gateway: apolloGateway,
  uploads: false,
  subscriptions: false,
  playground: config.graphql.playground,
  introspection: config.graphql.playground,
});

// Bootstrap
async function bootstrap() {
  await server.start();
  gateway.register(server.createHandler({ path: config.graphql.path }));
  logger.info('Gateway built');

  // Start gateway
  const serviceUrl = await gateway.listen(config.node.port, '0.0.0.0');
  logger.info(`Service running on ${serviceUrl + config.graphql.path}`);
}

bootstrap()
  .then(() => {
    logger.info('Bootstrap successful');
  })
  .catch((error) => {
    logger.info(`Bootstrap error: ${error}`);
    process.exit(1);
  });
