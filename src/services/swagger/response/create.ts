import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDecorator {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    example: new Date().toISOString(),
  })
  timestamp: Date;
}
