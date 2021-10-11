import { IsEmail, IsString } from 'class-validator';
export class CreateuserDTO {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
