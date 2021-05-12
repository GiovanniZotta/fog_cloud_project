import { env } from './env';

export const config = {
  name: 'reviews',
  debug: env.DEBUG,
  node: {
    env: env.NODE_ENV,
    port: env.PORT,
  },
  graphql: {
    path: env.GRAPHQL_PATH,
    playground: env.DEBUG,
  },
  database: {
    url: env.DATABASE_URL,
    ssl: env.DATABASE_SSL,
    synchronize: env.DATABASE_SYNCHRONIZE,
    logging: env.DEBUG,
  },
  logger: {
    level: env.DEBUG ? 'debug' : 'info',
  },
};
