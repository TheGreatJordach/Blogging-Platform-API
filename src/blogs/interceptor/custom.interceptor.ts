import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ClassConstructor, plainToInstance } from "class-transformer";

export function Serializer<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new CustomInterceptor(dto));
}

export class CustomInterceptor<T> implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}
