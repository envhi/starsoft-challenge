import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('DB_TYPE', 'postgres'),
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 5432)),
        username: configService.get('DB_USERNAME', 'starsoft') ,
        password: configService.get('(DB_PASSWORD', '1234'),
        database: configService.get('DB_DATABASE', 'starsoft_movies'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      } as TypeOrmModuleOptions)
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
