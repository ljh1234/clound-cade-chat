
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ResponseCode } from './responseCode';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): import('rxjs').Observable<any> | Promise<import('rxjs').Observable<any>> {
    return next.handle().pipe(
      map(content => {
        return {
          data: content.data || {},
          code: content.code || ResponseCode.OK,
          msg: content.msg || null,
        };
      }),
    );
  }
}