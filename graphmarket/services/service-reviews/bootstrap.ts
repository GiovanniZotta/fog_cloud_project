import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { buildGraphQLService } from '@libs/helpers';
import { entitiesList } from '@libs/entities';
import { schema } from './graphql';
import { config } from './config';
import { logger } from './logger';

// Bootstrap
async function bootstrap() {
  // Build GraphQL service
  const service = await buildGraphQLService({
    schema,
    path: config.graphql.path,
    loggerLevel: config.logger.level,
    playground: config.graphql.playground,
  });
  logger.info('Service built');

  // Database
  await createConnection({
    type: 'postgres',
    url: config.database.url,
    ssl: config.database.ssl,
    synchronize: config.database.synchronize,
    logging: config.database.logging,
    entities: entitiesList,
  });
  logger.info('Database connected');

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
