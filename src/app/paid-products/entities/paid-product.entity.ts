import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('produtos_pagos')
export class PaidProductEntity {
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
