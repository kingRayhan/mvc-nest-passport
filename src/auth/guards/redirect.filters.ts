// src/common/filters/auth-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface IRequestFlash extends Request {
  flash: any;
}

@Catch(HttpException)
export class UnAuthorizeRedirect implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IRequestFlash>();

    if (exception instanceof UnauthorizedException) {
      request.flash('errorMsg', 'Login to access this page');
      response.redirect('/auth/login');
    }
  }
}
