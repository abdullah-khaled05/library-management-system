import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.usersService.register(registerDto);
  }

@Post('login')
login(@Body() loginDto: LoginUserDto) {
  return this.usersService.login(loginDto);
}
}