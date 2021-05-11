import 'reflect-metadata';
import { promisify } from 'util';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway } from '@apollo/gateway';
import { config } from './config';
import { logger } from './logger';

// Express
const app = express();
app.enable('trust proxy');

// Apollo Gateway
const gateway = new ApolloGateway({
  serviceList: [{ name: config.services.products.name, url: config.services.products.url }],
});

// Apollo Server
const server = new ApolloServer({
  gateway,
  uploads: false,
  subscriptions: false,
  playground: true,
});
server.applyMiddleware({ app, path: config.graphql.path });

// Bootstrap
async function bootstrap() {
  // FIXME
  // @ts-ignore
  await promisify(app.listen)(config.node.port);
  logger.info(`Server listening on port ${config.node.port}`);
}

bootstrap()
  .then(() => {
    logger.info('Bootstrap success');
  })
  .catch((error) => {
    logger.info(`Bootstrap error: ${error}`);
    process.exit(1);
  });
