import { Logger } from '@nestjs/common';

export class CustomLoggerService extends Logger {
  log(message: any, ...optionalParams: any[]) {
    super.log(message);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(message);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message);
  }
}
