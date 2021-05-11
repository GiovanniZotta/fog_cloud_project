import shell from 'shelljs';
import chalk from 'chalk';

export function echoSuccess(text: string): void {
  shell.echo(`${chalk.bgGreen.white.bold('[SUCCESS]')}: ${text}`);
}

export function echoInfo(text: string): void {
  shell.echo(`${chalk.bgCyan.white.bold('[INFO]')}: ${text}`);
}

export function echoWarning(text: string): void {
  shell.echo(`${chalk.bgYellow.white.bold('[WARNING]')}: ${text}`);
}

export function echoError(text: string): void {
  shell.echo(`${chalk.bgRed.white.bold('[ERROR]')}: ${text}`);
  shell.exit(1);
}
