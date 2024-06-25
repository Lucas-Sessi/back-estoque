import { Request } from 'express';
import { UserEntity } from 'src/app/user/entities/user.entity';

export class AuthRequest extends Request {
  user: UserEntity;
}
