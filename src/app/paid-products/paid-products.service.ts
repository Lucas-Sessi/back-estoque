import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ServicesUtils } from 'src/utils/services/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerateException } from 'src/utils/exceptions/generateExceptionError';
import { isEmpty } from 'lodash';
import { UpdatePaidProductsDto } from './dto/update-paid-products.dto';
import { PaidProductsEntity } from './entities/paid-products.entity';
import { CreatePaidProductsDto } from './dto/create-paid-products.dto';
import { ProductsService } from '../products/products.service';
import * as moment from 'moment';

@Injectable()
export class PaidProductsService {
  constructor(
    private readonly servicesUtils: ServicesUtils,
    private readonly productsService: ProductsService,
    @InjectRepository(PaidProductsEntity)
    private readonly PaidProductsRepository: Repository<PaidProductsEntity>,
  ) {}

  private compareDates(dateToCompare: string): boolean {
    const currentDate = moment();
    const DateValid = moment(dateToCompare);

    return currentDate.isAfter(DateValid);
  }

  async create(data: CreatePaidProductsDto) {
    try {
      const paidProductCreated = this.PaidProductsRepository.create(data);

      const product = await this.productsService.findOneByDescription(
        data.nm_produto,
      );

      const conditions = {
        quantityProducts: {
          validate: product.qtd_estoque < data.qtd_paga,
          message: 'Quantidade de produtos insuficientes',
          status: HttpStatus.CONFLICT,
        },
        dateValid: {
          validate: this.compareDates(product.dt_validade),
          message: 'Produto passou da data de validade!',
          status: HttpStatus.CONFLICT,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      const calcForUpdateQtdProduct = product.qtd_estoque - data.qtd_paga;

      await this.productsService.update(product.cd_produto, {
        qtd_estoque: calcForUpdateQtdProduct,
      });

      return await this.PaidProductsRepository.save(paidProductCreated);
    } catch (error) {
      GenerateException(error);
    }
  }

  async findAll() {
    try {
      const paidProducts = await this.PaidProductsRepository.find({
        order: { dt_entrega: 'DESC' },
      });

      const conditions = {
        paidProducts: {
          validate: isEmpty(paidProducts),
          message: 'Nenhum registro encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return paidProducts;
    } catch (error) {
      GenerateException(error);
    }
  }

  async findOne(id: number) {
    try {
      const findPaidProducts = await this.PaidProductsRepository.findOne({
        where: { id },
      });

      const conditions = {
        findPaidProducts: {
          validate: isEmpty(findPaidProducts),
          message: 'Registro não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return findPaidProducts;
    } catch (error) {
      GenerateException(error);
    }
  }

  async remove(id: number) {
    try {
      const findPaidProducts = await this.PaidProductsRepository.findOne({
        where: { id },
      });

      const conditions = {
        findPaidProducts: {
          validate: isEmpty(findPaidProducts),
          message: 'Registro não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      await this.PaidProductsRepository.remove(findPaidProducts);
    } catch (error) {
      GenerateException(error);
    }
  }
}
