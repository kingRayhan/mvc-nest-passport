// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AdminLoginStrategy } from './passport/local-admin-login.strategy';
import { SessionSerializer } from './passport/passport-serializer';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, AdminLoginStrategy, SessionSerializer],
})
export class AuthModule {}
