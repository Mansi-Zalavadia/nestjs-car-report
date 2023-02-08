import { Injectable } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
//import { AuthGuard } from 'src/guards/auth.guard';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
