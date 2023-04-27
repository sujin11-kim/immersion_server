import { ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common";
export declare class RegisterHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
