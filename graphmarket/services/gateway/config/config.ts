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
    services: {
      products: {
        name: 'products',
        url: env.GRAPHQL_SERVICE_PRODUCTS_URL,
      },
      reviews: {
        name: 'reviews',
        url: env.GRAPHQL_SERVICE_REVIEWS_URL,
      },
      inventories: {
        name: 'inventories',
        url: env.GRAPHQL_SERVICE_INVENTORIES_URL,
      },
    },
  },
  logger: {
    level: env.DEBUG ? 'debug' : 'info',
  },
};
