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
import { PaidProductsService } from './paid-products.service';
import { CreatePaidProductDto } from './dto/create-paid-product.dto';
import { UpdatePaidProductDto } from './dto/update-paid-product.dto';
import { HttpExceptionFilter } from 'src/utils/exceptions/httpExceptionFilter';
import { ApiTags } from '@nestjs/swagger';
import {
  createApiDecorator,
  deleteApiDecorator,
  findApiDecorator,
  listApiDecorator,
  updateApiDecorator,
} from 'src/services/swagger/docs';
import { PaidProductEntity } from './entities/paid-product.entity';

@UseFilters(new HttpExceptionFilter())
@ApiTags('paid-products')
@Controller('paid-products')
export class PaidProductsController {
  constructor(private readonly paidProductsService: PaidProductsService) {}

  @createApiDecorator(CreatePaidProductDto, PaidProductEntity)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createPaidProductDto: CreatePaidProductDto) {
    return this.paidProductsService.create(createPaidProductDto);
  }

  @listApiDecorator(PaidProductEntity)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.paidProductsService.findAll();
  }

  @findApiDecorator(PaidProductEntity)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paidProductsService.findOne(id);
  }

  @updateApiDecorator(UpdatePaidProductDto, PaidProductEntity)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaidProductDto: UpdatePaidProductDto,
  ) {
    return this.paidProductsService.update(id, updatePaidProductDto);
  }

  @deleteApiDecorator()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paidProductsService.remove(id);
  }
}
