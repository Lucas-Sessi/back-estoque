import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from 'src/utils/exceptions/httpExceptionFilter';
import { ApiTags } from '@nestjs/swagger';
import {
  createApiDecorator,
  deleteApiDecorator,
  findApiDecorator,
  listApiDecorator,
  updateApiDecorator,
} from 'src/services/swagger/docs';
import { UserEntity } from './entities/user.entity';

@UseFilters(new HttpExceptionFilter())
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @createApiDecorator(CreateUserDto, UserEntity)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @listApiDecorator(UserEntity)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @findApiDecorator(UserEntity)
  @HttpCode(HttpStatus.OK)
  @Get('find/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @updateApiDecorator(UpdateUserDto, UserEntity)
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @deleteApiDecorator()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
