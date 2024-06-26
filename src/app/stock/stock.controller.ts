import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { HttpExceptionFilter } from 'src/utils/exceptions/httpExceptionFilter';
import { ApiTags } from '@nestjs/swagger';
import {
  createApiDecorator,
  deleteApiDecorator,
  findApiDecorator,
  listApiDecorator,
  updateApiDecorator,
} from 'src/services/swagger/docs';
import { StockEntity } from './entities/stock.entity';

@UseFilters(new HttpExceptionFilter())
@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @createApiDecorator(CreateStockDto, StockEntity)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @listApiDecorator(StockEntity)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @findApiDecorator(StockEntity)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.findOne(id);
  }

  @updateApiDecorator(UpdateStockDto, StockEntity)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.stockService.update(id, updateStockDto);
  }

  @deleteApiDecorator()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.remove(id);
  }
}
