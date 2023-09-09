import { ConsoleLogger } from "@nestjs/common";
export declare class CustomLogger extends ConsoleLogger {
    debug(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
}
