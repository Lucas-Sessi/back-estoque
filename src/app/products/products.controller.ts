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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpExceptionFilter } from 'src/utils/exceptions/httpExceptionFilter';
import { ApiTags } from '@nestjs/swagger';
import {
  createApiDecorator,
  deleteApiDecorator,
  findApiDecorator,
  listApiDecorator,
  updateApiDecorator,
} from 'src/services/swagger/docs';
import { ProductEntity } from './entities/product.entity';

@UseFilters(new HttpExceptionFilter())
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @createApiDecorator(CreateProductDto, ProductEntity)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @listApiDecorator(ProductEntity)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @findApiDecorator(ProductEntity)
  @HttpCode(HttpStatus.OK)
  @Get('find/:cd_produto')
  findOne(@Param('cd_produto', ParseIntPipe) productCode: number) {
    return this.productsService.findOne(productCode);
  }

  @updateApiDecorator(UpdateProductDto, ProductEntity)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':cd_produto')
  update(
    @Param('cd_produto', ParseIntPipe) productCode: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(productCode, updateProductDto);
  }

  @deleteApiDecorator()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':cd_produto')
  remove(@Param('cd_produto', ParseIntPipe) productCode: number) {
    return this.productsService.remove(productCode);
  }
}
