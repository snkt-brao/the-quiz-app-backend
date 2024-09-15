import { IsAlpha, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name field should not be emtpy' })
  @IsAlpha('en-US', { message: 'name shoud only contains alphabates.' })
  name: string;

  @IsNotEmpty({ message: 'email field should not be emtpy' })
  @IsEmail({}, { message: 'invalid email format' })
  email: string;
}
