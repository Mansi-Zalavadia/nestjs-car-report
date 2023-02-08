import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common/decorators';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from './users.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private userservice: UsersService) {
    super({
      secretOrKey: 'topsecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;

    const [user] = await this.userservice.find(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
