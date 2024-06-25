import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from 'src/utils/interceptors/logger.interceptor';
import { ResponseInterceptor } from 'src/utils/response/response.interceptor';
import { ProductsModule } from './products/products.module';
import { PaidProductsModule } from './paid-products/paid-products.module';

@Module({
  imports: [DatabaseModule, UserModule, ProductsModule, PaidProductsModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
