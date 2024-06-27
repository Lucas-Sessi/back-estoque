import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'src/database/database.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from 'src/utils/interceptors/logger.interceptor';
import { ResponseInterceptor } from 'src/utils/response/response.interceptor';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PaidProductsModule } from './paid-products/paid-products.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ProductsModule,
    PaidProductsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
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
