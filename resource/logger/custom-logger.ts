import { ConsoleLogger, Injectable } from "@nestjs/common";

@Injectable()
export class CustomLogger extends ConsoleLogger {
  debug(message: any, ...optionalParams: any[]) {
    super.debug(`🐛 ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(`🚨 ${message}`, ...optionalParams);
  }
}