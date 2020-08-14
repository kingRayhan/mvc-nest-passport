import {
  Controller,
  Get,
  Render,
  Post,
  Req,
  UseGuards,
  Res,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from './auth/guards/isAuth.guard';
import { LoginGuard } from './auth/guards/login.guard';
import { PassportFilter } from './auth/passport/unauthorize.filters';
import { UnAuthorizeRedirect } from './auth/guards/redirect.filters';

interface AppRequest extends Request {
  user: any;
}
@UseFilters(UnAuthorizeRedirect)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(): any {
    return;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  @Render('auth/me')
  getMe(@Req() req: AppRequest): any {
    return { username: req.user.username, userId: req.user.userId };
  }

  @Get('auth/login')
  @Render('auth/login')
  login(): any {
    return { title: 'Login' };
  }

  @Get('auth/register')
  @Render('auth/register')
  register(): any {
    return { title: 'Register' };
  }

  @UseFilters(PassportFilter)
  @Post('auth/login')
  @UseGuards(LoginGuard)
  dologin(@Res() res: Response): any {
    return res.redirect('/me');
  }

  @Get('auth/logout')
  logout(@Res() res: Response, @Req() req: Request): any {
    req.logout();
    return res.redirect('/');
  }
}
