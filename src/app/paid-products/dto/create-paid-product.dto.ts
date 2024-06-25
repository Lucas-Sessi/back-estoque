import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaidProductDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  nm_produto: string;

  @ApiProperty()
  @IsInt()
  qtd_paga: number;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  nm_usuario: string;
}
