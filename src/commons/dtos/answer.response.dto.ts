import { QuestionResponseDto } from './question.response.dto';

export class AnswerResponseDto {
  question: QuestionResponseDto;
  selectedOption: string;
  isCorrect: boolean;
}
