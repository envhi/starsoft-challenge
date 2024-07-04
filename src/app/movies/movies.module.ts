import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesEntity } from './movies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MoviesEntity])],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService]
})
export class MoviesModule {}
