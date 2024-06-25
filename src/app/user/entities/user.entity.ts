import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuario')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nm_completo: string;

  @ApiProperty()
  @Column({ unique: true })
  nm_usuario: string;

  @ApiProperty()
  @Column()
  senha: string;

  @ApiProperty()
  @CreateDateColumn()
  dt_criacao: Date;

  @ApiProperty()
  @CreateDateColumn()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dt_atualizacao: Date;

  constructor(partial?: Partial<UserEntity>) {
    this.nm_completo = partial?.nm_completo;
    this.nm_usuario = partial?.nm_usuario;
    this.senha = partial?.senha;
  }
}
