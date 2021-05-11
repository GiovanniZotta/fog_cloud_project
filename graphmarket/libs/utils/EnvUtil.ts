import path from 'path';
import dotenv from 'dotenv';

/**
 * Environment utility.
 */
export class EnvUtil {
  /**
   * Production environment identifier.
   */
  public static readonly ENV_PRODUCTION: string = 'production';

  /**
   * Development environment identifier.
   */
  public static readonly ENV_DEVELOPMENT: string = 'development';

  /**
   * Test environment identifier.
   */
  public static readonly ENV_TEST: string = 'test';

  /**
   * Return the current environment.
   * If 'NODE_ENV' is not defined return 'production'.
   *
   * @returns Current environment
   */
  public static getCurrentEnv(): string {
    return process.env.NODE_ENV || EnvUtil.ENV_PRODUCTION;
  }

  /**
   * Check if the current environment is production.
   *
   * @returns True if production, false otherwise
   */
  public static isProduction(): boolean {
    return this.getCurrentEnv() === EnvUtil.ENV_PRODUCTION;
  }

  /**
   * Check if the current environment is development.
   *
   * @returns True if development, false otherwise
   */
  public static isDevelopment(): boolean {
    return this.getCurrentEnv() === EnvUtil.ENV_DEVELOPMENT;
  }

  /**
   * Check if the current environment is test.
   *
   * @returns True if test, false otherwise
   */
  public static isTest(): boolean {
    return this.getCurrentEnv() === EnvUtil.ENV_TEST;
  }

  /**
   * Loads environment variables from a file.
   * If no 'filePath' is provided it will try to loads the file based on the current environment:
   * '.env' in development.
   * '.env.prod' in production.
   * '.env.test' in test.
   *
   * @param filePath - File path to load
   */
  public static loadEnvFile(filePath?: string): void {
    let dotEnvFile: string = '.env';

    if (!filePath) {
      switch (EnvUtil.getCurrentEnv()) {
        case EnvUtil.ENV_DEVELOPMENT:
          dotEnvFile = '.env';
          break;
        case EnvUtil.ENV_PRODUCTION:
          dotEnvFile = '.env.prod';
          break;
        case EnvUtil.ENV_TEST:
          dotEnvFile = '.env.test';
          break;
        default:
          // Skip
          return;
      }
    }

    dotenv.config({ path: filePath || path.resolve(process.cwd(), dotEnvFile) });
  }
}
