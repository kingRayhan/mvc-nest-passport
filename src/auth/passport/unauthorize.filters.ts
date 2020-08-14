// src/common/filters/auth-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface IRequestFlash extends Request {
  flash: any;
}

@Catch(HttpException)
export class PassportFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IRequestFlash>();

    if (exception instanceof UnauthorizedException) {
      request.flash('errorMsg', 'Invalid Credentials');
      response.redirect(request.url);
    } else {
      response.redirect('/error');
    }
  }
}
