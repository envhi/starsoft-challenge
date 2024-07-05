import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { CacheTTL } from '@nestjs/cache-manager';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'Users found successfully' })
  async index() {
    console.log('user index')
    return await this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adds a user' })
  @ApiResponse({ status: 201, description: 'User added successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async store(@Body() body: CreateUserDto) {

    return await this.usersService.store(body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Find a user' })
  @ApiResponse({ status: 200, description: 'User found successfully' })
  @ApiResponse({ status: 400, description: 'Not found' })
  async show(@Param('id') id: string) {
    return await this.usersService.findOneOrFail({ where: { id } })
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Not found' })
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(id, body)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400, description: 'Not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    await this.usersService.destroy(id)
  }
}
