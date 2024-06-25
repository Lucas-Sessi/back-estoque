import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ServicesUtils } from 'src/utils/services/services';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GenerateException } from 'src/utils/exceptions/generateExceptionError';
import { isEmpty } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    private readonly servicesUtils: ServicesUtils,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userExisty = await this.userRepository.findOne({
        where: { nm_usuario: createUserDto.nm_usuario },
      });

      const conditions = {
        userExisty: {
          validate: !isEmpty(userExisty),
          message: 'Usuário já cadastrado',
          status: HttpStatus.CONFLICT,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      const userCreated = this.userRepository.create(createUserDto);

      return await this.userRepository.save(userCreated);
    } catch (error) {
      GenerateException(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();

      const conditions = {
        users: {
          validate: isEmpty(users),
          message: 'Nenhum usuário encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return users;
    } catch (error) {
      GenerateException(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      const conditions = {
        user: {
          validate: isEmpty(user),
          message: 'Usuário não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return user;
    } catch (error) {
      GenerateException(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      const conditions = {
        user: {
          validate: isEmpty(user),
          message: 'Usuário não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      const userUpdate = this.userRepository.merge(user, updateUserDto);

      return await this.userRepository.save(userUpdate);
    } catch (error) {
      GenerateException(error);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      const conditions = {
        user: {
          validate: isEmpty(user),
          message: 'Usuário não encontrado',
          status: HttpStatus.NOT_FOUND,
        },
      };

      this.servicesUtils.validateObjectConditions(conditions);

      return await this.userRepository.delete(id);
    } catch (error) {
      GenerateException(error);
    }
  }
}
