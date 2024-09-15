import { QuestionResponseDto } from './question.response.dto';

export class QuizResponseDto {
  title: string;
  questions: QuestionResponseDto[];
}
