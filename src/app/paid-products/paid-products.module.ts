import { Module } from '@nestjs/common';
import { PaidProductsService } from './paid-products.service';
import { PaidProductsController } from './paid-products.controller';
import { PaidProductEntity } from './entities/paid-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ServicesUtils } from 'src/utils/services/services';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([PaidProductEntity])],
  controllers: [PaidProductsController],
  providers: [PaidProductsService, ServicesUtils],
})
export class PaidProductsModule {}
