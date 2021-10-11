import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateuserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update.userDTO';
import { Serialize } from 'src/interceptors/serialize.interceptor.ts';
import { UserDto } from './dtos/user.dto';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  signUpUser(@Body() body: CreateuserDTO) {
    const { email, password } = body;
    this.usersService.create(email, password);
  }
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      return new NotFoundException('No user');
    }
    return user;
  }
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }
}
