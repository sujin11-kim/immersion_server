import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as
      | string
      | Record<string, any>;

    let message = "";
    let code = status;
    let result = {};

    if (typeof errorResponse === "object") {
      if (errorResponse.statusCode) code = errorResponse.statusCode;
      if (errorResponse.message) message = errorResponse.message;
      if (errorResponse.result) result = errorResponse.result;
    }

    response.status(status).json({
      isSuccess: false,
      code,
      message,
      result,
    });
  }
}
