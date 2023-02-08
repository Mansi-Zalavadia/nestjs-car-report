import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Query,
  Get,
  Delete,
  NotFoundException,
  Session,
  UseGuards,
  Logger,
  // UseInterceptors,
  //UseInterceptors,
  //ClassSerializerInterceptor,
} from '@nestjs/common';
import { updateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { serialize } from '../interceptors/serialize.iterceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthCredentialDto } from './dtos/auth-credential.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiFoundResponse,
  ApiAcceptedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
//import { CurrentUserInterceptor } from './interceptor/current-user.iterceptor';

@ApiTags('User')
@Controller('auth')
@serialize(UserDto)
//@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(
    private userservice: UsersService,
    private authservice: AuthService,
  ) {}

  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @Get('/colors')
  // getColor(@Session() session: any) {
  //   return session.color;
  // }

  // @Get('/whoami')
  // whoamI(@Session() session: any) {
  //   return this.userservice.findOne(session.userId);
  // }

  @Get('/whoami')
  @ApiFoundResponse({ description: 'Current user will return', type: User })
  @ApiForbiddenResponse({ description: 'forbiden' })
  @UseGuards(AuthGuard)
  whoamI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  @ApiCreatedResponse({ description: 'user will signed out', type: User })
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'create user object as response',
  })
  @ApiBadRequestResponse({
    description: 'email in use',
    type: User,
  })
  // async createUser(@Body() body: CreateUserDto, @Session() session: any) {
  //   //this.userservice.create(body.email, body.password);

  //   const user = this.authservice.signup(body.email, body.password);
  //   session.userId = (await user).id;
  //   this.logger.verbose(
  //     `User "${User.name}" are created. Data:${JSON.stringify(CreateUserDto)}`,
  //   );
  //   return user;
  // }
  signup(@Body() authcredentialdto: AuthCredentialDto): Promise<User> {
    return this.authservice.signup(authcredentialdto);
  }

  @ApiCreatedResponse({ description: 'sign in registerded user', type: User })
  @Post('/signin')
  signin(@Body() authcredentialdto: AuthCredentialDto): Promise<any> {
    return this.authservice.signin(authcredentialdto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async user(@Req() req): Promise<any> {
    //return req.user;
    return this.userservice.find(req.user.email);
  }
  //@UseGuards(LocalAuthGuard)
  // @Post('/login')
  // async login(@Req() req, @Body() loginDto: AuthCredentialDto): Promise<any> {
  //   return this.authservice.signin(req.user);
  // }
  // async signin(@Body() body: CreateUserDto, @Session() session: any) {
  //   const user = this.authservice.signin(body.email, body.password);
  //   session.userId = (await user).id;
  //   return user;
  // }
  //@UseInterceptors(new SearializeInterceptor(UserDto))
  //@serialize(UserDto)

  // @UseGuards(JwtAuthGuard)
  // @Post('login')
  // async login(@Req() req) {
  //   return this.authservice.loginWithCredentials(req.user);
  // }

  @ApiOkResponse({ description: 'user will return', type: User })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is runnnig');
    const user = await this.userservice.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found..');
    }
    return user;
  }

  @ApiOkResponse({ description: 'users list will return' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get()
  findAllUser(@Query('email') email: string) {
    return this.userservice.find(email);
  }

  @ApiOkResponse({ description: 'remove user list successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userservice.remove(parseInt(id));
  }

  @ApiOkResponse({ description: 'upadated user list sucessfully' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() Body: updateUserDto) {
    return this.userservice.update(parseInt(id), Body);
  }
}
