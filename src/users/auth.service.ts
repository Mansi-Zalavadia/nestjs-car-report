import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto'; // pacakage import from node standard library
import { promisify } from 'util';
import { AuthCredentialDto } from './dtos/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './jwt-payload.interface';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  private logger = new Logger('AuthServices');
  constructor(
    private userservice: UsersService,
    private jwtservice: JwtService,
  ) {}

  // async signup(email: string, password: string) {
  //   //see the email is in use
  //   const user = await this.userservice.find(email);
  //   if (user.length) {
  //     throw new BadRequestException('email in use');
  //   }

  //   //hash the user password
  //   //Generate salt
  //   const salt = randomBytes(8).toString('hex');

  //   //hash the salt and passowrd together
  //   const hash = (await scrypt(password, salt, 32)) as Buffer;

  //   //join hashed result and salt together
  //   const result = salt + '.' + hash.toString('hex');

  //   //create new user with hash pwd and save it
  //   const user1 = await this.userservice.create(email, result);

  //   //return the user
  //   return user1;
  // }

  async signup(authcredentialdto: AuthCredentialDto): Promise<User> {
    const user = await this.userservice.find(authcredentialdto.email);
    if (user.length) {
      throw new BadRequestException('email in use');
    }
    return this.userservice.create(authcredentialdto);
  }

  // async signin(email: string, passowrd: string) {
  //   const [user] = await this.userservice.find(email);
  //   if (!user) {
  //     this.logger.error(`user not found Filters: ${JSON.stringify(user)}`);
  //     throw new NotFoundException('user not found');
  //   }

  //   const [salt, storedhash] = user.password.split('.');
  //   const hash = (await scrypt(passowrd, salt, 32)) as Buffer;
  //   if (storedhash === hash.toString('hex')) {
  //     return user;
  //   } else {
  //     throw new BadRequestException('bad password');
  //   }
  // }

  async signin(authcredentialdto: AuthCredentialDto): Promise<any> {
    const { email, password } = authcredentialdto;
    const [user] = await this.userservice.find(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // return user;
      const payload: JwtPayload = { email };
      return await this.jwtservice.sign({ payload }); // return acess token
    } else {
      throw new UnauthorizedException('user not found');
    }
  }

  // async validateUserCreds(authcredentialdto: AuthCredentialDto): Promise<User> {
  //   const { email, password } = authcredentialdto;
  //   const [user] = await this.userservice.find(email);
  //   // console.log(user.password);
  //   if (!user) throw new BadRequestException();
  //   // if (!(await bcrypt.compare(password, user.password)))
  //   //   throw new UnauthorizedException();
  //   // if (!user) return null;
  //   // if (!user) throw new BadRequestException();

  //   const passwordValid = await bcrypt.compare(password, user.password);

  // if (!passwordValid) {
  //   throw new UnauthorizedException();
  // }
  //   if (user && passwordValid) {
  //     return user;
  //   }
  //   return null;

  //   // return user;
  // }

  // async loginWithCredentials(user: any) {
  //   const payload = { username: user.username, sub: user.userId };

  //   return {
  //     access_token: this.jwtservice.sign(payload),
  //   };
  // }
}
