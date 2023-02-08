import { CanActivate, ExecutionContext } from '@nestjs/common';
import { json } from 'stream/consumers';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    //console.log('line no:7', JSON.stringify(request));
    return request.session.userId;
  }
}
