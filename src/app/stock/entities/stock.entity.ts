import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('estoque')
export class StockEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nm_produto: string;

  @ApiProperty()
  @Column({ type: 'int' })
  qtd_paga: number;

  @ApiProperty()
  @CreateDateColumn()
  dt_entrega: Date;

  @ApiProperty()
  @Column()
  nm_usuario: string;
}
