import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export function serialize(dto: any) {
  return UseInterceptors(new SearializeInterceptor(dto));
}

export class SearializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // run before request is handle by request handler
    //console.log('run before req is handle ', context);

    return next.handle().pipe(
      map((data: any) => {
        //run before req is sent
        //console.log('run before req is sent', data);
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
