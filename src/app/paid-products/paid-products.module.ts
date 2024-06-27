import { Module } from '@nestjs/common';
import { PaidProductsService } from './paid-products.service';
import { PaidProductsController } from './paid-products.controller';
import { PaidProductsEntity } from './entities/paid-products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ServicesUtils } from 'src/utils/services/services';
import { ProductsService } from '../products/products.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([PaidProductsEntity]), ProductsModule],
  controllers: [PaidProductsController],
  providers: [PaidProductsService, ServicesUtils],
})
export class PaidProductsModule {}
