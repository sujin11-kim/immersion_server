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
    const error = exception.getResponse();

    const curr = new Date();
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 18 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);

    response.status(status).json({
      success: true,
      code: status,
      data: error,
      kr_curr,
    });
  }
}
