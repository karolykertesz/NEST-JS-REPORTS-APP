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
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateuserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update.userDTO';
import { Serialize } from '../interceptors/serialize.interceptor.ts';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { User } from './user.entity';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signout')
  signOut(@Session() session: any) {
    return (session.id = null);
  }
  @Get('/admin')
  getUserInfo(@Session() session: any) {
    return this.usersService.findOne(session.id);
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
  @Post('/signup')
  async signUpUser(@Body() body: CreateuserDTO, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.signup(email, password);
    session.id = user.id;
    return user;
  }
  @Post('/signin')
  async signInUser(@Body() body: CreateuserDTO, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.id = user.id;
    return user;
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
