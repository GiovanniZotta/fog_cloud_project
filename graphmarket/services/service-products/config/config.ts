import { env } from './env';

export const config = {
  node: {
    env: env.NODE_ENV,
    port: env.PORT,
  },
  graphql: {
    path: env.GRAPHQL_PATH,
  },
  database: {
    url: env.DATABASE_URL,
    ssl: env.DATABASE_SSL,
    synchronize: env.DATABASE_SYNCHRONIZE,
    logging: env.DATABASE_LOGGING,
  },
};
