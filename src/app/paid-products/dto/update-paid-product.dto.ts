import { PartialType } from '@nestjs/swagger';
import { CreatePaidProductDto } from './create-paid-product.dto';

export class UpdatePaidProductDto extends PartialType(CreatePaidProductDto) {}
