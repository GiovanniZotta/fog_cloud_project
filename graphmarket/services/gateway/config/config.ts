import { env } from './env';

export const config = {
  name: 'gateway',
  debug: env.DEBUG,
  node: {
    env: env.NODE_ENV,
    port: env.PORT,
  },
  graphql: {
    path: env.GRAPHQL_PATH,
    playground: env.GRAPHQL_PLAYGROUND,
    apollo_key: env.APOLLO_KEY,
  },
  services: {
    products: {
      name: 'products',
      url: env.SERVICE_PRODUCTS_URL,
    },
  },
  logger: {
    level: env.DEBUG ? 'debug' : 'info',
  },
};
