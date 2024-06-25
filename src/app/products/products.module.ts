import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ProductEntity } from './entities/product.entity';
import { ServicesUtils } from 'src/utils/services/services';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, ServicesUtils],
})
export class ProductsModule {}
