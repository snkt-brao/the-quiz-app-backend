import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { OptionDto } from './option.dto';

export default class createQuestionDto {
  @IsNotEmpty({ message: 'question title must not be empty' })
  @IsString({ message: 'question description must be string' })
  questionDesc: string;

  option: OptionDto;

  @IsNumber({}, { message: 'correctChoiceIndex must be a number' })
  @Min(0, { message: 'correctChoiceIndex must be in range from 0 to 3' })
  @Max(0, { message: 'correctChoiceIndex must be in range from 0 to 3' })
  correctChoiceIndex: number;
}
