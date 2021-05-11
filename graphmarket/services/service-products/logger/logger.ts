import pino from 'pino';
import { config } from '../config';
import packageJson from '../../../package.json';

export const logger = pino({
  name: `${packageJson.name}-${config.name}`,
  level: config.logger.level,
});
