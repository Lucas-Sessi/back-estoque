import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { createApiDecoratorPublic } from 'src/services/swagger/docs/create';
import { listApiDecoratorPublic } from 'src/services/swagger/docs/list';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public-decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { LoginRequestBody } from './models/LoginRequestBody';
import { UserToken } from './models/UserToken';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @createApiDecoratorPublic(LoginRequestBody, UserToken)
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @listApiDecoratorPublic(ApiOkResponse)
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @Get('verify-token')
  verifyToken(@Headers('authorization') token: string) {
    return this.authService.verifyToken(token);
  }
}
