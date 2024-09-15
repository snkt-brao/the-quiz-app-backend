import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import createQuestionDto from './create.question.dto';

export class createQuizDto {
  @IsNotEmpty({ message: 'quiz title must not be empty' })
  @IsString({ message: 'quiz title shoud be string' })
  quizTitle: string;

  questions: createQuestionDto[];
}
