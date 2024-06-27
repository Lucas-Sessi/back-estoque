import { PartialType } from '@nestjs/swagger';
import { CreatePaidProductsDto } from './create-paid-products.dto';

export class UpdatePaidProductsDto extends PartialType(CreatePaidProductsDto) {}
