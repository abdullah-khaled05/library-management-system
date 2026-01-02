import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
  
@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
      secret: 'secretKey123', // dev only
      signOptions: { expiresIn: '1h' },
    }),],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
