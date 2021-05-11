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
