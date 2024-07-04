import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async index() {
    return await this.moviesService.findAll();
  }

  @Post()
  async store(@Body() body: CreateMovieDto) {
    return await this.moviesService.store(body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.moviesService.findOneOrFail({where: {id}})
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateMovieDto) {
    return await this.moviesService.update(id, body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    await this.moviesService.destroy(id)
  }
}
