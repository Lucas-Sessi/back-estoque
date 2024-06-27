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
import { UpdatePaidProductsDto } from './dto/update-paid-products.dto';
import { HttpExceptionFilter } from 'src/utils/exceptions/httpExceptionFilter';
import { ApiTags } from '@nestjs/swagger';
import {
  createApiDecorator,
  deleteApiDecorator,
  findApiDecorator,
  listApiDecorator,
  updateApiDecorator,
} from 'src/services/swagger/docs';
import { PaidProductsEntity } from './entities/paid-products.entity';
import { CreatePaidProductsDto } from './dto/create-paid-products.dto';

@UseFilters(new HttpExceptionFilter())
@ApiTags('paid-products')
@Controller('paid-products')
export class PaidProductsController {
  constructor(private readonly paidProductsService: PaidProductsService) {}

  @createApiDecorator(CreatePaidProductsDto, PaidProductsEntity)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createPaidProductsDto: CreatePaidProductsDto) {
    return this.paidProductsService.create(createPaidProductsDto);
  }

  @listApiDecorator(PaidProductsEntity)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.paidProductsService.findAll();
  }

  @findApiDecorator(PaidProductsEntity)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paidProductsService.findOne(id);
  }

  @updateApiDecorator(UpdatePaidProductsDto, PaidProductsEntity)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaidProductsDto: UpdatePaidProductsDto,
  ) {
    return this.paidProductsService.update(id, updatePaidProductsDto);
  }

  @deleteApiDecorator()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paidProductsService.remove(id);
  }
}
