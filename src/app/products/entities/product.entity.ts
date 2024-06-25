import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('produtos')
export class ProductEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  cd_produto: number;

  @ApiProperty()
  @Column()
  descricao: string;

  @ApiProperty()
  @CreateDateColumn()
  dt_entrada: Date;

  @ApiProperty()
  @Column({ type: 'date', nullable: false })
  dt_validade: string;

  @ApiProperty()
  @Column({ type: 'int' })
  qtd_estoque: number;
}
