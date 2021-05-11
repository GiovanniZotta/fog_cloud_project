import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { buildGraphQLService } from '@libs/helpers';
import { schema } from './graphql';
import { config } from './config';

// Build GraphQL service
const app = buildGraphQLService({
  schema,
  path: config.graphql.path,
});

// Bootstrap
async function bootstrap() {
  await createConnection({
    type: 'postgres',
    url: config.database.url,
    ssl: config.database.ssl,
    synchronize: config.database.synchronize,
    logging: config.database.logging,
  });

  // FIXME
  // @ts-ignore
  await promisify(app.listen)(config.node.port);
}

bootstrap()
  .then(() => {
    // TODO
  })
  .catch(() => {
    // TODO
    process.exit(1);
  });
