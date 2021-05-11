import { bool, cleanEnv, port, str, url } from 'envalid';
import { EnvUtil } from '@libs/utils';

EnvUtil.loadEnvFile();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: 'production',
    devDefault: 'development',
    choices: ['production', 'development', 'test'],
  }),
  PORT: port({ devDefault: 8081 }),
  GRAPHQL_PATH: str({ default: '/graphql' }),
  DATABASE_URL: url(),
  DATABASE_SSL: bool({ default: true, devDefault: false }),
  DATABASE_SYNCHRONIZE: bool({ default: false, devDefault: true }),
  DATABASE_LOGGING: bool({ default: false }),
});
