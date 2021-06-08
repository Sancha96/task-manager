import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get, Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { classToClass } from 'class-transformer';

import { PaginationParams } from '../common/pagination/pagination-params';
import { PaginationRo } from '../common/pagination/pagination-ro';
import { Role } from '../common/roles/role.enum';

import { UsersService } from './users.service';

import { Users } from './users.decorator';
import { Auth } from '../auth/auth.decorator';

import { CreateUsersGuard } from './guards/create-users.guard';
import { DeleteUsersGuard } from './guards/delete-users.guard';
import { GetUserGuard } from './guards/get-user.guard';
import { UpdateUsersGuard } from './guards/update-users.guard';

import { UserRoDto } from './dto/user-ro.dto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PersonsService } from '../persons/persons.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly personsService: PersonsService,
  ) {}

  @Post()
  // @Users(CreateUsersGuard)
  // TODO: сделать транзакцию
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const { username, email, password, ...otherFields } = createUserDto;
    const user = await this.usersService.create({ username, email, password });
    await this.personsService.create({
      userUuid: user.uuid,
      ...otherFields,
    });
    return user;
  }

  @Get()
  @Auth(Role.Admin)
  async findAndCount(
    @Query(
      new ValidationPipe({
        transform: true,
      }),
    )
    paginationParams: PaginationParams,
  ): Promise<PaginationRo<UserRoDto>> {
    const [data, count] = await this.usersService.findAndCount(
      paginationParams,
    );

    return { data: classToClass(data), count };
  }

  @Get(':uuid')
  @Users(GetUserGuard)
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Patch(':uuid')
  @Users(UpdateUsersGuard)
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  @Users(DeleteUsersGuard)
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.remove(uuid);
  }
}
