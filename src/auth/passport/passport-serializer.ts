import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }
  serializeUser(user, done) {
    done(null, user.userId);
  }
  async deserializeUser(userId, done) {
    const user = await this.userService.findOneById(userId);
    done(null, user);
  }
}
