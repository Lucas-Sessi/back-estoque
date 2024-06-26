import { HttpStatus, Injectable } from '@nestjs/common';
import { ServicesUtils } from 'src/utils/services/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenerateException } from 'src/utils/exceptions/generateExceptionError';
import { isEmpty } from 'lodash';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockEntity } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    private readonly servicesUtils: ServicesUtils,
    @InjectRepository(StockEntity)
    private readonly StockRepository: Repository<StockEntity>,
  ) {}

  async create(data: CreateStockDto) {
    try {
      const paidCreated = this.StockRepository.create(data);

      return await this.StockRepository.save(paidCreated);
    } catch (error) {
      GenerateException(error);
    }
  }

  async findAll() {
    try {
      const stock = await this.StockRepository.find();

      const conditions = {
        stock: {
          validate: isEmpty(stock),
          message: 'Nenhum registro encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return stock;
    } catch (error) {
      GenerateException(error);
    }
  }

  async findOne(id: number) {
    try {
      const findOneStock = await this.StockRepository.findOne({
        where: { id },
      });

      const conditions = {
        findOneStock: {
          validate: isEmpty(findOneStock),
          message: 'Registro não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return findOneStock;
    } catch (error) {
      GenerateException(error);
    }
  }

  async update(id: number, data: UpdateStockDto) {
    try {
      const findOneStock = await this.StockRepository.findOne({
        where: { id },
      });

      const conditions = {
        findOneStock: {
          validate: isEmpty(findOneStock),
          message: 'Registro não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      const stockUpdated = this.StockRepository.merge(findOneStock, data);

      return await this.StockRepository.save(stockUpdated);
    } catch (error) {
      GenerateException(error);
    }
  }

  async remove(id: number) {
    try {
      const findOneStock = await this.StockRepository.findOne({
        where: { id },
      });

      const conditions = {
        findOneStock: {
          validate: isEmpty(findOneStock),
          message: 'Registro não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      await this.StockRepository.remove(findOneStock);
    } catch (error) {
      GenerateException(error);
    }
  }
}
