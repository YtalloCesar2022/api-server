import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformerResponseInterceptor } from './core/http/transformer-response-interceptor';
import { ExceptionHttpFilter } from './user/common/filter/exception.http.filter';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHttpFilter
  },
    {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  },
  {
  provide: APP_INTERCEPTOR,
  useClass: TransformerResponseInterceptor
}],
})
export class AppModule { }
