import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

 async register(registerDto: RegisterUserDto) {
  const { name, email, password } = registerDto;

  console.log('Registering user with email:', email);
  const existingUser = await this.userRepository.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new BadRequestException('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = this.userRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  console.log('Saving new user:', user);
  
  return this.userRepository.save(user);
}
async login(loginDto: LoginUserDto) {
  const { email, password } = loginDto;

  const user = await this.userRepository.findOne({
    where: { email },
  });

  if (!user) {
    throw new BadRequestException('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new BadRequestException('Invalid credentials');
  }

  return {
    message: 'Login successful',
    userId: user.id,
    email: user.email,
  };
}


}
