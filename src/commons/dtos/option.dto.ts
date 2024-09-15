import { ArrayMaxSize, ArrayNotEmpty, IsString } from 'class-validator';

export class OptionDto {
  @ArrayNotEmpty({ message: 'option must be given for question' })
  @ArrayMaxSize(4, { message: 'Array can contain at most 4 strings.' })
  @IsString({
    each: true,
    message: 'Each value in the array must be a string.',
  })
  option: string[];
}
