import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  descricao: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  dt_validade: string;

  @ApiProperty()
  @IsInt()
  qtd_estoque: number;
}
