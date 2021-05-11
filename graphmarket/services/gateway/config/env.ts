import { bool, cleanEnv, port, str, url } from 'envalid';
import { EnvUtil } from '@libs/utils';

EnvUtil.loadEnvFile();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: 'production',
    devDefault: 'development',
    choices: ['production', 'development', 'test'],
  }),
  PORT: port({ devDefault: 8080 }),
  DEBUG: bool({ default: false, devDefault: true }),
  GRAPHQL_PATH: str({ default: '/graphql' }),
  SERVICE_PRODUCTS_URL: url({ devDefault: 'https://localhost:8081/graphql' }),
});
