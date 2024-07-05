import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexMovieSwagger } from './swagger/index-movie.swagger';
import { CreateMovieSwagger } from './swagger/create-movie.swagger';
import { ShowMovieSwagger } from './swagger/show-movie.swagger';
import { UpdateMovieSwagger } from './swagger/update-movie.swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Movies')
@Controller('api/v1/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Get()
  @ApiOperation({ summary: 'List all movies' })
  @ApiResponse({
    status: 200,
    description: 'Movies found successfully',
    type: IndexMovieSwagger,
    isArray: true
  })
  async index() {
    console.log('movie index')
    return await this.moviesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adds a movie' })
  @ApiResponse({ status: 201, description: 'Movie added successfully' })
  @ApiResponse({ status: 400, description: 'Bad request', type: CreateMovieSwagger, })
  async store(@Body() body: CreateMovieDto) {
    return await this.moviesService.store(body)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a movie' })
  @ApiResponse({ status: 200, description: 'Movie found successfully', type: ShowMovieSwagger, })
  @ApiResponse({ status: 400, description: 'Not found' })
  async show(@Param('id') id: string) {
    return await this.moviesService.findOneOrFail({ where: { id } })
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a movie' })
  @ApiResponse({ status: 201, description: 'Movie updated successfully', type: UpdateMovieSwagger, })
  @ApiResponse({ status: 400, description: 'Not found' })
  async update(@Param('id') id: string, @Body() body: UpdateMovieDto) {
    return await this.moviesService.update(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400, description: 'Not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    await this.moviesService.destroy(id)
  }
}
