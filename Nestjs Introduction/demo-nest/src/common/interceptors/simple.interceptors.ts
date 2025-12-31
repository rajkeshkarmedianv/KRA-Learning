import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class SimpleInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //  BEFORE controller
    console.log("Before controller");

    return next.handle().pipe(
      tap(() => {
        // AFTER controller
        console.log("After controller");
      }),
    );
  }
}
