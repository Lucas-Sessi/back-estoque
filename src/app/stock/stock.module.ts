import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { StockEntity } from './entities/stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ServicesUtils } from 'src/utils/services/services';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([StockEntity])],
  controllers: [StockController],
  providers: [StockService, ServicesUtils],
})
export class StockModule {}
