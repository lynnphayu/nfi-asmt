import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MongoServerError } from 'mongodb';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error | Record<string, unknown>, host: ArgumentsHost) {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse();
    console.log(exception);
    if (exception instanceof HttpException)
      this.httpAdapterHost.httpAdapter.reply(response, exception.getResponse());
    else if (exception instanceof MongoServerError) {
      this.httpAdapterHost.httpAdapter.reply(response, {});
    }
  }
}
