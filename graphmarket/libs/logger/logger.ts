import pino from 'pino';
import { RequiredSome } from '@libs/types';
import { ObjectUtil } from '@libs/utils';
import packageJson from '../../package.json';

let config: pino.LoggerOptions = {};

export function configure(options: RequiredSome<pino.LoggerOptions, 'name' | 'level'>) {
  config = { ...config, ...options, name: `${packageJson.name}-${options.name}` };
  return config;
}

export const logger = pino(
  ObjectUtil.isEmpty(config) ? configure({ name: '?', level: 'info' }) : config,
);
