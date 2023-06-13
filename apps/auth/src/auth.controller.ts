import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterNewUserDto } from '@app/shared/dtos/register-user.dto';
import { LoginUserDto } from '@app/shared/dtos/login-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerNewUserDto: RegisterNewUserDto,
    @Res() res: Response,
  ) {
    return await this.authService.register(registerNewUserDto, res);
  }

  @Post('login')
  async login(
    @Body() credentials: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(credentials, response);
    response.send(result);
  }
}
