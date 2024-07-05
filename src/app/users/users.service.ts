import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
  ) { }

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email']
    });
  }

  async findOneOrFail(options: FindOneOptions<UsersEntity>) {
    try {

      return await this.usersRepository.findOneOrFail(options)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async store(data: CreateUserDto) {
    try {
      const userExists = await this.usersRepository.findOneBy({ email: data.email })
      if (userExists) {
        throw new Error('E-mail already registered');
      } else {
        const user = this.usersRepository.create(data)
        await this.cacheManager.reset();
        return await this.usersRepository.save(user)
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }

  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneOrFail({
      where: { id }
    })

    this.usersRepository.merge(user, data)

    return await this.usersRepository.save(user)
  }

  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({
      where: { id }
    })
    this.usersRepository.softDelete({ id })
  }
}
