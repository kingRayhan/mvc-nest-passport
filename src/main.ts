import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';

import * as session from 'express-session';
import flash = require('connect-flash');
import * as passport from 'passport';

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.setViewEngine('hbs');

  app.use(
    session({
      secret: 'nest cats',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use(function(req, res, next) {
    res.locals.isAutenticated = req.isAuthenticated();
    res.locals.user = req.user;
    res.locals.errorMsg = req.flash('errorMsg');
    next();
  });

  await app.listen(4545);
}
bootstrap();
