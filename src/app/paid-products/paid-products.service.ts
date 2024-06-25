import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaidProductDto } from './dto/create-paid-product.dto';
import { UpdatePaidProductDto } from './dto/update-paid-product.dto';
import { ServicesUtils } from 'src/utils/services/services';
import { InjectRepository } from '@nestjs/typeorm';
import { PaidProductEntity } from './entities/paid-product.entity';
import { Repository } from 'typeorm';
import { GenerateException } from 'src/utils/exceptions/generateExceptionError';
import { isEmpty } from 'lodash';

@Injectable()
export class PaidProductsService {
  constructor(
    private readonly servicesUtils: ServicesUtils,
    @InjectRepository(PaidProductEntity)
    private readonly paidProductsRepository: Repository<PaidProductEntity>,
  ) {}

  async create(data: CreatePaidProductDto) {
    try {
      const paidCreated = this.paidProductsRepository.create(data);

      return await this.paidProductsRepository.save(paidCreated);
    } catch (error) {
      GenerateException(error);
    }
  }

  async findAll() {
    try {
      const paidsProducts = await this.paidProductsRepository.find();

      const conditions = {
        paids: {
          validate: isEmpty(paidsProducts),
          message: 'Nenhum registro encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return paidsProducts;
    } catch (error) {
      GenerateException(error);
    }
  }

  async findOne(id: number) {
    try {
      const paidProduct = await this.paidProductsRepository.findOne({
        where: { id },
      });

      const conditions = {
        paid: {
          validate: isEmpty(paidProduct),
          message: 'Registro não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return paidProduct;
    } catch (error) {
      GenerateException(error);
    }
  }

  async update(id: number, data: UpdatePaidProductDto) {
    try {
      const paidProduct = await this.paidProductsRepository.findOne({
        where: { id },
      });

      const conditions = {
        paid: {
          validate: isEmpty(paidProduct),
          message: 'Registro não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      const paidProductUpdated = this.paidProductsRepository.merge(
        paidProduct,
        data,
      );

      return await this.paidProductsRepository.save(paidProductUpdated);
    } catch (error) {
      GenerateException(error);
    }
  }

  async remove(id: number) {
    try {
      const paidProduct = await this.paidProductsRepository.findOne({
        where: { id },
      });

      const conditions = {
        paid: {
          validate: isEmpty(paidProduct),
          message: 'Registro não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      await this.paidProductsRepository.remove(paidProduct);
    } catch (error) {
      GenerateException(error);
    }
  }
}
