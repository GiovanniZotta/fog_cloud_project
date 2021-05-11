import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { buildGraphQLService } from '@libs/helpers';
import { logger, configure as configLogger } from '@libs/logger';
import { schema } from './graphql';
import { config } from './config';

// Build GraphQL service
const app = buildGraphQLService({
  schema,
  path: config.graphql.path,
});

// Bootstrap
async function bootstrap() {
  // Logger
  configLogger({ name: config.name, level: config.logger.level });

  // Database
  await createConnection({
    type: 'postgres',
    url: config.database.url,
    ssl: config.database.ssl,
    synchronize: config.database.synchronize,
    logging: config.database.logging,
  });
  logger.info('Database connected');

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
