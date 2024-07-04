import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { MoviesEntity } from './movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesEntity)
    private readonly moviesRepository: Repository<MoviesEntity>,
  ) { }

  async findAll() {
    return await this.moviesRepository.find({
      select: ['id', 'title', 'releaseYear', 'director']
    });
  }

  async findOneOrFail(options: FindOneOptions<MoviesEntity>) {
    try {

      return await this.moviesRepository.findOneOrFail(options)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async store(data: CreateMovieDto) {
    try {
      const movieExists = await this.moviesRepository.findOneBy({ title: data.title })
      if (movieExists) {
        throw new Error('Movie title already registered');
      } else {
        const movie = this.moviesRepository.create(data)
        return await this.moviesRepository.save(movie)
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }

  }

  async update(id: string, data: UpdateMovieDto) {
    const movie = await this.findOneOrFail({
      where: { id }
    })

    this.moviesRepository.merge(movie, data)

    return await this.moviesRepository.save(movie)
  }

  async destroy(id: string) {
    await this.moviesRepository.findOneOrFail({
      where: { id }
    })
    this.moviesRepository.softDelete({ id })
  }
}


