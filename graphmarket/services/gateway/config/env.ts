import { bool, cleanEnv, port, str, url } from 'envalid';
import { EnvUtil } from '@libs/utils';

EnvUtil.loadEnvFile();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: 'production',
    devDefault: 'development',
    choices: ['production', 'development', 'test'],
  }),
  PORT: port({ default: 80, devDefault: 8080 }),
  DEBUG: bool({ default: false, devDefault: true }),
  GRAPHQL_PATH: str({ default: '/graphql' }),
  SERVICE_PRODUCTS_URL: url({ devDefault: 'http://localhost:8081/graphql' }),
});
