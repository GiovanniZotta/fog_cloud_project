import 'reflect-metadata';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { buildGraphQLService } from '@libs/helpers';
import { entitiesList } from '@libs/entities';
import { config } from './config';
import { logger } from './logger';
// Bootstrap
async function bootstrap() {
  // Database
  useContainer(Container);
  initializeTransactionalContext();
  await createConnection({
    type: 'postgres',
    url: config.database.url,
    ssl: config.database.ssl,
    synchronize: config.database.synchronize,
    logging: config.database.logging,
    entities: entitiesList,
  });
  logger.info('Database connected');

  // Build GraphQL service
  const service = await buildGraphQLService({
    schema: (await import('./graphql')).schema,
    path: config.graphql.path,
    loggerLevel: config.logger.level,
    playground: config.graphql.playground,
  });
  logger.info('Service built');

  // Start service
  await service.listen(config.node.port);
}

bootstrap()
  .then(() => {
    logger.info('Bootstrap successful');
  })
  .catch((error) => {
    logger.info(`Bootstrap error: ${error}`);
    process.exit(1);
  });
