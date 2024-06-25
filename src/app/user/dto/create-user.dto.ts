import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  nm_completo: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  nm_usuario: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  senha: string;
}
