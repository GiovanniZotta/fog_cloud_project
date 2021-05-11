import 'reflect-metadata';
import fastify from 'fastify';
import { ApolloServer } from 'apollo-server-fastify';
import { ApolloGateway } from '@apollo/gateway';
import { config } from './config';
import { logger } from './logger';

// Fastify
const gateway = fastify({ logger: { level: config.logger.level } });

// Apollo Gateway
const apolloGateway = new ApolloGateway({
  serviceList: [{ name: config.services.products.name, url: config.services.products.url }],
});

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
  await gateway.listen(config.node.port);
}

bootstrap()
  .then(() => {
    logger.info('Bootstrap successful');
  })
  .catch((error) => {
    logger.info(`Bootstrap error: ${error}`);
    process.exit(1);
  });
