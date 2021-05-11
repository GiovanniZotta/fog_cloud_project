import { env } from './env';

export const config = {
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
};
