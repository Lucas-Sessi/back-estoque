import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ServicesUtils } from 'src/utils/services/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { GenerateException } from 'src/utils/exceptions/generateExceptionError';
import { isEmpty } from 'lodash';

@Injectable()
export class ProductsService {
  constructor(
    private readonly servicesUtils: ServicesUtils,
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const productExisty = await this.productsRepository.findOne({
        where: { descricao: createProductDto.descricao },
      });

      const conditions = {
        productExisty: {
          validate: !isEmpty(productExisty),
          message: 'Produto já cadastrado',
          status: HttpStatus.CONFLICT,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      const userCreated = this.productsRepository.create(createProductDto);

      return await this.productsRepository.save(userCreated);
    } catch (error) {
      GenerateException(error);
    }
  }

  async findAll() {
    try {
      const products = await this.productsRepository.find({
        order: { descricao: 'ASC' },
      });

      const conditions = {
        products: {
          validate: isEmpty(products),
          message: 'Nenhum produto encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return products;
    } catch (error) {
      GenerateException(error);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productsRepository.findOne({
        where: { cd_produto: id },
      });

      const conditions = {
        product: {
          validate: isEmpty(product),
          message: 'Produto não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return product;
    } catch (error) {
      GenerateException(error);
    }
  }

  async findOneByDescription(description: string) {
    try {
      const product = await this.productsRepository.findOne({
        where: { descricao: description },
      });

      const conditions = {
        product: {
          validate: isEmpty(product),
          message: 'Produto não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return product;
    } catch (error) {
      GenerateException(error);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productsRepository.findOne({
        where: { cd_produto: id },
      });

      const conditions = {
        product: {
          validate: isEmpty(product),
          message: 'Produto não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      const updateProduct = this.productsRepository.merge(
        product,
        updateProductDto,
      );

      return await this.productsRepository.save(updateProduct);
    } catch (error) {
      GenerateException(error);
    }
  }

  async remove(id: number) {
    try {
      const product = await this.productsRepository.findOne({
        where: { cd_produto: id },
      });

      const conditions = {
        product: {
          validate: isEmpty(product),
          message: 'Produto não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      await this.productsRepository.remove(product);
    } catch (error) {
      GenerateException(error);
    }
  }
}
