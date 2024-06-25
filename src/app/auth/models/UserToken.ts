import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/app/user/entities/user.entity';

export class UserToken {
  @ApiProperty()
  access_token: string;
}
