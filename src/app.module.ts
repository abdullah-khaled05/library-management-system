import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { Book } from './books/book.entity';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // makes env available everywhere
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432') ,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // auto-create tables (good for dev, not production)
    }),
    UsersModule,
    BooksModule,
  ],
})
export class AppModule {}
