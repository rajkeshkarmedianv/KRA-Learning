/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((result) => {
        
        if (result?.data && result?.meta) {
          return {
            statusCode: response.statusCode,
            message: result.message || 'Success',
            data: result.data,
            meta: result.meta,
          };
        }

        return {
          statusCode: response.statusCode,
          message: result?.message || 'Request successful',
          data: result?.data ?? result,
        };
      }),
    );
  }
}
